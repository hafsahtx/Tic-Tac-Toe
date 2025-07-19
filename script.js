const Game = (function() {
    function gameState(players){
        let gameboard = createGameBoard()
        let activePlayer = players[0];  
        return {players,gameboard,activePlayer}      
    }
    function createGameBoard(){
        let availableSpace = Array.from(document.querySelectorAll("div.item"));
        return {availableSpace,occupiedSpace: []}
    }
    function changeActivePlayer(state){
        if(state.activePlayer === state.players[0]){
            state.activePlayer = state.players[1];
        }else{
            state.activePlayer = state.players[0];
        }
    }
    function updateBoard(state,item){
        if(state.activePlayer===state.players[0]){
            item.innerHTML = "X"
        }else{
            item.innerHTML = "O";
        }
        //check logic here
        //for now change player
        changeActivePlayer(state);
        
    }
    function checkboard(state){
        for(let item of state.gameboard.availableSpace){
            item.addEventListener("click",()=>{
                let i=0;
                state.gameboard.occupiedSpace.push(item);
                console.log(state.gameboard.availableSpace);
                for(let sqr of state.gameboard.availableSpace){
                    console.log('......')
                    if(sqr===item){
                        state.gameboard.availableSpace.splice(i,1);
                        break;
                    }
                    i++;
                }
                updateBoard(state,item);
            });
        }
    }
    function startGame(){
        const players = [{name: 'player1', symbol: 'X'},{name: 'player2', symbol: 'O'}];
        const state = gameState(players);
        console.log(state);
        checkboard(state)
    }    
    return {
        init: startGame
    }
})();
Game.init();