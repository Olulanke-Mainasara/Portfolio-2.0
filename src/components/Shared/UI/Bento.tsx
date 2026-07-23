import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard, { type BentoCardProps } from "./BentoCard";

gsap.registerPlugin(ScrollTrigger);

export interface BentoProps {
  cards: BentoCardProps[];
}

const Bento: React.FC<BentoProps> = ({ cards }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cardEls = Array.from(
      grid.querySelectorAll<HTMLElement>(".bento-card"),
    );
    if (!cardEls.length) return;

    // If the grid is already on-screen by the time this effect runs, skip
    // the hide-then-reveal choreography entirely — animating it in at this
    // point would just flash the cards invisible for a beat.
    if (grid.getBoundingClientRect().top < window.innerHeight * 0.9) {
      return;
    }

    gsap.set(cardEls, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: grid,
      start: "top bottom-=10%",
      once: true,
      onEnter: () => {
        gsap.to(cardEls, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
        });
      },
    });

    return () => trigger.kill();
  }, [cards.length]);

  const spanClasses = [
    "md:col-start-1 md:row-start-1",
    "md:col-start-3 md:row-start-1",
  ];

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6"
    >
      <div className="flex flex-col gap-2 justify-center md:col-start-2">
        <p className="text-6xl lg:text-7xl xl:text-[120px] leading-none text-center">
          Beyond <br />
          the code
        </p>
      </div>
      {cards.map((card, index) => (
        <BentoCard
          key={card.title + index}
          {...card}
          className={`h-96 md:h-80 lg:h-96 ${spanClasses[index % 4]}`}
        />
      ))}
    </div>
  );
};

export default Bento;
