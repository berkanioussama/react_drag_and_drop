'use client'
import { useContext, useState } from "react"
import { FaFire } from "react-icons/fa"
import { FiTrash } from "react-icons/fi"
import { CardContext } from "../context/card_context"


const BurnBarrel = () => {

  const [active, setActive] = useState(false);
  const { setCards } = useContext(CardContext);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(true);
  }
  const handleDragLeave = () => {
    setActive(false);
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
      const cardId = event.dataTransfer.getData("cardId");
      setCards((prev) => prev.filter((thatCard) => thatCard.id !== Number(cardId)));
      setActive(false);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`w-56 h-56 mt-10 grid shrink-0 text-3xl place-content-center border rounded 
      ${active ? "bg-red-800/20 border-red-800 text-red-500" : "bg-neutral-500/20 text-neutral-500 border-neutral-500"}`}
    >
      {active ? <FaFire className="animate-bounce"/> : <FiTrash/> }
    </div>
  );
}
 
export default BurnBarrel;