import './App.css';
import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
import gon from './assents/img/gon.png';
import killua from './assents/img/killua.png';
import interroga from './assents/img/persona_pregunta.png'
import admira from './assents/img/person_admiracion.png'
import hisoka from './assents/img/hisoka.png';
import leorio from './assents/img/leorio.png';
import netero from './assents/img/netero.png';
import confetti from 'canvas-confetti'
import Timer from './components/Timer';

const newimages = [netero,gon, killua,  hisoka, leorio];
let size = 3;
let clicks = 0;
const imageList = newimages.slice(0, size);
const App = () => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffledImageList = shuffleArray([...imageList, ...imageList]);
    setShuffledMemoBlocks(
      shuffledImageList.map((image, i) => ({
        index: i,
        image,
        flipped: false,
      }))
    );
  }, []);

  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const handleMemoClick = (memoBlock) => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);
    clicks += 1;
    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.image === memoBlock.image) {
      setSelectedMemoBlock(null);
      if (shuffledMemoBlocksCopy.every((block) => block.flipped)) {
       
        calculateScore();
        confetti({
          particleCount:200,
          startVelocity:30,
          spread:300,
          gravity:1.5,
          origin:{y:0}

        })
        size += 2;
        setTimeout(() => {
          setShuffledMemoBlocks([]);
          setSelectedMemoBlock(null);
          setAnimating(false);
          const newImageList = newimages.slice(0, size);
          const shuffledImageList = shuffleArray([...newImageList, ...newImageList]);
          setShuffledMemoBlocks(
            shuffledImageList.map((image, i) => ({
              index: i,
              image,
              flipped: false,
            }))
          );
        }, 500);
      }
    } else {
      setAnimating(true);
     
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 500);
    }
  };

  const calculateScore=() =>{
    const passLevel= size*10;
    let total = score;
    const cards = size *2;
   
    if(clicks === cards){
    total= total + (cards*2)+passLevel
     
    }else if (clicks>cards && clicks<cards+5) {
    total= total + cards + passLevel;
      
    } else if(clicks>cards+5 && clicks<cards+10){
      total = total + cards/2 + passLevel
    }else{
    total= total+ Math.round(cards/3) + passLevel
    }
    clicks=0;
    setScore(total)
   
  }
  const [start, setStart]= useState(false)
  return (
    
    <div className='App'>
      <h1 className='h1'>Juego del Memorama</h1>
      <div className='cont'>
      <img src={admira} alt="Memory Block" className='left-image'/>
      <img src={interroga} alt="Memory Block" className='right-image'/>
      <Timer start={start}/>
        <div className='buttons'><button onClick={()=>setStart(true)} variant="text" color="default" >start</button>
          
        </div>
    
      <h2>Score: {score}</h2>
      
      </div>
      <Board className="bor" memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick} />
    </div>
  );
};

export default App;
