import Board from './board';
import React from 'react';
import NameInput from './nameInput';
import './css/index.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function calculateFirstPlayer() {
    const min = 1;
    const max = 2;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min

    if (rand === 1) {
        return true;
    } else if (rand === 2) {
        return false;
    };
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name1: props.name1,
            name2: props.name2,
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: calculateFirstPlayer()
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const reset = false
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        // if (move === 0) {
        //     this.state.xIsNext = calculateFirstPlayer();
        //     this.history = [
        //         {
        //             squares: Array(9).fill(null)
        //         }
        //     ]
        //     this.stepNumber = 0;
        //     // return (

        //     //     <li key={move}>
        //     //         <button onClick={() => this.jumpTo(move)}>{desc}</button>
        //     //     </li>
        //     // );

        // }


        // const moves = history.map((step, move) => {
        //     const desc = move ?
        //         'Go to move #' + move :
        //         'Reset';
        //     if (desc == 'Reset' && move != 0) {
        //         // this.state.xIsNext = calculateFirstPlayer();
        //         // this.history = [
        //         //     {
        //         //         squares: Array(9).fill(null)
        //         //     }
        //         // ]

        //         this.setState({
        //             history: [
        //                 {
        //                     // squares: Array(9).fill(null)
        //                     squares: []
        //                 }
        //             ],
        //             stepNumber: 0,
        //             xIsNext: calculateFirstPlayer()

        //         });
        //         reset = true;
        //         // return (
        //         //     <li key={move}>
        //         //         <button onClick={() => this.jumpTo(move)}>{desc}</button>
        //         //     </li>
        //         // );
        //     }
        //     else {
        //         return (
        //             <li key={move}>
        //                 <button onClick={() => this.jumpTo(move)}>{desc}</button>
        //             </li>
        //         );
        //     }
        // });

        // if (reset == true) {
        //     moves = null;
        //     reset = false;
        // }

        let status;
        if (winner) {
            status = "Winner: " + winner + " - " + (this.state.xIsNext ? this.state.name2 : this.state.name1);
        }
        else if (this.state.stepNumber == 9) {
            status = "Draw - No One Wins";
        }
        else {
            status = "Player "
                + (this.state.xIsNext ? this.state.name1 : this.state.name2)
                + ": " + (this.state.xIsNext ? "X" : "O");
        }

        if (winner || status === "Draw - No One Wins") {
            return (
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        {/* <ol>{moves}</ol> */}
                            <div>{status}</div>
                            <div><button onClick={() => this.jumpTo(0)}>Reset</button></div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        {/* <ol>{moves}</ol> */}
                    </div>
                </div>
            );
        }
    }
}

export default Game;