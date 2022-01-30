import React,{useState} from 'react';
import './App.css';
import './main.css'
import img from './rules.png'

import winsound from './sound/win.wav';
import movesound from './sound/move.wav';
import errorsound from './sound/error.wav';
import drawsound from './sound/draw.flac';


function App() {
 const [player,setplayer] =useState([[],[],[]]);
 const [xturn,setxturn] =useState(0);
 const [expand,setexpand] =useState(true);
  const [winner,setwinner] =useState();
  
  const[count,setcount]=useState(0);
  const finalMove = 9;

  
  const playwinsound =new Audio(winsound);
const playmovesound =new Audio(movesound);
const playerrorsound =new Audio(errorsound);
const playdrawsound =new Audio(drawsound);




const show=(rows,cols)=>{
  const newArray=player.slice();

  if(newArray[rows][cols]===undefined){
    newArray[rows][cols]=xturn;
    
    if(finalwinner()){
      playwinsound.play();
      if(xturn===0){
        setwinner('O');
      }else{
        setwinner('X');
      }  
     
    }else{
     
      setplayer(newArray);
      playmovesound.play();
      setxturn(1-xturn);
     
       console.log(count)
    }

    if(count===8 && !finalwinner()){
      playdrawsound.play();
      console.log("hello");
      }
      setcount(count+1);
    
  }
 
  
  playerrorsound.play();

}
  const clearthis=()=>{
    setplayer([[],[],[]]);
    setwinner(undefined);
    setcount(0);
  }

  const xoro=(rows,cols)=>{
  return(
    <>
    {player[rows][cols]===0 ? 'O':null}
    {player[rows][cols]===1 ? 'X':null}
    </>
  )}
   
const rowchecked =()=>{
  for(let i=0;i<3;i++){
     if(player[i][0]===player[i][1] && player[i][1]===player[i][2] && player[i][0]!==undefined){
       return true;
     }
  }
  return false;
}

const colchecked =()=>{
  for(let j=0;j<3;j++){
     if(player[0][j]===player[1][j] && player[1][j]===player[2][j] && player[0][j]!==undefined){
       return true;
     }
  }
  return false;
}


const diagonalchecked =()=>{
  
     if(player[0][0]===player[1][1] && player[1][1]===player[2][2] && player[0][0]!==undefined){
       return true;
     }else if(player[0][2]===player[1][1] && player[1][1]===player[2][0] && player[0][2]!==undefined){
        return true
     }
  
  return false;
}


const finalwinner =()=>{
  return (rowchecked() || colchecked() || diagonalchecked() ) 
}
const openclose=()=>{
  setexpand(!expand);
  setwinner(undefined);
  setplayer([[],[],[]]);
  setcount(0);
}




  return (
    <>
   <div className="title text-center">TIC TAC TOE</div>

<div className="content">
{winner!==undefined && <p className="playername">Player {winner} has WON the GAME !!!</p>}
{winner===undefined && count===finalMove && <p className="playername">It's a Draw !!!</p>}
   <div className="game">
    {expand? <div className="image">
     <img src={img}/>
     </div> : 
    <>
     <table>
      <tbody>
          <tr>
              <td  onClick={()=>show(0,0)} className="rb" ><span>{xoro(0,0)}</span></td>
              <td onClick={()=>show(0,1)} className="rb"><span>{xoro(0,1)}</span></td>
              <td onClick={()=>show(0,2)} className="b"><span>{xoro(0,2)}</span></td>
          </tr>
          <tr>
              <td onClick={()=>show(1,0)} className="rb"><span>{xoro(1,0)}</span></td>
              <td onClick={()=>show(1,1)} className="rb"><span>{xoro(1,1)}</span></td>
              <td  onClick={()=>show(1,2)} className="b"><span>{xoro(1,2)}</span></td>
          </tr>
          <tr>
              <td  onClick={()=>show(2,0)} className="r"><span>{xoro(2,0)}</span></td>
              <td onClick={()=>show(2,1)} className="r"><span>{xoro(2,1)}</span></td>
              <td onClick={()=>show(2,2)} className=""><span>{xoro(2,2)}</span></td>
          </tr>
          </tbody>
         
      </table>
      <div className="text-center">
      <button className="but" onClick={clearthis}>Start New Game</button> 
      </div>
      </>
      } 
    
      <div className="text-center">
         <button className="openclose" onClick={openclose}>{expand?'Open Game':'Close Game'}</button> 
      </div>
     </div>
     </div>
     
      
      </>
    
  );
}

export default App;