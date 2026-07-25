import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
  newTab?: boolean;
  fontStyle?: "comic";
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  currentPath?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  children?: React.ReactNode;
}

function isActiveLink(link: string, currentPath: string): boolean {
  if (!currentPath) return false;
  if (link === "/") return currentPath === "/";
  return currentPath === link || currentPath.startsWith(`${link}/`);
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#1e1e22", "#35353c"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = false,
  accentColor = "#5227FF",
  isFixed = false,
  closeOnClickAway = true,
  currentPath = "",
  onMenuOpen,
  onMenuClose,
  children,
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [activePath, setActivePath] = useState(currentPath);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The nav island persists across Astro view transitions (transition:persist),
  // so its initial props go stale after client-side navigation — re-read the
  // path from the browser on every route change instead.
  useEffect(() => {
    const updatePath = () => setActivePath(window.location.pathname);
    document.addEventListener("astro:page-load", updatePath);
    return () => document.removeEventListener("astro:page-load", updatePath);
  }, []);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const lineTopRef = useRef<HTMLSpanElement | null>(null);
  const lineMidRef = useRef<HTMLSpanElement | null>(null);
  const lineBotRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const lineTop = lineTopRef.current;
      const lineMid = lineMidRef.current;
      const lineBot = lineBotRef.current;
      const icon = iconRef.current;

      if (!panel || !lineTop || !lineMid || !lineBot || !icon) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll(".sm-prelayer"),
        ) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      gsap.set(lineTop, { transformOrigin: "50% 50%", y: -7, rotate: 0 });
      gsap.set(lineMid, { transformOrigin: "50% 50%", y: 0, opacity: 1 });
      gsap.set(lineBot, { transformOrigin: "50% 50%", y: 7, rotate: 0 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });

      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 0 });

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel"),
    ) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    ) as HTMLElement[];
    const socialTitle = panel.querySelector(
      ".sm-socials-title",
    ) as HTMLElement | null;
    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link"),
    ) as HTMLElement[];

    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length)
      gsap.set(numberEls, { ["--sm-num-opacity" as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        0,
      );
    }

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity" as any]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle)
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart,
        );
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: "opacity" });
            },
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.32,
        ease: "power3.in",
        overwrite: "auto",
      });
    }

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel"),
        ) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item",
          ),
        ) as HTMLElement[];
        if (numberEls.length)
          gsap.set(numberEls, { ["--sm-num-opacity" as any]: 0 });

        const socialTitle = panel.querySelector(
          ".sm-socials-title",
        ) as HTMLElement | null;
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link"),
        ) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const top = lineTopRef.current;
    const mid = lineMidRef.current;
    const bot = lineBotRef.current;
    if (!top || !mid || !bot) return;

    spinTweenRef.current?.kill();

    if (opening) {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(top, { y: 0, rotate: 45, duration: 0.5 }, 0)
        .to(bot, { y: 0, rotate: -45, duration: 0.5 }, 0)
        .to(mid, { opacity: 0, duration: 0.3 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(top, { y: -7, rotate: 0, duration: 0.35 }, 0)
        .to(bot, { y: 7, rotate: 0, duration: 0.35 }, 0)
        .to(mid, { opacity: 1, duration: 0.35 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current
          ? openMenuButtonColor
          : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      document.body.style.overflow = "hidden";
      window.__lockScroll = true;
      window.lenisInstance?.stop();
      onMenuOpen?.();
      playOpen();
    } else {
      document.body.style.overflow = "";
      window.__lockScroll = false;
      window.lenisInstance?.start();
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      document.body.style.overflow = "";
      window.__lockScroll = false;
      window.lenisInstance?.start();
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
    }
  }, [playClose, animateIcon, animateColor, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  React.useEffect(() => {
    const handleRouteChange = () => {
      if (openRef.current) {
        openRef.current = false;
        setOpen(false);
        document.body.style.overflow = "";
        window.__lockScroll = false;
        window.lenisInstance?.start();
        gsap.set(
          [panelRef.current, ...preLayerElsRef.current].filter(Boolean),
          {
            xPercent: position === "left" ? -100 : 100,
          },
        );
        if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 0 });
        animateIcon(false);
      }
    };

    document.addEventListener("astro:page-load", handleRouteChange);
    return () => {
      document.removeEventListener("astro:page-load", handleRouteChange);
    };
  }, [position, animateIcon]);

  return (
    <div
      className={`sm-scope z-40 ${isFixed ? "fixed top-0 left-0 w-screen h-dvh overflow-hidden pointer-events-none" : "w-full h-full"}`}
    >
      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper pointer-events-none relative w-full h-full z-40"
        }
        style={
          accentColor
            ? ({ ["--sm-accent" as any]: accentColor } as React.CSSProperties)
            : undefined
        }
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={overlayRef}
          className={`sm-overlay ${isFixed ? "fixed" : "absolute"} inset-0 z-8`}
          aria-hidden="true"
        />

        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-5"
          aria-hidden="true"
        >
          {(() => {
            const raw =
              colors && colors.length
                ? colors.slice(0, 4)
                : ["#1e1e22", "#35353c"];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        <header
          className="staggered-menu-header absolute top-0 left-0 w-full pointer-events-none z-20"
          aria-label="Main navigation header"
        >
          <motion.div
            initial={false}
            animate={{
              top: scrolled ? 20 : 0,
              width: scrolled ? "98%" : "100%",
              left: scrolled ? "1%" : "0%",
              borderRadius: scrolled ? 35 : 0,
              backgroundColor: scrolled
                ? "rgba(11, 15, 19, 0.75)"
                : "rgba(11, 15, 19, 0)",
              borderColor: scrolled
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(255, 255, 255, 0)",
              boxShadow: scrolled
                ? "0 10px 30px rgba(0, 0, 0, 0.45)"
                : "0 0px 0px rgba(0, 0, 0, 0)",
              backdropFilter: scrolled ? "blur(15px)" : "blur(0px)",
            }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="sm-nav-pill absolute flex items-center justify-between border overflow-hidden pointer-events-auto px-4 py-4 md:px-6 md:py-6"
          >
            {children}

            <button
              ref={toggleBtnRef}
              className="sm-toggle relative inline-flex items-center justify-center bg-transparent border-0 cursor-pointer overflow-visible pointer-events-auto p-2 -m-2 shrink-0"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              onClick={toggleMenu}
              type="button"
            >
              <span
                ref={iconRef}
                className="sm-icon relative w-8 h-8 md:w-9 md:h-9 shrink-0 inline-flex items-center justify-center [will-change:transform]"
                aria-hidden="true"
              >
                <span
                  ref={lineTopRef}
                  className="sm-icon-line absolute top-1/2 w-full h-[3px] bg-current rounded-[2px] -translate-y-1/2 [will-change:transform]"
                />
                <span
                  ref={lineMidRef}
                  className="sm-icon-line absolute top-1/2 w-full h-[3px] bg-current rounded-[2px] -translate-y-1/2 [will-change:transform]"
                />
                <span
                  ref={lineBotRef}
                  className="sm-icon-line absolute top-1/2 w-full h-[3px] bg-current rounded-[2px] -translate-y-1/2 [will-change:transform]"
                />
              </span>
            </button>
          </motion.div>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full bg-[#0b0f13] flex flex-col p-8 pt-28 md:p-14 md:pt-32 overflow-y-auto z-10 pointer-events-auto"
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => {
                  const active = isActiveLink(it.link, activePath);
                  return (
                    <li
                      className="sm-panel-itemWrap relative overflow-hidden leading-none"
                      key={it.label + idx}
                    >
                      <a
                        className={`sm-panel-item relative text-white font-semibold cursor-pointer leading-none tracking-[-1px] uppercase transition-[background,color] duration-150 ease-linear inline-flex items-start no-underline ${it.fontStyle === "comic" ? "sm-panel-item-comic" : ""}`}
                        href={it.link}
                        target={it.newTab ? "_blank" : undefined}
                        rel={it.newTab ? "noopener noreferrer" : undefined}
                        aria-label={it.ariaLabel}
                        aria-current={active ? "page" : undefined}
                        data-index={idx + 1}
                        data-active={active || undefined}
                      >
                        <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                          {it.label}
                        </span>
                      </a>
                    </li>
                  );
                })
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item relative text-white font-semibold cursor-pointer leading-none tracking-[-1px] uppercase transition-[background,color] duration-150 ease-linear inline-flex items-start no-underline">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto pt-8 flex flex-col gap-3"
                aria-label="Social links"
              >
                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#ff0000)]">
                  Socials
                </h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-base font-medium text-white/70 no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; pointer-events: none; }
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; background: transparent; pointer-events: none; z-index: 20; }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; justify-content: center; background: transparent; border: none; cursor: pointer; color: #e9e9ef; overflow: visible; }
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-scope .sm-icon { position: relative; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 3px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(280px, 40vw, 480px); height: 100%; background: #0b0f13; display: flex; flex-direction: column; padding: 7em 2em 2em 2em; overflow-y: auto; z-index: 10; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(280px, 40vw, 480px); pointer-events: none; z-index: 5; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-overlay { opacity: 0; pointer-events: none; background: rgba(4, 7, 10, 0.55); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
.sm-scope [data-open] .sm-overlay { pointer-events: auto; }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; color: var(--sm-accent, #ff0000); }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #ff0000); outline-offset: 3px; }
.sm-scope .sm-socials-link { font-size: 1rem; font-weight: 500; color: rgba(255,255,255,0.7); text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.sm-scope .sm-panel-item { position: relative; color: #fff; font-weight: 600; font-size: clamp(2.25rem, 6vw, 3.5rem); cursor: pointer; line-height: 1; letter-spacing: -1px; text-transform: uppercase; transition: color 0.25s; display: inline-flex; align-items: flex-start; gap: 0.35em; text-decoration: none; }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-item-comic { font-family: 'Bangers', cursive; font-weight: 400; letter-spacing: 0.02em; transition: color 0.25s, rotate 0.25s; }
.sm-scope .sm-panel-item-comic:hover { rotate: -3deg; }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); flex-shrink: 0; margin-top: 0.05em; font-size: 0.28em; font-weight: 400; color: var(--sm-accent, #ff0000); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
.sm-scope .sm-panel-item[data-active] .sm-panel-itemLabel { text-decoration: line-through; text-decoration-color: var(--sm-accent, #ff0000); text-decoration-thickness: 0.06em; opacity: 0.5; }
.sm-scope .sm-panel-item[data-active] { cursor: default; }
.sm-scope .sm-panel-item[data-active]:hover { color: #fff; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item[data-active]::after { content: ""; font-size: 0.22em; letter-spacing: 0.08em; }
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .sm-prelayers { width: 100%; left: 0; right: 0; } }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
