import React from 'react'
import { Board } from './Board'

export class Game extends React.Component <{}, {stepNumber:number, history:any, xIsNext: boolean}> {
    constructor(props:any) {
      super(props)
      this.state = {
        history: [{
          squares:Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      }
    }

    handleClick(i:any) {
      const history = this.state.history.slice(0, this.state.stepNumber +1)
      const current = history[history.length - 1]
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      })
    }

    jumpTo(step:number) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }

    render() {
      const history = this.state.history
      const current = history[this.state.stepNumber]
      const winner = calculateWinner(current.squares)

      const moves = history.map((step:number, move:number) => {
        const desc = move ?
          'Go to step # ' + move :
          'To the start'
        return (
          <li key={move}>
            <button className='w-full m-1 p-1 bg-blue-500 text-white'  onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      })

      let status = 'Next player ' + (this.state.xIsNext ? 'X' : 'O')
      if(winner === 'X' || winner === 'O') status = 'Winner is ' + winner
      if(winner === 'draw') status = 'Draw'
      return (
        
        <div className='bg-gray-900 h-screen w-screen flex flex-wrap content-start'>
          <h1 className='text-center text-yellow-500 text-5xl w-full m-5 my-20'>tic-tac-toe</h1>
          <div className=' w-1/4 min-w-fit text-center text-white text-xl p-3'>{status}</div>
          <div className="p-2 m-0 w-1/2 ">
            <Board 
              squares={current.squares}
              onClick={(i:number) => this.handleClick(i)}
            />
          </div>
          <div className=" w-1/4 min-w-fit text-center text-white text-xl p-3">
            <ol className='w-4/5'>{moves}</ol>
          </div>
          
        </div>
      );
    }
  }
  
  function calculateWinner(squares:any) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let draw = 0
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
      if(squares[a] !== null && squares[b] !== null && squares[c] !== null)draw++
      if(draw === 8) return 'draw'
    }
    return null;
  }