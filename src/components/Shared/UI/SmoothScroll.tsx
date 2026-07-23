import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenisInstance?: Lenis;
    __lockScroll?: boolean;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Another island (e.g. the splash screen) may have already asked for
    // scroll to stay locked before this instance even existed.
    if (window.__lockScroll) lenis.stop();

    window.lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Astro's router swaps this island's DOM (remounting Lenis) before it
    // resets native scroll on navigation, so a freshly constructed instance
    // can briefly latch onto the outgoing page's scroll depth. Re-sync once
    // Astro has finished positioning the new page.
    const resync = () => lenis.scrollTo(window.scrollY, { immediate: true });
    document.addEventListener("astro:after-swap", resync);

    return () => {
      document.removeEventListener("astro:after-swap", resync);
      lenis.destroy();
      // The old instance's unmount is deferred until after the new instance
      // has already been assigned to window.lenisInstance — only clear it
      // if it's still pointing at us.
      if (window.lenisInstance === lenis) window.lenisInstance = undefined;
    };
  }, []);

  return null;
}
