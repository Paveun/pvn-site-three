export function createLoadingOverlay() {
  const overlay = document.querySelector('.loading');
  const progressBar = overlay?.querySelector('.loading__bar-progress');
  const statusText = overlay?.querySelector('.loading__text');

  let hidden = false;

  function setProgress(ratio) {
    if (!progressBar) {
      return;
    }

    const clamped = Math.min(Math.max(ratio, 0), 1);
    progressBar.style.transform = `scaleX(${clamped})`;
  }

  function setStatus(message) {
    if (statusText) {
      statusText.textContent = message;
    }
  }

  function finish(onHidden) {
    if (!overlay) {
      onHidden?.();
      return;
    }

    if (hidden) {
      onHidden?.();
      return;
    }

    hidden = true;

    const handleTransitionEnd = (event) => {
      if (event.target !== overlay) {
        return;
      }

      overlay.removeEventListener('transitionend', handleTransitionEnd);
      overlay.remove();
      onHidden?.();
    };

    overlay.addEventListener('transitionend', handleTransitionEnd);
    requestAnimationFrame(() => {
      overlay.classList.add('loading--hidden');
    });
  }

  function showError(message = 'Loading failed') {
    setStatus(message);
  }

  return {
    element: overlay,
    setProgress,
    setStatus,
    finish,
    showError,
  };
}
