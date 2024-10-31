import { createContext, useState } from "react";
import { defaultCards } from "../data/data";

type Card = {
  id: number;
  title: string;
  column: string;
}
type CardContextType = {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
}
interface Props {
  children: React.ReactNode
}

export const CardContext = createContext<CardContextType>({} as CardContextType);

export const CardContextProvider: React.FC<Props> = ({ children }) => {

  const [cards, setCards] = useState<Card[]>(defaultCards);
  const values: CardContextType = { cards, setCards };
  
  return (
    <CardContext.Provider value={values}>
      {children}
    </CardContext.Provider>
  )
}

