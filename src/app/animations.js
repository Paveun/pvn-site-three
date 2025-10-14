import gsap from 'gsap';

export function runIntroTimeline({ camera, controls, rotationState, reduceMotion = false }) {
  if (!camera) {
    return null;
  }

  const timeline = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } });

  if (reduceMotion) {
    rotationState.current = 0;
    gsap.set(camera.position, { z: 5 });
    gsap.to('nav', { y: '0%', duration: 0.4, overwrite: true });
    gsap.to(['.title', '.sub'], { opacity: 1, duration: 0.4, overwrite: true });
    if (controls) {
      controls.enabled = true;
      controls.update();
    }
    return timeline;
  }

  if (controls) {
    controls.enabled = false;
  }

  rotationState.current = 0;

  timeline
    .set(camera.position, { z: 0 })
    .set(rotationState, { current: rotationState.base * 2.5 })
    .to(rotationState, { current: rotationState.base, duration: 2.4, ease: 'sine.out' })
    .to(camera.position, { z: 4, duration: 2.4, ease: 'power2.out' }, '<')
    .fromTo('nav', { y: '-360%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.1 }, '-=1.1')
    .fromTo('.title', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.7')
    .fromTo('.sub', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.6')
    .call(() => {
      if (controls) {
        controls.enabled = true;
        controls.update();
      }
    });

  return timeline;
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

    spinTimeline = gsap.timeline();
    if (motionPreferences.reduceMotion) {
      spinTimeline
        .to(rotationState, { duration: 0.4, current: rotationState.base * 1.5, ease: 'power1.out' })
        .to(rotationState, { duration: 0.6, current: 0, ease: 'power1.inOut' });
      return;
    }

    spinTimeline
      .to(rotationState, {
        duration: 1,
        current: rotationState.base * 8,
        ease: 'power2.in',
      })
      .to(rotationState, {
        duration: 1.6,
        current: rotationState.base,
        ease: 'power2.out',
      });
  });
}
