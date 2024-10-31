'use client'

import { createContext, useState } from "react";
import Button from "./button";
import AddCardForm from "./add_card_form";

interface Props {
  column: string
}

type AddCardContextType = {
  setText: React.Dispatch<React.SetStateAction<string>>
  setAdding: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddCardContext = createContext<AddCardContextType>({} as AddCardContextType);
const AddCard: React.FC<Props> = ({ column }) => {

  const [text, setText] = useState('');
  const [adding, setAdding] = useState(false);

  const values: AddCardContextType = {setText, setAdding};
  return (
    <AddCardContext.Provider value={values}>
      <div>
        {adding ? <AddCardForm text={text} column={column} /> : <Button text="Add Card" value={true}/> }
      </div>
    </AddCardContext.Provider>
  );
}
 
export default AddCard;