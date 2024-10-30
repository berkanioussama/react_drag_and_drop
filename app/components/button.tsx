import { FiPlus } from "react-icons/fi";

interface Props {
  text: string;
  setAdding: React.Dispatch<React.SetStateAction<boolean>>
  value: boolean
}

const Button: React.FC<Props> = ({ text , setAdding, value}) => {
  return (
    <button
      onClick={() => setAdding(value)}
      className="flex gap-1.5 items-center px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-50 transition-colors"
    >
      <span>{text}</span>
      <FiPlus/>
    </button>
  );
}
 
export default Button;