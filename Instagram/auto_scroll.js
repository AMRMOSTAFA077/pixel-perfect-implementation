// iSorter auto-scroll loader
// Purpose: keep scrolling the profile grid until:
// - we reach the selected limit (50/100/200/500/1000/2000), OR
// - user clicks Stop Sorting, OR
// - Instagram has no more items to load, OR
// - the sorter finishes and clears sessionStorage flags.

(function () {
  'use strict';

  const SS = {
    status: 'isorterStatus',
    noItems: 'isorterNoItems',
    stop: 'isorterStopSorting',
    mode: 'isorterItemsVsDates'
  };

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function parseLimit(raw) {
    if (!raw) return 0;
    if (raw === 'all_reels' || raw === 'all_items') return Infinity;
    // values look like: 50_reels, 2000_reels
    const n = parseInt(String(raw).replace('_reels', ''), 10);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  function countLoadedGridItems() {
    // Rough count of loaded profile grid anchors (posts/reels). Good enough to stop early.
    const article = document.querySelector('main article') || document;
    const links = article.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]');
    return links ? links.length : 0;
  }

  async function waitForStart() {
    // Wait until the page is interactive and sorting state is set.
    for (let i = 0; i < 120; i++) {
      if (sessionStorage.getItem(SS.status)) return true;
      await sleep(250);
    }
    return false;
  }

  async function autoScroll() {
    const started = await waitForStart();
    if (!started) return;

    // Date mode uses a time window; we still scroll to let IG load more until the sorter ends.
    const desired = parseLimit(sessionStorage.getItem(SS.noItems));

    let lastHeight = 0;
    let stagnant = 0;

    // Small delay so the injected XHR hooks are in place before we start scrolling.
    await sleep(600);

    while (sessionStorage.getItem(SS.status)) {
      if (sessionStorage.getItem(SS.stop) === 'on') break;

      // If user selected a finite limit, stop once the DOM has at least that many loaded items.
      // The collector will finish as soon as it reaches the limit and clears SS.status.
      if (desired !== Infinity && desired > 0) {
        const loaded = countLoadedGridItems();
        if (loaded >= desired) {
          // Give IG a moment to flush any pending graphql requests.
          await sleep(800);
          // If sorting hasn't completed yet, do one more scroll to trigger the last page load.
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
          await sleep(800);
          break;
        }
      }

      window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
      await sleep(900);

      const h = document.body.scrollHeight;
      if (h <= lastHeight + 5) {
        stagnant++;
      } else {
        stagnant = 0;
        lastHeight = h;
      }

      // If height doesn't grow for a while, likely no more items.
      if (stagnant >= 10) break;
    }
  }

  // Start after load (profile grid is more stable then)
  window.addEventListener('load', () => {
    // Avoid double-running
    if (window.__isorterAutoScrollLoaded) return;
    window.__isorterAutoScrollLoaded = true;
    autoScroll().catch(() => {});
  });
})();
