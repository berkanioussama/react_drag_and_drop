import DropIndicator from "./drop_indicator";

interface Props {
  id: number,
  title: string,
  column: string,
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, card: {id: number, title: string, column: string}) => void
}

const Card: React.FC<Props> = ({ id, title, column, handleDragStart }) => {
  return (
    <div className="">
      <DropIndicator beforeId={id} column={column}/>
      <div
        draggable="true"
        onDragStart={(event)=>handleDragStart(event, {id, title, column})}
        className="cursor-grab active:cursor-grabbing bg-neutral-800 border border-neutral-700 rounded p-3"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </div>
    
  );
}
 
export default Card;