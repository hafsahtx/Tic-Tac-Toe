function createPlayer(name){
    let symbol;
    let turn;
    if(name==="player1"){
        symbol = 'X';
        turn = true;
    }else{
        symbol = 'O';
        turn = false;
    }
    return {name,symbol,turn};
}

function createGameboard(){
    let items = Array.from(document.querySelectorAll("div.item"));
    return items;
}

function gameState(players){
    //flow of game
    let availableSpace = 9;
    let activePlayer = players[0];
    return {availableSpace, activePlayer};
}

function changeActivePlayer(state,finishedTurn,players){
    if(state.activePlayer.symbol === "X"&&finishedTurn===true){
        state.activePlayer = players[1]
    }else if(state.activePlayer.symbol === "O"&&finishedTurn===true){
        state.activePlayer = players[0];
    }
}
function updateBoard(square,state,players){
    if(square){
        if(state.activePlayer.symbol === "X"){
            console.log("AAA")
            square.innerHTML = "X";
        }else{
            console.log("BBBB")
            square.innerHTML = "O";
        }
    }
    changeActivePlayer(state,true,players)
}

function checkBoard(gameboard,state,players){
    for(let item of gameboard){
        item.addEventListener("click",(e)=>{
            console.log(`square ${e.target.textContent} was selected`);
            updateBoard(item, state,players);
            return true;
        })
        
    }
    return false;
}



function playGame(){
    let players = [createPlayer("player1"), createPlayer("player2")]
    let gameboard = createGameboard();
    let state = gameState(players);
    let finishedTurn = checkBoard(gameboard,state,players);
}



playGame();