import React, { useContext } from "react";
import Card from "./card";
import DropIndicator from "./drop_indicator";
import AddCard from "./add_card";
import { CardContext } from "./board";

interface Props {
  title: string;
  headingColor: string;
  column: string;
}
type Card = {
  id: number;
  title: string;
  column: string;
};
type CardContextType = {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};



const Column: React.FC<Props> = ({ title, headingColor, column }) => {

  const {cards} = useContext(CardContext);

  const [active, setActive] = React.useState(false);
  const filteredCards = cards.filter((card) => card.column === column);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, card: Card) => {
    event.dataTransfer.setData("cardId", card.id.toString())
  }

  return (
    <div className="w-56 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="text-sm text-neutral-400 rounded">{filteredCards.length}</span>
      </div>
      <div className={`w-full h-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} handleDragStart={handleDragStart}/>
        ))}
        <DropIndicator beforeId={-1} column={column} />
        <AddCard column={column}/>
      </div>
    </div>
  );
}
 
export default Column;