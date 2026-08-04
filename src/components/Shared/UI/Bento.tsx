import React from "react";
import BentoCard, { type BentoCardProps } from "./BentoCard";

export interface BentoProps {
  cards: BentoCardProps[];
}

const Bento: React.FC<BentoProps> = ({ cards }) => {
  const spanClasses = [
    "md:col-start-1 md:row-start-1",
    "md:col-start-3 md:row-start-1",
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
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
