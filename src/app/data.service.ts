import { Injectable } from '@angular/core';
import { Square } from './grid/grid.component';
import { DijakstraComponent } from './dijakstra/dijakstra.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public squares: Square[][] = [];
  EndPos:[number,number]=[11,40];
  StartingPos:[number,number]=[11,15];
  public entrySquare:Square=new Square('white',0,0,0,[0,0],[0,0],null);
  public destSquare:Square=new Square('white',0,0,0,[0,0],[0,0],null);;
  pathArray:Square[]=[];//Array for the final path 
  Un_visited_Suquares_Array:Square[]=[];
  visited_In_Order_Array:Square[]=[];
  vistedNumber:number=0;
  firstDrawing:boolean=true;
  Board_with_weights:boolean=false;
  Clear_Board():void{// reset the board tottaly
  this.pathArray=[];
  this.Un_visited_Suquares_Array=[];
  this.visited_In_Order_Array=[];
  this.vistedNumber=0;
  this.firstDrawing=true;
    for(let i=0;i<23;i++){
      for(let j=0;j<57;j++){
        this.squares[i][j].color='white';
        this.squares[i][j].father=null;
        this.squares[i][j].isWall=false;
        this.squares[i][j].distance=Number.MAX_VALUE;
        this.squares[i][j].isVisited=false;
        this.squares[i][j].weight=1;
        this.isStartEndPos(this.squares[i][j]); 
      }
    }
    this.Board_with_weights=false;
  }
  isStartEndPos(square:Square):void{
    if(square.isEntry){
      this.entrySquare=square;
      square.distance=0;
    }
    if(square.isDestintion){
      this.destSquare=square;
    }
      
  }
  reset_board():void{//clear the board keep walls
    this.pathArray=[];
    this.Un_visited_Suquares_Array=[];
    this.visited_In_Order_Array=[];
    this.vistedNumber=0;
    for(let i=0;i<23;i++){
      for(let j=0;j<57;j++){
        if(!this.squares[i][j].isWall){
            this.squares[i][j].color='white';
            this.squares[i][j].father=null;
            this.squares[i][j].distance=Number.MAX_VALUE;
            this.squares[i][j].isVisited=false;
            this.isStartEndPos(this.squares[i][j]); 
        }
      }
      
    }
  }

   fillHeap():void{
    for(let i=0;i<23;i++){
      for(let j=0;j<57;j++){
        this.Un_visited_Suquares_Array.push(this.squares[i][j]);
      }
    }
  }
  add_weight():void{
    if(!this.Board_with_weights){
      for(let i=0;i<23;i++){
        for(let j=0;j<57;j++){
          if(!this.squares[i][j].isWall)
            this.squares[i][j].weight=Math.floor(Math.random() * 100) + 1;
        }
      }
    }
    else{
      for(let i=0;i<23;i++){
       for(let j=0;j<57;j++){
          this.squares[i][j].weight=1;
          }
        }
      }
       this.Board_with_weights=!this.Board_with_weights; 
       console.log(this.Board_with_weights);
      }

   dijakstra_walk():void{
    this.fillHeap();
    while(this.Un_visited_Suquares_Array.length >0 ){
      this.Un_visited_Suquares_Array.sort((a, b) => a.distance - b.distance);
      const tempSquare: Square = this.Un_visited_Suquares_Array[0];
      if(!tempSquare.isWall&&tempSquare.distance<Number.MAX_VALUE){
        this.UpdateNeighbourS(tempSquare);
      }
      this.Un_visited_Suquares_Array.splice(0, 1); 
    }
    if(this.firstDrawing){
      this.drawVisted();
      this.firstDrawing=false;
    }
   else{
    this.drawVisitedDynamic();
   }
  }
  
  UpdateNeighbourS(square:Square|undefined):void{
    if(square instanceof Square){
      const row:number=square.row;
      const col:number=square.column;
      this.updateVisitedSquare(square);
      if(row>0 &&!this.squares[row-1][col].isVisited){
          this.updateNeighbour(this.squares[row-1][col],square);
        }
      if(col>0 &&!this.squares[row][col-1].isVisited){
          this.updateNeighbour(this.squares[row][col-1],square);
        }
      if(row<22 &&!this.squares[row+1][col].isVisited){
          this.updateNeighbour(this.squares[row+1][col],square);
        }
      if(col<56 &&!this.squares[row][col+1].isVisited){
          this.updateNeighbour(this.squares[row][col+1],square);
        }
    }
  }
  updateVisitedSquare(square:Square|undefined):void{
    if(square instanceof Square){
      this.vistedNumber++;
      square.isVisited=true;
      this.visited_In_Order_Array.push(square);
      if(square.isDestintion){
        this.emptyArray();
        this.fillPathArray(square);
      }
      
    }
  }
  drawVisted():void{
    for(let i=1;i<this.visited_In_Order_Array.length+1;i++){
      setTimeout(() => {
       this.visited_In_Order_Array[i-1].color="rgb(167, 139, 167)";
       if(i==this.visited_In_Order_Array.length){
        this.drawPath();
       }
      }, 7*i); 
    }
   
  }
  drawVisitedDynamic():void{
    for(let i=1;i<this.visited_In_Order_Array.length+1;i++){
       this.visited_In_Order_Array[i-1].color= "rgb(167, 139, 167)";
       if(i==this.visited_In_Order_Array.length){
        this.drawPathDynamic();
       } 
    }
  }
  fillPathArray(square:Square):void{
    let tempSquare=square;
    while(tempSquare.father!=null){
      this.pathArray.push(tempSquare);
      tempSquare=tempSquare.father;
    }
    
  }
  emptyArray():void{
    this.Un_visited_Suquares_Array=[];
  }
  updateNeighbour(Neighbour:Square|undefined,origin:Square|undefined):void{
    if(Neighbour instanceof Square&&origin instanceof Square){
      const neighbourDistance=Neighbour.distance;
      const originDistance=origin.distance;
      if(neighbourDistance>originDistance+Neighbour.weight){//if shorter path keep it
        Neighbour.distance=originDistance+Neighbour.weight;
        Neighbour.father=origin;
      }
    }
  }
  
  drawPath():void{
     for(let i=0;i<this.pathArray.length;i++){
      setTimeout(() => {
        this.pathArray[this.pathArray.length-i-1].color="rgb(81, 80, 78)";
      }, 7*(i)); 
    }
      
    }
  drawPathDynamic():void{
    for(let i=0;i<this.pathArray.length;i++){
        this.pathArray[this.pathArray.length-i-1].color="rgb(81, 80, 78)";
      }
    }

  constructor() { }
}







