import Board from './board';
import NameInput from './nameInput';
import './css/index.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import RecordList from './scoreboardList';


export default function Game(props) {

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

    const [gameState, setGameState] = useState({
        name1: props.name1,
        name2: props.name2,
        history: [
            {
                squares: Array(9).fill(null)
            }
        ],
        stepNumber: 0,
        xIsNext: calculateFirstPlayer(),
        newGame: props.newGame
    });

    const navigate = useNavigate();
    const params = useParams();
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);

            console.log(response)

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    function handleClick(i) {
        const history = gameState.history.slice(0, gameState.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = gameState.xIsNext ? "X" : "O";
        setGameState({
            name1: gameState.name1,
            name2: gameState.name2,
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !gameState.xIsNext
        });
    }

    function resetJumpTo(step) {

        var playerChoice = calculateFirstPlayer();
        if (playerChoice) {
            setGameState({
                name1: gameState.name2,
                name2: gameState.name1,
                history: [
                    {
                        squares: Array(9).fill(null)
                    }
                ],
                stepNumber: step,
                xisNext: calculateFirstPlayer(),
                newGame: false
            });
            return <Game name1={gameState.name1} name2={gameState.name2} newGame={false} />;
        } else {
            setGameState({
                name1: gameState.name1,
                name2: gameState.name2,
                history: [
                    {
                        squares: Array(9).fill(null)
                    }
                ],
                stepNumber: step,
                xisNext: !calculateFirstPlayer(),
                newGame: false
            });
            return <Game name1={gameState.name1} name2={gameState.name2} newGame={false} />;

        }

    }

    function restartGame() {
        // setGameState({
        //     newGame: true
        // });
        window.location.reload();
    }

    let content;

    const history = gameState.history;
    const current = history[gameState.stepNumber];
    const winner = calculateWinner(current.squares);
    var winnerName = "";


    let status;
    if (winner) {
        status = "Winner: " + winner + " - " + (gameState.xIsNext ? gameState.name2 : gameState.name1);
        winnerName = (gameState.xIsNext ? gameState.name2 : gameState.name1);
    }
    else if (gameState.stepNumber == 9) {
        status = "Draw - No One Wins";
    }
    else {
        status = "Player "
            + (gameState.xIsNext ? gameState.name1 : gameState.name2)
            + ": " + (gameState.xIsNext ? "X" : "O");
    }

    // This function will handle the submission.
    async function addPerson(e) {
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = {
            // _id: e[0],
            name: e[0],
            wins: e[1],
        };

        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        // navigate("/");
    }

    async function editPerson(e) {
        const editedPerson = {
            _id: e[0],
            name: e[1],
            wins: e[2],
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${e[0]}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // navigate("/");
    }

    if (!gameState.newGame) {
        if (winner || status === "Draw - No One Wins") {
            const recordExists = records.includes(record => record.includes(winnerName));
            console.log(recordExists)
            if (recordExists) {

                var winnerDetails = records.find(record => record.name.includes(winnerName));
                console.log(winnerDetails)
                var e = [winnerDetails._id, winnerDetails.name, winnerDetails.wins + 1];

                editPerson(e);
            } else {
                winnerName = (gameState.xIsNext ? gameState.name2 : gameState.name1);
                var wins = 1;
                e = [winnerName, wins]
                addPerson(e)
            }

            content = (
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={i => handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        {/* <div><button onClick={() => resetJumpTo(0)}>Reset</button></div> */}
                        <div><button onClick={() => restartGame()}>New Game</button></div>
                    </div>
                    <div>
                        <RecordList />
                    </div>
                </div>
            );
        }
        else {
            content = (
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={i => handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                    </div>
                    <div>
                        <RecordList />
                    </div>
                </div>
            );
        }
    }
    else {
        content = (
            <div>
                <NameInput />
            </div>
        );
    }
    return <div>{content}</div>
}
