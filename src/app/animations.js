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
    .fromTo('nav', { y: '-100%' }, { y: '0%' }, '-=1.5')
    .fromTo('.title', { opacity: 0 }, { opacity: 1 }, '-=0.5')
    .fromTo('.sub', { opacity: 0 }, { opacity: 1 }, '-=1');
}

export function attachSpinHandler(button, controls, motionPreferences = {}) {
  if (!button) {
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
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      window.setTimeout(() => {
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0;
      }, 1500);
      return;
    }

    spinTimeline = gsap.timeline();
    spinTimeline.to(controls, {
      duration: 1,
      autoRotateSpeed: 30,
      ease: 'power2.in',
    });
    spinTimeline.to(controls, {
      duration: 1.5,
      autoRotateSpeed: 0.5,
    });
  });
}
