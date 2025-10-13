const TAGLINES = [
  "Are you supposed to be here?",
  "Makes computers go brr.",
  "Working hard to hardly work.",
  "Capable of answering skill testing questions.",
  "Is definitely not a robot.",
  "When life gives you melons, you might be dyslexic.",
  "Don't you hate it when someone answers their own questions? I do.",
  "Most people are shocked when they find out how bad I am as an electrician.",
  "Russian dolls are so full of themselves.",
  "People who use selfie sticks really need to have a good, long look at themselves.",
  "Atheism is a non-prophet organization.",
  "I got a new pair of gloves today, but they're both 'lefts,' which on the one hand is great, but on the other, it's just not right.",
  "I didn't think orthopedic shoes would help, but I stand corrected.",
  "Despite the high cost of living, it remains popular.",
  "The rotation of Earth really makes my day.",
  "Well, to be Frank with you, I'd have to change my name.",
  "Are people born with photographic memories, or does it take time to develop?",
  "Communist jokes aren't funny unless everyone gets them.",
  "The first time I got a universal remote control, I thought to myself, 'This changes everything.'",
  "Whiteboards are remarkable.",
  "The man who survived both mustard gas and pepper spray is a seasoned veteran now.",
  "Refusing to go to the gym is a form of resistance training.",
  "Never trust atoms; they make up everything",
];

const DEFAULT_OPTIONS = {
  useApi: false,
  apiFormat: 'text', // Supported values: 'text' or 'json'.
};

export const TAGLINE_SOURCE = { ...DEFAULT_OPTIONS };
const API_ENDPOINT = 'https://icanhazdadjoke.com/';

function pickRandomTagline() {
  const index = Math.floor(Math.random() * TAGLINES.length);
  return TAGLINES[index];
}

async function fetchTaglineFromApi(format) {
  const acceptHeader = format === 'json' ? 'application/json' : 'text/plain';
  const response = await fetch(API_ENDPOINT, {
    headers: {
      Accept: acceptHeader,
    },
  });

  if (!response.ok) {
    throw new Error(`Joke API request failed with status ${response.status}`);
  }

  if (format === 'json') {
    const payload = await response.json();
    const joke = typeof payload?.joke === 'string' ? payload.joke : '';
    if (!joke) {
      throw new Error('Joke API returned an unexpected payload.');
    }
    return joke;
  }

  return response.text();
}

export async function setRandomTagline(target, options = {}) {
  if (!target) {
    return null;
  }

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...TAGLINE_SOURCE,
    ...options,
  };

  let tagline = '';

  if (mergedOptions.useApi) {
    try {
      tagline = await fetchTaglineFromApi(mergedOptions.apiFormat);
    } catch (error) {
      console.error('Failed to fetch tagline from API:', error);
      tagline = '';
    }
  }

  if (!tagline) {
    tagline = pickRandomTagline();
  }

  target.textContent = tagline;
  return tagline;
}

export function getTaglines() {
  return [...TAGLINES];
}
