import { FiPlus } from "react-icons/fi";
import Button from "./button";
import { useContext } from "react";
import { CardContext } from "./board";
import { AddCardContext } from "./add_card";

interface Props {
  text: string;
  column: string;
}

const AddCardForm: React.FC<Props> = ({ text, column }) => {
  
  const { setCards } = useContext(CardContext);
  const { setText, setAdding } = useContext(AddCardContext);

  function handleSubmit(event: { preventDefault: () => void; }){
    event.preventDefault();

    if (!text.trim().length) return;
    
    const newCard = {
      id: Math.random(),
      title: text.trim(),
      column,
    };

    setCards((prev) => [...prev, newCard]);
    setAdding(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setText(e.target.value)}
        autoFocus
        placeholder="Add a card..."
        className="w-full p-3 text-sm text-neutral-50 bg-violet-400/20 border rounded border-violet-400 focus:outline-0"
      />
      <div className="flex items-center justify-end">
        <Button text="Close" value={false} />
        <button
          type="submit"
          className="flex gap-1.5 items-center px-3 py-1.5 text-xs bg-neutral-50 text-neutral-950 hover:bg-neutral-300 rounded transition-colors"
        >
          <span>Add</span>
          <FiPlus/>
        </button>
      </div>
    </form>
  );
}
 
export default AddCardForm;