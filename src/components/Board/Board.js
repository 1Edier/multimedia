import './Board.css';
import MemoBlock from '../MemoBlock/MemoBlock';

const Board = ({ animating, handleMemoClick, memoBlocks }) => {
  return (
    
    <main className="board">
      
      {memoBlocks.map((memoBlock, i) => {
        return <MemoBlock key={`${i}_${memoBlock.image}`} animating={animating} handleMemoClick={handleMemoClick} memoBlock={memoBlock} />;
      })}
    </main>
  );
};

export default Board;
