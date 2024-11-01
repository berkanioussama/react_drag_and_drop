import React, { useContext, useState } from "react";
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

  const [active, setActive] = useState(false);

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`)) as HTMLElement[]
  }
  const getNearestIndicator = (event: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;
    const theElement = indicators.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = event.clientY - (box.top + DISTANCE_OFFSET);
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

  const clearOtherHightLight = (oldIndicators: HTMLElement[] = []) => {
    const indicators = oldIndicators.length > 0 ? oldIndicators : getIndicators();
    indicators.forEach((item) => {
      item.style.opacity = '0';
    })
  }
  const highlightIndicator = (event: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearOtherHightLight(indicators as HTMLElement[]);
    const nearestIndicator = getNearestIndicator(event as React.DragEvent<HTMLDivElement>, indicators as HTMLElement[] );
    nearestIndicator.element.style.opacity = '1'
  }
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, card: Card) => {
    event.dataTransfer.setData("cardId", card.id.toString())
  }
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    highlightIndicator(event as React.DragEvent<HTMLDivElement>);
    setActive(true);
  }
  const handleDragLeave = () => {
    clearOtherHightLight()
    setActive(false);
  }
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    setActive(false);
    clearOtherHightLight()
    const cardId = event.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(event as React.DragEvent<HTMLDivElement>, indicators as HTMLElement[]);
    const before = parseInt(element.dataset.before || "-1", 10)

    if (before !== Number(cardId)) {
      let copy = [...cards]
      let cardToTransfer = copy.find(thisCard => thisCard.id === Number(cardId))
      if (!cardToTransfer) return
      cardToTransfer = { ...cardToTransfer, column }
      
      copy = copy.filter(thisCard => thisCard.id !== Number(cardId))
      const moveToBack = before === -1
      if (moveToBack) {
        copy.push(cardToTransfer)
      } else {
        const insertAtIndex = copy.findIndex(thisCard => thisCard.id === Number(before))
        if (insertAtIndex === undefined) return

        copy.splice(insertAtIndex, 0, cardToTransfer)
      }
      setCards(copy)
    }
  }
  const filteredCards = cards.filter((card) => card.column === column);

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