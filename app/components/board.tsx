"use client";
import Column from "./column";
import BurnBarrel from "./burn_barrel";
import { CardContextProvider } from "../context/card_context";

const Board = () => {

  return (
    <CardContextProvider>
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
    </CardContextProvider>
  );
};

export default Board;
