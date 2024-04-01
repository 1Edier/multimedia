import './MemoBlock.css';
import inter from "../../assents/img/icono_interrogacion.png"
const MemoBlock = ({ animating, handleMemoClick, memoBlock }) => (
 
  <div>
    
    <div className="memo-block" onClick={() => (!memoBlock.flipped && !animating) && handleMemoClick(memoBlock)}>
     
    <div className={`memo-block-inner ${memoBlock.flipped && 'memo-block-flipped'}`}>
      <div className="memo-block-front">
      <img src={inter}  className='delantero'/>
      </div>
      <div className="memo-block-back">
        <img src={memoBlock.image} alt="Memory Block" className=''/> 
      </div>
    </div>
  </div>
  </div>
);

export default MemoBlock;
