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


let player1 = createPlayer("player1");
let player2 = createPlayer("player2");
console.log(player1)
console.log(player2);
let gameboard = createGameboard();
console.group(gameboard)