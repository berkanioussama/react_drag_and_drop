'use client'

import { useState } from "react";
import Button from "./button";
import AddCardForm from "./add_card_form";

type Card = {
  id: number;
  title: string;
  column: string;
}
interface Props {
  column: string
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
}
const AddCard: React.FC<Props> = ({ column, setCards }) => {

  const [text, setText] = useState('');
  const [adding, setAdding] = useState(false);
  return (
    <div>
      {adding ? <AddCardForm text={text} setText={setText} setAdding={setAdding} setCard={setCards} column={column} /> : <Button text="Add Card" setAdding={setAdding} value={true}/> }
    </div>
  );
}
 
export default AddCard;