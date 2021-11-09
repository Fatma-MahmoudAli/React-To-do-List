
import React ,{ Component } from 'react';
import Snake from './Snake'
import Food from './Food';



const getRandomCoordinates = () => {
  let min = 1;
  let max = 98 ; 
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return[x,y]
}
// const canvas = document.querySelector(".game-area").innerHTML('GameOver');



const initialState = {
    food : getRandomCoordinates(), 
    direction :'RIGHT',
    speed : 100 , 
    snakeDots:[
      [0,0],
      [2,0]
    ]
}
class App extends Component {
  
  state = initialState
  componentDidMount(){
    setInterval (this.moveSnake , this.state.speed)
    document.onkeydown = this.onkeydown ;
  }

  componentDidUpdate(){
  this.checkIfoutBorders();
  this.checkIfCollapsed();
  this.checkIfEat ();
  }

  onkeydown = (e) => {
    e =e || window.event ; 
    switch (e.keyCode) {
      case 38  :
        this.setState ({direction : 'UP'});
        break ; 
      case 40  :
        this.setState ({direction : 'DOWN'});
        break ;  
      case 37  :
         this.setState ({direction : 'LEFT'});
         break ; 
      case 39  :
         this.setState ({direction : 'RIGHT'});
         break ; 
    }
  }

   moveSnake = () => {
     let dots = [...this.state.snakeDots];
     let head = dots[dots.length - 1];

     switch (this.state.direction) {
       case 'RIGHT': 
       head = [head[0] + 2, head [1]];
       break ; 

       case 'LEFT':
        head = [head[0] - 2, head [1]];
        break ; 

        case 'DOWN':
        head = [head[0], head [1] + 2];
        break ; 

        case 'UP':
        head = [head[0], head [1] - 2];
        break ; 
        
     }
     dots.push(head);
     dots.shift();
     this.setState({
       snakeDots:dots
     })

   }
   checkIfoutBorders(){
     let head = this.state.snakeDots[this.state.snakeDots.length - 1];
     if (head[0] >= 100 || head[1] >= 100 || head[0] < 0  || head[1] < 0){
       this.onGameOver();
     }
   }
   

   checkIfCollapsed() {
     let snake = [...this.state.snakeDots];
     let head = snake[snake.length - 1] ; 
     snake.pop(); 
     snake.forEach(dot => {
       if (head[0] == dot[0] && head[1] == dot [1]) {
         this.onGameOver();
       }
     })
   }

   checkIfEat() {
     let head = this.state.snakeDots[this.state.snakeDots.length - 1];
     let food = this.state.food;
     if(head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
       this.enlargeSnake();
       this.increaseSpeed ();
       
     }
   }

   enlargeSnake() {
     let newSnake = [...this.state.snakeDots] ; 
     newSnake.unshift([])
     this.setState ({
       snakeDots : newSnake
     })
   }

   
   increaseSpeed () {
     if (this.state.speed > 10){
       this.setState ({
         speed : this.state.speed - 10
       })
     }
   }

   onGameOver(){
    // ctx.fillText("Game Over!");
  
    alert(`Game Over . Score is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }

//   if (gameOver) {
//     ctx.fillStyle = "white";
//     ctx.font = "50px Verdana";

//     if (gameOver) {
//       ctx.fillStyle = "white";
//       ctx.font = "50px Verdana";

//       var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
//       gradient.addColorStop("0", " magenta");
//       gradient.addColorStop("0.5", "blue");
//       gradient.addColorStop("1.0", "red");
//       // Fill with gradient
//       ctx.fillStyle = gradient;

//       ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
//     }

//     ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
//   }

//   return gameOver;
// }
  render() {
  return (
    <div >
        <h1>Snake Game!</h1>
        <h5>Score={this.state.snakeDots.length - 2}</h5>
      {/* <div>
      
      </div> */}
      <div className="game-area" id="game">
      <Snake snakeDots={this.state.snakeDots} />
      <Food dot={this.state.food} />
      </div>
    </div>
  );
  }
}

export default App;












// import React from 'react';
// import './App.css';

// export default function App() {
//   const url = "https://fontawesome.com/";

//   const pokemons = [
//     { id : 1,  class:" fa fa-ball "} ,
//     { id : 8, name : "wartotle"} ,
//     { id : 9, name : "blastoise"} ,
//     { id : 6, name : "charizard"} 

//   ];
//   const pairOfPokemons = [...pokemons, ...pokemons];


//   let flipCard ; 
//   flipCard = false ;
//   return (
//   <div className="app">
//     <div className="cards">
//       {pairOfPokemons.map((pokemon,index) => {
//         return (
//         <div className={`pokemon-card ${flipCard ? "flipped" :""}`} key={index}>
//           <div className="inner">
//             <div className="front">
//                    <img
//                     src={`${url}/${pokemon.id}.png`}
//                     alt="pokemon-name"
//                     width="100"
//                   />   
//             </div>
//             <div className="back"></div>

//           </div>

//         </div>
//         )
//       })}
//     </div>
//   </div> 
//   )
// }


// const pairOfPokemons = [...pokemons, ...pokemons];

//   function flipCard(index) {
//     setOpenedCard((opened) => [...opened, index]);
//   }

//   useEffect(() => {
//     if (openedCard < 2) return;

//     const firstMatched = pairOfPokemons[openedCard[0]];
//     const secondMatched = pairOfPokemons[openedCard[1]];

//     if (secondMatched && firstMatched.id === secondMatched.id) {
//       setMatched([...matched, firstMatched.id]);
//     }

//     if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
//   }, [openedCard]);

//   return (
//     <div className="App">
//       <div className="cards">
//         {pairOfPokemons.map((pokemon, index) => {
//           //lets flip the card

//           let isFlipped = false;

//           if (openedCard.includes(index)) isFlipped = true;
//           if (matched.includes(pokemon.id)) isFlipped = true;
//           return (
//             <div
//               className={`pokemon-card ${isFlipped ? "flipped" : ""} `}
//               key={index}
//               onClick={() => flipCard(index)}
//             >
//               <div className="inner">
//                 <div className="front">
//                   <img
//                     src={`${url}/${pokemon.id}.png`}
//                     alt="pokemon-name"
//                     width="100"
//                   />
//                 </div>
//                 <div className="back"></div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
