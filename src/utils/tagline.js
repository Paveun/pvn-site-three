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

export function setRandomTagline(target) {
  if (!target) {
    return;
  }

  const index = Math.floor(Math.random() * TAGLINES.length);
  target.textContent = TAGLINES[index];
}

export function getTaglines() {
  return [...TAGLINES];
}
