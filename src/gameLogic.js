var board = [
    [1,0,2],
    [3,4,5],
    [6,7,8]
]


window.onload = () => {
    while (!isGameValid()){
        console.log("The game is not valid ")
    }
}

var idsNextToEmpty = []


function createCubeBoard(id){
    var htmlCube = "<div class='col-md-4 text-center'>"  
    htmlCube += "<div class='card h-100' value='"+id+"'>"
    htmlCube += "<div class='card-body'>"
    htmlCube += "<h1>card "+id+"</h1>"
    htmlCube += "</div>"
    htmlCube += "</div>"
    htmlCube += "</div>"
    return htmlCube;
}

function createBoard(number){
    var boardDiv = document.getElementById("board");
    var boardHtml = "<div class='row justify-content-center' id='board'>"
    var max = number * number;
    for (var i = 0 ; i < number ; i++){
        var ls = []
        for (var j = 0 ; j < number ; j++){
            let id = getValidId(max -1)
            console.log(id)
            ls.push(id)
            boardHtml += createCubeBoard(id)
        }
        board.push(ls)
    }
    boardHtml += "</div>"
    console.log(board)
    boardDiv.innerHTML = boardHtml;
}

function getValidId(max){
    
    let isNumberExist = (number) => {
        for (var k = 0 ; k < number ; k++)
        {
            let arr = board[k];
            if (arr != undefined){
                for (var m = 0 ; m < number ; m++){
                    if (arr[m] == number){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    let number = Math.floor((Math.random() * max) + 0);
    while (isNumberExist(number)){
        console.log("here")
        number = Math.floor((Math.random() * max) + 0);
    }
    return number;
}




function renderNewHTMLBoard(){
    let numberOfRows = document.getElementById("numberRows").value
    createBoard(3)
    console.log(numberOfRows)
}

function isGameValid(){
    let countOpposite = 0;
    for (var k = 0 ; k < board.length ; k++)
    {
        let arr = board[k];
        if (arr != undefined){
            for (var m = 0 ; m < arr.length ; m++){
                let allBiggers = getOppositeNumbers(arr[m]);
                countOpposite += allBiggers;

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
            if (ls[i] > number)
            lsBigger.push(ls[i]);
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
        alert("finish game")
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
    board.filter((arr) => {
        arr.filter((number) => {
            if (number){

            }

        })
    })
}



