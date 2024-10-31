"use client";
import { createContext, useState } from "react";
import Column from "./column";
import { defaultCards } from "../data/data";
import BurnBarrel from "./burn_barrel";

type Card = {
  id: number;
  title: string;
  column: string;
};
type CardContextType = {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

export const CardContext = createContext<CardContextType>({} as CardContextType);
const Board = () => {

  const [cards, setCards] = useState<Card[]>(defaultCards);
  const values: CardContextType = { cards, setCards };

  return (
    <CardContext.Provider value={values}>
      <div className="w-full h-full flex gap-3 p-12 overflow-scroll">
        <Column
          title="Backlog"
          headingColor="text-neutral-400"
          column="backlog"
        />
        <Column title="Todo" headingColor="text-red-500" column="todo" />
        <Column title="Doing" headingColor="text-yellow-500" column="doing" />
        <Column title="Done" headingColor="text-green-500" column="done" />
        <BurnBarrel/>
      </div>
    </CardContext.Provider>
  );
};

export default Board;
