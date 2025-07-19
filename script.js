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
    function checkWin(state,player){
        let checkarr;
        let winningarr = [['sqr1','sqr2','sqr3'],['sqr4','sqr5','sqr6'],['sqr7','sqr8','sqr9'],
                          ['sqr1','sqr4','sqr7'],['sqr2','sqr5','sqr8'],['sqr3','sqr6','sqr9'],
                          ['sqr1','sqr5','sqr9'],['sqr3','sqr5','sqr7']];
        //357,123 not working
        if(player===1){
            checkarr = state.players[0].occupiedSpace;
        }else{
            checkarr = state.players[1].occupiedSpace;
        }
        let count = 0;
        for(const x of winningarr){
            count=0;
            x.forEach((num)=>{
                if(checkarr.includes(num)){
                    count++;
                }
            });
            if(count===3)return true;
        }

        return false;
    }

    function changeActivePlayer(state){
        if(state.activePlayer === state.players[0]){
            state.activePlayer = state.players[1];
        }else{
            state.activePlayer = state.players[0];
        }
       
    }

    function updateBoard(state,item){
        let player;
        let check;
        if(state.activePlayer===state.players[0]){
            item.innerHTML = "X"
            player = 1;
        }else{
            item.innerHTML = "O";
            player = 2;
        }
        //check logic here
        if(player===1){
            if(state.players[0].occupiedSpace.length>=3){
                check = checkWin(state,player)
            }
        }else{
            if(state.players[1].occupiedSpace.length>=3){
                check = checkWin(state,player)
            }
        }

        if(check){
            console.log(`player${player} has won!`)
        }
        
        //for now change player
        changeActivePlayer(state);
        
    }
    function checkboard(state){
        for(let item of state.gameboard.availableSpace){
            item.addEventListener("click",()=>{
                let i=0;
                state.activePlayer===state.players[0]?state.players[0].occupiedSpace.push(item.id):state.players[1].occupiedSpace.push(item.id);
                for(let sqr of state.gameboard.availableSpace){
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
        const players = [{name: 'player1', symbol: 'X', occupiedSpace: []},{name: 'player2', symbol:'O', occupiedSpace: []}];
        const state = gameState(players);
        console.log(state);
        checkboard(state)
    }    
    return {
        init: startGame
    }
})();
Game.init();