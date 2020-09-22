

boardResult = []


window.onload = () => {
    if (localStorage.getItem("boardResult") == undefined){
        localStorage.setItem("boardResult",JSON.stringify([]))
    }
    else{
        boardResult = JSON.parse(localStorage.getItem("boardResult"))
    }
    createResultTable();
}




function createResultTable(){
       var table = document.getElementById("resultTable");
       
       var columns = ["grade","playerName" , "longGameTime" , "boardSize", "dateStart"]
       var htmlTable = "<table>"


       // columns
       htmlTable += "<tr>"
       columns.forEach((columnName) => {
        htmlTable += "<th>"+columnName+"</th>"
       })
       htmlTable += "</tr>"

       // rows

       boardResult.filter((result) => {
            htmlTable += "<tr>"
            htmlTable += "<td>"+result.grade+"</td>"
            htmlTable += "<td>"+result.playerName+"</td>"
            htmlTable += "<td>"+result.longGameTime+"</td>"
            htmlTable += "<td>"+result.boardSize+"</td>"
            htmlTable += "<td>"+result.dateStart+"</td>"
            htmlTable += "</tr>"
       })
       

       htmlTable += "</table>"
       table.innerHTML = htmlTable;
}