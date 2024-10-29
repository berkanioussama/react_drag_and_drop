import React from "react";
import Card from "./card";
import DropIndicator from "./drop_indicator";

type Card = {
  id: number;
  title: string;
  column: string;
}

interface Props {
  title: string;
  headingColor: string;
  column: string;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const Column: React.FC<Props> = ({ title, headingColor, column, cards, setCards }) => {

  const [active, setActive] = React.useState(false);
  const filteredCards = cards.filter((card) => card.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="text-sm text-neutral-400 rounded">{filteredCards.length}</span>
      </div>
      <div className={`w-full h-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
        <DropIndicator beforeId={-1} column={column} />
      </div>
    </div>
  );
}
 
export default Column;