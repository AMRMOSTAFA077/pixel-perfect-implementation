/* iSorter popup logic (Instagram only)
 * - Persists selections in chrome.storage.local
 * - Sends a single message to the active instagram.com tab to trigger sorting
 */

const STORE_KEYS = {
  sortBy: 'isorter_sort_by',
  noItems: 'isorter_no_items',
  mode: 'isorter_mode', // 'items' | 'dates'
  dateRange: 'isorter_date_range'
};

const els = {
  itemBtn: document.getElementById('itemButton'),
  dateBtn: document.getElementById('dateRangeButton'),
  noItems: document.getElementById('no_items_selected'),
  dateRange: document.getElementById('dates_selected'),
  onlyPostsLabel: document.getElementById('OnlyWorksPosts'),
  statusText: document.getElementById('statusText'),

  likes: document.getElementById('sortLikesClick'),
  views: document.getElementById('sortViewsClick'),
  comments: document.getElementById('sortCommentsClick'),
  oldest: document.getElementById('sortOldestClicks')
};

function setStatus(msg) {
  if (els.statusText) els.statusText.textContent = msg || '';
}

function setMode(mode) {
  const isDates = mode === 'dates';

  // Button styles (reuse existing CSS classes)
  els.itemBtn.classList.toggle('active', !isDates);
  els.dateBtn.classList.toggle('active', isDates);

  // Show/hide dropdowns
  els.noItems.style.display = isDates ? 'none' : '';
  els.dateRange.style.display = isDates ? '' : 'none';

  // Label warning for date mode (posts only)
  if (els.onlyPostsLabel) els.onlyPostsLabel.style.display = isDates ? '' : 'none';
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function saveState(partial) {
  const existing = await chrome.storage.local.get(Object.values(STORE_KEYS));
  const next = { ...existing, ...partial };
  await chrome.storage.local.set(next);
  return next;
}

async function loadState() {
  const defaults = {
    [STORE_KEYS.sortBy]: 'likes',
    [STORE_KEYS.noItems]: '100_reels',
    [STORE_KEYS.mode]: 'items',
    [STORE_KEYS.dateRange]: '1_week'
  };

  const stored = await chrome.storage.local.get(Object.values(STORE_KEYS));
  return { ...defaults, ...stored };
}

async function sendSort(sortBy) {
  const state = await loadState();
  const tab = await getActiveTab();

  if (!tab?.url || !tab.url.includes('instagram.com')) {
    setStatus('Open an Instagram profile page first.');
    return;
  }

  const mode = state[STORE_KEYS.mode];
  const dates_items = mode === 'dates' ? 'dates' : 'items';
  const no_items = mode === 'dates' ? state[STORE_KEYS.dateRange] : state[STORE_KEYS.noItems];

  await saveState({ [STORE_KEYS.sortBy]: sortBy });

  setStatus('Sorting…');

  chrome.tabs.sendMessage(
    tab.id,
    {
      action: 'refreshPage',
      sort_by: sortBy,
      no_items,
      dates_items
    },
    () => {
      // Ignore runtime errors for pages where content script isn't ready.
      const err = chrome.runtime.lastError;
      if (err) {
        setStatus('Open an Instagram profile page and try again.');
      }
    }
  );
}

function wireUI() {
  els.itemBtn.addEventListener('click', async () => {
    await saveState({ [STORE_KEYS.mode]: 'items' });
    setMode('items');
  });

  els.dateBtn.addEventListener('click', async () => {
    await saveState({ [STORE_KEYS.mode]: 'dates' });
    setMode('dates');
  });

  els.noItems.addEventListener('change', async () => {
    await saveState({ [STORE_KEYS.noItems]: els.noItems.value });
  });

  els.dateRange.addEventListener('change', async () => {
    await saveState({ [STORE_KEYS.dateRange]: els.dateRange.value });
  });

  els.likes.addEventListener('click', () => sendSort('likes'));
  els.views.addEventListener('click', () => sendSort('views'));
  els.comments.addEventListener('click', () => sendSort('comments'));
  els.oldest.addEventListener('click', () => sendSort('oldest'));
}

async function hydrate() {
  const state = await loadState();

  els.noItems.value = state[STORE_KEYS.noItems] || '100_reels';
  els.dateRange.value = state[STORE_KEYS.dateRange] || '1_week';

  setMode(state[STORE_KEYS.mode] || 'items');
  setStatus('');
}

wireUI();
hydrate();
