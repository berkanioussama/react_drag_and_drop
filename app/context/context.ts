import { createContext, useState } from "react";
import { defaultCards } from "../data/data";

type ContextType = {
  children: React.ReactNode
}
type Card = {
  id: number;
  title: string;
  column: string;
}
const [cards, setCards] = useState<Card[]>(defaultCards);

export const CardContext = createContext()