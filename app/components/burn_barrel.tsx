'use client'
import { useState } from "react"
import { FaFire } from "react-icons/fa"
import { FiTrash } from "react-icons/fi"

type Card = {
  id: number
  title: string
  column: string
}

interface Props {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
}

const BurnBarrel: React.FC<Props> = ({ setCards }) => {

  const [active, setActive] = useState(false);

  return (
    <div
      className={`w-56 h-56 mt-10 grid shrink-0 text-3xl place-content-center border rounded 
      ${active ? "bg-red-800/20 border-red-800 text-red-500" : "bg-neutral-500/20 text-neutral-500 border-neutral-500"}`}
    >
      {active ? <FaFire className="animate-bounce"/> : <FiTrash/> }
    </div>
  );
}
 
export default BurnBarrel;