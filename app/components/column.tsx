import React, { useContext } from "react";
import Card from "./card";
import DropIndicator from "./drop_indicator";
import AddCard from "./add_card";
import { CardContext } from "../context/card_context";
import { AddCardContextProvider } from "../context/add_card_context";

interface Props {
  title: string;
  headingColor: string;
  column: string;
}

const Column: React.FC<Props> = ({ title, headingColor, column }) => {

  const {cards, setCards} = useContext(CardContext);

  const [active, setActive] = React.useState(false);
  const filteredCards = cards.filter((card) => card.column === column);

  /*
  const getIndicator = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
  }
  const getNearestIndicator = (event: React.DragEvent<HTMLDivElement>, indicator: Element[]) => {
    const DISTANCE_OFFSET = 50
    const element = indicator.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = event.clientY - (box.top + DISTANCE_OFFSET);

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest
      }
    }, {
      offset: Number.NEGATIVE_INFINITY,
      element: indicator[indicator.length - 1]
    })

    return element
  }
  const clearHighLight = (elements: Element[]) => {
    const indicators = elements || getIndicator();
    indicators.forEach((item) => {
      item.style.opacity = '0';
    })
  }
  */
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
  }
  const getNearestIndicator = (event: React.DragEvent<HTMLDivElement>, indicators: Element[]) => {
    const theElement = indicators.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = event.clientY - (box.top + 50);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest
      }
    }, {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1]
    })
    return theElement
  }
  const highlightIndicator = (event: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    const nearestIndicator = getNearestIndicator(event, indicators);
    (nearestIndicator.element as HTMLElement).style.opacity = '1'
  }
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, card: Card) => {
    event.dataTransfer.setData("cardId", card.id.toString())
  }
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    highlightIndicator(event)
    setActive(true);
  }
  const handleDragLeave = () => {
    setActive(false);
  }
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    const cardId = event.dataTransfer.getData("cardId");
    setActive(false);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className="w-56 shrink-0"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="text-sm text-neutral-400 rounded">{filteredCards.length}</span>
      </div>
      <div className={`w-full h-full transition-colors ${active ? "bg-neutral-800/70" : "bg-neutral-800/0"}`}>
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} handleDragStart={handleDragStart}/>
        ))}
        <DropIndicator beforeId={-1} column={column} />
        <AddCardContextProvider>
          <AddCard column={column} />
        </AddCardContextProvider>
      </div>
    </div>
  );
}
 
export default Column;