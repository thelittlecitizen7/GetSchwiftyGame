class BoardDataModel {
    constructor(grade,playerName , longGameTime , boardSize, dateStart){
       this.grade = grade;
       this.playerName = playerName;
       this.longGameTime = longGameTime;
       this.boardSize = boardSize;
       this.dateStart = dateStart;
    }

    static fromJson(dataStr){
        return JSON.parse(dataStr);
    }
}