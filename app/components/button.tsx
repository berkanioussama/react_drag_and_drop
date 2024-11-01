'use client'

import { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { AddCardContext } from "../context/add_card_context";
import { motion } from "framer-motion";

interface Props {
  text: string;
  value: boolean
}

const Button: React.FC<Props> = ({ text, value }) => {
  
  const { setAdding } = useContext(AddCardContext);

  return (
    <motion.button
      layout
      onClick={() => setAdding(value)}
      className="flex gap-1.5 items-center px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-50 transition-colors"
    >
      <span>{text}</span>
      <FiPlus/>
    </motion.button>
  );
}
 
export default Button;