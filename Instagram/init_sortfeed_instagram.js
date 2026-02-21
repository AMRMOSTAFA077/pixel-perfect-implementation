(() => {
  'use strict';

  const SS = {
    sortBy: 'isorterSortBy',
    noItems: 'isorterNoItems',
    status: 'isorterStatus',
    itemsVsDates: 'isorterItemsVsDates',
    postsVsReels: 'isorterPostsVSReels',
    stop: 'isorterStopSorting'
  };

  const BLOCKED_PREFIXES = ['/explore', '/direct', '/accounts', '/reel/', '/p/', '/tv/', '/stories'];

  function isProfileRootPath(pathname) {
    // Profile pages look like: /username/ (or /username)
    if (!pathname) return false;
    const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    if (!path || path === '') return false;

    // Block obvious non-profile routes
    for (const pref of BLOCKED_PREFIXES) {
      if (path.startsWith(pref)) return false;
    }

    // Must be exactly one segment: /{username}
    const segments = path.split('/').filter(Boolean);
    return segments.length === 1;
  }

  function readSelectedTabHref() {
    const tablist = document.querySelectorAll('[role="tablist"]')[0];
    if (!tablist) return null;
    const selected = tablist.querySelectorAll('[aria-selected="true"]')[0];
    if (!selected) return null;
    return selected.getAttribute('href');
  }

  function classifyTab(href) {
    if (!href) return { ok: false, type: null };
    if (href.includes('reels')) return { ok: true, type: 'Reels' };
    if (href.includes('tagged')) return { ok: true, type: 'Tagged' };
    // Default tab on profile is Posts
    return { ok: true, type: 'Posts' };
  }

  function ensureCanSort(sortBy, mode) {
    // Prevent back-to-back sorting overlays
    if (document.getElementById('banner_most_viewed_reels') !== null) {
      alert('Please close the current iSorter overlay before sorting again.');
      return false;
    }

    const href = readSelectedTabHref();
    if (!href) {
      alert('Open an Instagram profile page (Posts/Reels/Tagged) and try again.');
      return false;
    }

    // Determine whether we are on posts vs reels
    const { ok, type } = classifyTab(href);
    if (!ok) {
      alert('This page is not supported. Open an Instagram profile page and try again.');
      return false;
    }

    if (type === 'Posts' || type === 'Tagged') {
      if (sortBy === 'views') {
        alert('Views sorting is only available on Reels.');
        return false;
      }
      if (mode === 'dates' && type === 'Tagged') {
        // Keep parity: date-range sorting relies on timeline post dates; tagged can be inconsistent.
        alert('Date range sorting works on Posts tab only.');
        return false;
      }
      sessionStorage.setItem(SS.postsVsReels, 'Posts');
      return true;
    }

    if (type === 'Reels') {
      if (mode === 'dates') {
        alert('Date range sorting is not available on Reels.');
        return false;
      }
      sessionStorage.setItem(SS.postsVsReels, 'Reels');
      return true;
    }

    alert('This tab is not supported.');
    return false;
  }

  chrome.runtime.onMessage.addListener((msg) => {
    if (!msg || msg.action !== 'refreshPage') return;

    const sortBy = msg.sort_by;
    const noItems = msg.no_items;
    const mode = msg.dates_items; // 'items' | 'dates'

    if (!isProfileRootPath(location.pathname)) {
      // Still allow tabbed profile URLs like /username/reels/ or /username/tagged/
      const segments = location.pathname.split('/').filter(Boolean);
      const isTabbedProfile = segments.length >= 2 && !BLOCKED_PREFIXES.some(p => location.pathname.startsWith(p));
      if (!isTabbedProfile) {
        alert('Open an Instagram profile page and try again.');
        return;
      }
    }

    if (!ensureCanSort(sortBy, mode)) return;

    // Reset state
    sessionStorage.removeItem(SS.sortBy);
    sessionStorage.removeItem(SS.noItems);
    sessionStorage.removeItem(SS.status);
    sessionStorage.removeItem(SS.itemsVsDates);

    // Set new state
    sessionStorage.setItem(SS.sortBy, sortBy);
    sessionStorage.setItem(SS.noItems, noItems);
    sessionStorage.setItem(SS.itemsVsDates, mode);
    sessionStorage.setItem(SS.status, 'true');

    window.location.reload();
  });
})();
