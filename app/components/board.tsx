'use client';
import { useState } from "react";
import Column from "./column";
import { defaultCards } from "../data/data";
import BurnBarrel from "./burn_barrel";

type Card = {
  id: number;
  title: string;
  column: string;
}
const Board = () => {

  const [cards, setCards] = useState<Card[]>(defaultCards);

  return (
    <div className="w-full h-full flex gap-3 p-12 overflow-scroll">
      <Column title="Backlog" headingColor="text-neutral-400" column="backlog" cards={cards} setCards={setCards} />
      <Column title="Todo" headingColor="text-red-500" column="todo" cards={cards} setCards={setCards} />
      <Column title="Doing" headingColor="text-yellow-500" column="doing" cards={cards} setCards={setCards} />
      <Column title="Done" headingColor="text-green-500" column="done" cards={cards} setCards={setCards} />
      <BurnBarrel setCards={setCards} />
    </div>
  );
}
 
export default Board;