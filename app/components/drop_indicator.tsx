interface Props {
  beforeId: number,
  column: string
}

const DropIndicator: React.FC<Props> = ({ beforeId, column}) => {
  return (
    <div
      data-before={beforeId || -1}
      data-column={column}
      className="w-full h-0.5 my-0.5 bg-violet-400 opacity-0"
    >
    </div>
  );
}
 
export default DropIndicator;