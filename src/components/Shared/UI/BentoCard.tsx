import React, { useRef } from "react";
import { gsap } from "gsap";

export interface BentoCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  glowColor?: string;
  className?: string;
  imageClassName?: string;
}

const DEFAULT_GLOW_COLOR = "120, 161, 153";

const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 448 512" className={className} fill="currentColor">
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  description,
  image,
  href,
  glowColor = DEFAULT_GLOW_COLOR,
  className = "",
  imageClassName = "",
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const external = href.startsWith("http");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height),
    );

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      width: ${maxDistance * 2}px;
      height: ${maxDistance * 2}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
      left: ${x - maxDistance}px;
      top: ${y - maxDistance}px;
      pointer-events: none;
      z-index: 20;
    `;
    el.appendChild(ripple);

    gsap.fromTo(
      ripple,
      { scale: 0, opacity: 1 },
      {
        scale: 1,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      },
    );
  };

  return (
    <a
      ref={cardRef}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className={`bento-card group relative block w-full overflow-hidden rounded-3xl border border-white/10 ${className}`}
    >
      <img
        src={image}
        alt=""
        className={`absolute inset-0 object-cover w-full h-full duration-500 group-hover:scale-105 ${imageClassName}`}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15) 60%, transparent)",
        }}
      />

      <div className="absolute flex items-center justify-between gap-4 p-4 border rounded-2xl inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 border-white/10 bg-white/10 backdrop-blur-md">
        <div className="min-w-0">
          <h3 className="text-lg font-normal text-white truncate md:text-xl">
            {title}
          </h3>
          <p className="mt-0.5 text-sm text-white/70 truncate">{description}</p>
        </div>
        <span className="flex items-center justify-center w-10 h-10 duration-300 bg-white rounded-full shrink-0 group-hover:bg-background">
          <ArrowIcon className="w-4 h-4 -rotate-45 text-black" />
        </span>
      </div>

      <style>{`
        .bento-card { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .bento-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 34px rgba(${glowColor}, 0.35);
        }
      `}</style>
    </a>
  );
};

export default BentoCard;
