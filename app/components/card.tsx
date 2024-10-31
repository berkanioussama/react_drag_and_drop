'use client'

import DropIndicator from "./drop_indicator";
import { motion } from "framer-motion";

type Card = {
  id: number,
  title: string,
  column: string
}
interface Props {
  id: number,
  title: string,
  column: string,
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, card: Card) => void
}

const Card: React.FC<Props> = ({ id, title, column, handleDragStart }) => {
  return (
    <div className="">
      <DropIndicator beforeId={id} column={column}/>
      <motion.div
        layout
        layoutId={id.toString()}
        draggable="true"
        onDragStart={(event)=>handleDragStart(event as unknown as React.DragEvent<HTMLDivElement>, {id, title, column})}
        className="cursor-grab active:cursor-grabbing bg-neutral-800 border border-neutral-700 rounded p-3"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </div>
    
  );
}
 
export default Card;