'use client'
import { useContext, useState } from "react"
import { FaFire } from "react-icons/fa"
import { FiTrash } from "react-icons/fi"
import { CardContext } from "../context/card_context"


const BurnBarrel = () => {

  const [active, setActive] = useState(false);
  const { setCards } = useContext(CardContext);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (!event.dataTransfer) {
      console.log("No data transfer found. This is a bug.");
      return;
    }
    console.log("before");
    event.preventDefault();
    console.log("after");
    setActive(true);
  }
  const handleDragLeave = () => {
    console.log("drag leave");
    setActive(false);
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("drop drop drop");
    try {
      const cardId = event.dataTransfer.getData("cardId");
      
      if (cardId) {
        setCards((prev) => prev.filter((thatCard) => thatCard.id !== Number(cardId)));
      } else {
        console.error("No cardId found in dataTransfer");
      }
    } catch (error) {
      console.error("An error occurred during drag end:", error);
    } finally {
      setActive(false);
    }
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