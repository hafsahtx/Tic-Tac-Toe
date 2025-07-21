const game = (function() {
    function gameState(players){
        let gameboard = document.querySelector(".container");
        let gameEnd = false;
        let activePlayer = players[0];
        let availableSpace = 9;
        let clickHandler = null;
        let winning = [['sqr1','sqr2','sqr3'],['sqr4','sqr5','sqr6'],['sqr7','sqr8','sqr9'],
                       ['sqr1','sqr4','sqr7'],['sqr2','sqr5','sqr8'],['sqr3','sqr6','sqr9'],
                       ['sqr1','sqr5','sqr9'],['sqr3','sqr5','sqr7']];
        
        return {players,gameboard,activePlayer,gameEnd,availableSpace,winning,clickHandler};      
    }
    function player(name,symbol){
        return{name, symbol, occupiedSpace: []}
    }

    function resetBoard(state){
        let resetBtn = document.getElementById("reset");
        let startBtn = document.getElementById("submit");
        let container = document.querySelector(".container");
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
            reset.style.display = 'none';
            state.gameboard.removeEventListener("click",state.clickHandler);
            container.style.display = "none";
            startBtn.disabled = false;
        })
        
    }
    function showDialog(message,state){
        const dialog = document.getElementById('dialog');
        const text = document.getElementById('text');
        text.innerHTML = message;
        dialog.showModal();
        state.gameEnd = true;
        const reset = document.getElementById("reset");
        reset.style.display = 'block';
        resetBoard(state);
    }

    function checkWin(state,player){
        let winningarr = state.winning;
        let checkarr = player.occupiedSpace;
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
        let playerIndex = state.activePlayer === state.players[0] ? 0 : 1;
        let player = state.players[playerIndex];
        let check;
        let message;
        item.innerHTML = player.symbol;
        //check logic here
        if(player.occupiedSpace.length>=3){
            check = checkWin(state,player)
        }
        if(check){
            //win
            message = `${player.name} is the winner!`
            showDialog(message,state);
        }else if(state.availableSpace===0){
            //draw
            message = "It's a draw!";
            showDialog(message,state);
        }else{
            changeActivePlayer(state);
        }
    }

    function checkboard(state){
        const handler = function (event){
            if(event.target.matches(".item")){
                if(event.target.innerHTML==="" && !state.gameEnd){
                    state.activePlayer===state.players[0]?state.players[0].occupiedSpace.push(event.target):state.players[1].occupiedSpace.push(event.target);
                    state.availableSpace--;
                    updateBoard(state,event.target);
                }
            }
        }
        state.clickHandler = handler;
        state.gameboard.addEventListener("click",state.clickHandler);
    }

    function startGame(player1, player2){
        const players = [player(player1,"X"),player(player2,"O")]
        const state = gameState(players);
        checkboard(state);
    }    
    return {
        start: startGame
    }
})();
const startBtn = document.getElementById("submit");
startBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const form = document.getElementsByName("playerForm")[0];
    const player1 = document.forms['playerForm']["player1"].value;
    const player2 = document.forms['playerForm']["player2"].value;
    const container = document.querySelector(".container");
    form.reset();
    startBtn.disabled = true;
    container.style.display = "flex";
    game.start(player1,player2);
 });
