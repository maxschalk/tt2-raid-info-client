export function scrollIntoView(targetSelector: string) {
  const el = document.querySelector(targetSelector);

  if (!el) {
    return;
  }

  el.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
