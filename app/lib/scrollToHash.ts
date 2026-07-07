const NAV_SCROLL_OFFSET = -96;
const SCROLL_DURATION = 1.15;

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function scrollToHash(href: string) {
  if (href === "/" || href === "#top") {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: SCROLL_DURATION,
        easing: easeOutExpo,
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.history.replaceState(null, "", "/");
    return;
  }

  if (!href.startsWith("#")) return;

  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, {
      offset: NAV_SCROLL_OFFSET,
      duration: SCROLL_DURATION,
      easing: easeOutExpo,
    });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.history.replaceState(null, "", href);
}
