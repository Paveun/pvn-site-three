import gsap from 'gsap';

export function runIntroTimeline(camera, { reduceMotion = false } = {}) {
  if (reduceMotion) {
    gsap.set(camera.position, { z: 5 });
    gsap.set('nav', { y: '0%' });
    gsap.set('.title', { opacity: 1 });
    gsap.set('.sub', { opacity: 1 });
    return null;
  }

  return gsap
    .timeline({ defaults: { duration: 1 } })
    .fromTo(camera.position, { z: 0 }, { z: 5, duration: 2 })
    .fromTo('nav', { y: '-360%' }, { y: '0%' }, '-=1.5')
    .fromTo('.title', { opacity: 0 }, { opacity: 1 }, '-=0.5')
    .fromTo('.sub', { opacity: 0 }, { opacity: 1 }, '-=1');
}

export function attachSpinHandler(button, rotationState, motionPreferences = {}) {
  if (!button || !rotationState) {
    return;
  }

  let spinTimeline = null;

  button.addEventListener('click', () => {
    if (spinTimeline) {
      spinTimeline.kill();
      spinTimeline = null;
    }

    const reduceMotion = Boolean(motionPreferences.reduceMotion);

    if (reduceMotion) {
      return;
    }

    spinTimeline = gsap.timeline();
    spinTimeline.to(rotationState, {
      duration: 1,
      current: rotationState.base * 8,
      ease: 'power2.in',
    });
    spinTimeline.to(rotationState, {
      duration: 1.6,
      current: rotationState.base,
      ease: 'power2.out',
    });
  });
}
