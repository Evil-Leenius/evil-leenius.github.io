/* Release information is scoped to the Sprout page. */
(() => {
  const dialog = document.querySelector('.page-sprout #sprout-release-dialog');
  if (!dialog) return;
  let trigger;
  document.querySelectorAll('.page-sprout [data-sp-release]').forEach(button => {
    button.addEventListener('click', () => {
      trigger = button;
      dialog.showModal();
    });
  });
  dialog.querySelectorAll('[data-sp-close]').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (event.target === dialog && outside) dialog.close();
  });
  // Native dialog handles Escape and modal keyboard focus.
  dialog.addEventListener('close', () => trigger?.focus());
})();
