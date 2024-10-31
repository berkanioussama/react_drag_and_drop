'use client'

import Button from "./button";
import AddCardForm from "./add_card_form";
import { AddCardContext } from "../context/add_card_context";
import { useContext } from "react";

interface Props {
  column: string
}
const AddCard: React.FC<Props> = ({ column }) => {

  const {adding, text} = useContext(AddCardContext);

  return (
    <div>
      {adding ? <AddCardForm text={text} column={column} /> : <Button text="Add Card" value={true}/> }
    </div>
  );
}
 
export default AddCard;