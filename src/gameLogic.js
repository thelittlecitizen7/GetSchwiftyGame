var board = []

let interval;

var idsNextToEmpty = []


boardResult = []

var currentPlayer

if (localStorage.getItem("boardResult") == undefined){
    localStorage.setItem("boardResult",JSON.stringify([]))
}
else{
    boardResult = JSON.parse(localStorage.getItem("boardResult"))
}


function addPlayerDetails(playerDetails){
    boardResult.push(playerDetails)
    localStorage.setItem("boardResult",JSON.stringify(boardResult))
}


function createCubeBoard(id,number){
    var htmlCube = "<div class='col box text-center' id='"+id+"' onClick='replaceCube(this)'>"
    htmlCube += "<div class='card h-100'>"
    htmlCube += "<div class='card-body'>"
    if (number != 0){
        htmlCube += "<h1>"+id+"</h1>"
    }
    htmlCube += "</div>"
    htmlCube += "</div>"
    htmlCube += "</div>"
    return htmlCube;
}
function shaffle(array){
    return array.sort(() => {
        return Math.random() - 0.5;
    })
}

function createBoard(number){
    InitBoardNumbers(number);

    var boardDiv = document.getElementById("gameRow");

    var boardHtml = "<div class='col-md-8 border border-dark box text-center' id='board'>"
    
    for (var i = 0 ; i < board.length ; i++){
        
        boardHtml += "<div class='row justify-content-center'>"
        
        for (var j = 0 ; j < board.length ; j++){
            let id = board[i][j]
            
            boardHtml += createCubeBoard(id,parseInt(id))
           
        }
        
        boardHtml += "</div>"
    }
    boardHtml += "</div>"
    console.log(board)
    boardDiv.innerHTML = boardHtml;
}

function InitBoardNumbers(number){
    let c = [];
    for(let i = 0; i < number * number ; i++){ 
        c.push(i)
    }

    let newArr = shaffle(c);
    let count = 0;
    let newBoard = []
    for (var k = 0 ; k < number ; k++){
        let ls = []
        newBoard.push(ls)
        for (var m = 0 ; m < number ; m++){
            ls.push(newArr[count])
            count++;
        }
    }
    board = newBoard;
    
    while (!isGameValid()){
        InitBoardNumbers(number)
        console.log("not valid game")
    }
}


function renderNewHTMLBoard(){
    document.getElementById("resultGame").innerHTML = "";
    let playerName = document.getElementById("playerName").value
    let numberOfRows = document.getElementById("numberRows").value
    var errMsg = ""
    if (playerName === undefined || playerName === null || playerName === "")
    {
        errMsg += "player ,ust be givven"
    }

    if (numberOfRows === undefined || numberOfRows === null || numberOfRows === 0){
        errMsg += "number rows cannot be empty"
    }
    
    if (errMsg === ""){
        currentPlayer = new BoardDataModel(1,playerName,30,parseInt(numberOfRows) * parseInt(numberOfRows),new Date());
        createBoard(parseInt(numberOfRows))
        startTimer()
    }
    else{
        alert(errMsg)
    }
}

function isGameValid(){
    let countOpposite = 0;
    for (var k = 0 ; k < board.length ; k++)
    {
        let arr = board[k];
        if (arr != undefined){
            for (var m = 0 ; m < arr.length ; m++){
                if (arr[m] != 0){
                    let allBiggers = getOppositeNumbers(arr[m]);
                    countOpposite += allBiggers;
                }
            }
        }
    }
    if (board.length % 2 != 0){
        return countOpposite % 2 == 0;
    }
    else{
      let emptyCubeLocationRow = getIndexByNumber(0).x + 1;
      return (countOpposite + emptyCubeLocationRow) % 2 == 0;
    }
}



function getOppositeNumbers(number){
    let ls = convertBoardToArr();
    let lsBigger = []
    let indexNumber = ls.indexOf(number);
    for (let i = 0 ; i < ls.length ; i++){
        if (i > indexNumber){
            if ((ls[i] < number) && (ls[i] != 0)){
                lsBigger.push(ls[i]);
            }
        }
    }
    return lsBigger.length;
}

function convertBoardToArr(){
    var ls = []
    for (var k = 0 ; k < board.length ; k++)
    {
        let arr = board[k];
        if (arr != undefined){
            for (var m = 0 ; m < arr.length ; m++){
               ls.push(arr[m])
            }
        }
    }
    return ls
}




function replaceCube(card){
    if (!isCardNextToEmptyCard(parseInt(card.id))){
        console.log(`${card.id} not next to empty`);
        return;
    }
    var emptyCube = document.getElementById("0")
    let emptyHtml = emptyCube.innerHTML;
    let emptyId = emptyCube.id
    var emptyArrLocation = getIndexByNumber(0);
    let cardId = card.id
    var cardArrLocation = getIndexByNumber(parseInt(cardId));
    let empty = board[emptyArrLocation.x][emptyArrLocation.y];


    emptyCube.innerHTML = card.innerHTML
    emptyCube.removeAttribute("id")
    emptyCube.setAttribute("id",cardId)
    board[emptyArrLocation.x][emptyArrLocation.y] = board[cardArrLocation.x][cardArrLocation.y]
    

   
    card.innerHTML = emptyHtml
    card.removeAttribute("id")
    card.setAttribute("id",emptyId)
    board[cardArrLocation.x][cardArrLocation.y] = empty;
    console.log(board)
    if (checkIfWinner())
    {
        closeGame()
        
    }
}

function getIndexByNumber(cardId){

    for (var k = 0 ; k < board.length ; k++)
    {
        let arr = board[k];
        if (arr != undefined){
            for (var m = 0 ; m < arr.length ; m++){
                if (arr[m] == cardId){
                    return {x:k,y:m};
                }
            }
        }
    }
    return null;    
} 

function checkIfWinner(){
    var ls = convertBoardToArr();

    if (ls[ls.length - 1] == 0){
        for (let i = 0 ; i < ls.length - 1 ; i++)
        {
            if (ls[i + 1] != 0){
                var result = ls[i + 1] - ls[i];
                if (result != 1){
                    return false;
                }
            }
        }
        return true;
    }
    else{
        return false;
    }
}

function isCardNextToEmptyCard(cardId){
  var cardLocation = getIndexByNumber(cardId)
  var emptyLocation = getIndexByNumber(0)
  if ((emptyLocation.y - 1 == cardLocation.y) && (emptyLocation.x == cardLocation.x)){
      return true
  }
  else if((emptyLocation.y + 1 == cardLocation.y)  && (emptyLocation.x == cardLocation.x)){
    return true
  }
  else if ((emptyLocation.x - 1 == cardLocation.x) && (emptyLocation.y == cardLocation.y)){
    return true
  }

  else if ((emptyLocation.x - 1 == cardLocation.x) && (emptyLocation.y == cardLocation.y)){
    return true
  }
  else if ((emptyLocation.x + 1 == cardLocation.x) && (emptyLocation.y == cardLocation.y)){
    return true
  }
  else{
      return false;
  }
}

function closeGame(){
    var resultGameDiv =document.getElementById("resultGame");
    clearInterval(interval);
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var timeStr = `${minutesLabel.innerHTML}:${secondsLabel.innerHTML}`
    currentPlayer.longGameTime = timeStr
    addPlayerDetails(currentPlayer)
    resultGameDiv.innerHTML = `<h1>${currentPlayer.playerName} Win the game</h1>`
}

function startTimer(){
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    interval = setInterval(() => {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }, 1000);
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }



