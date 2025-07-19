const Game = (function() {
    function gameState(players){
        let gameboard = createGameBoard()
        let gameEnd = false;
        let activePlayer = players[0];  
        return {players,gameboard,activePlayer,gameEnd}      
    }
    function createGameBoard(){
        let availableSpace = Array.from(document.querySelectorAll("div.item"));
        return {availableSpace,occupiedSpace: []}
    }
    function resetBoard(state){
        let resetBtn = document.getElementById("reset");
        resetBtn.addEventListener("click",()=>{
            for(let sqr of state.players[0].occupiedSpace){
                sqr.innerHTML = "";
            }
            for(let sqr of state.players[1].occupiedSpace){
                sqr.innerHTML = "";
            }
            state.players[0].occupiedSpace = [];
            state.players[1].occupiedSpace = [];
            state.activePlayer = state.players[0];
            startGame();
        })
    }
    function showDialog(message,state){
        console.log('dialog function entered')
        const dialog = document.getElementById('dialog');
        const text = document.getElementById('text');
        text.innerHTML = message;
        dialog.showModal();
        state.gameEnd = true;
        resetBoard(state);
    }
    function checkWin(state,player){
        let checkarr;
        let winningarr = [['sqr1','sqr2','sqr3'],['sqr4','sqr5','sqr6'],['sqr7','sqr8','sqr9'],
                          ['sqr1','sqr4','sqr7'],['sqr2','sqr5','sqr8'],['sqr3','sqr6','sqr9'],
                          ['sqr1','sqr5','sqr9'],['sqr3','sqr5','sqr7']];
        if(player===1){
            checkarr = state.players[0].occupiedSpace;
        }else{
            checkarr = state.players[1].occupiedSpace;
        }
        let idArray = []
        for(let element of checkarr){
            idArray.push(element.id);
        }
        let count = 0;
        for(const x of winningarr){
            count=0;
            x.forEach((num)=>{
                if(idArray.includes(num)){
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
        let message;
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
            //win
            message = `player ${player} has won!`
            showDialog(message,state);
            console.log(`player${player} has won!`)
        }else if(state.gameboard.availableSpace.length===0){
            //draw
            message = "It's a draw!";
            showDialog(message,state);
            console.log("It's a draw##");
        }
        
        //for now change player
        changeActivePlayer(state);
        
    }
    function checkboard(state){
        for(let item of state.gameboard.availableSpace){
            item.addEventListener("click",()=>{
                if(item.textContent==="" && !state.gameEnd){
                console.log("square clicked")
                let i=0;
                state.activePlayer===state.players[0]?state.players[0].occupiedSpace.push(item):state.players[1].occupiedSpace.push(item);
                for(let sqr of state.gameboard.availableSpace){
                    if(sqr===item){
                        state.gameboard.availableSpace.splice(i,1);
                        break;
                    }
                    i++;
                }
                updateBoard(state,item);
            }
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