
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DijakstraComponent } from '../dijakstra/dijakstra.component';

export   class Square {
  
   row:number;
   column:number;
   color:string;
   distance:number;
   isVisited:Boolean;
   isEntry:Boolean;
   isDestintion:Boolean;
   father:Square|null;
   isWall:boolean;
   weight:number;
  constructor(color: string, distance: number, row: number, col: number,entry:[number,number],dest:[number,number],father:Square|null) {
    this.color = color;
    this.distance = distance;
    this.row = row;
    this.column = col;
    this.isVisited=false;
    this.isEntry=row==entry[0]&&col==entry[1];
    this.isDestintion=row==dest[0]&&col==dest[1];
    this.father=null;
    this.isWall=false;
    this.weight=1;
  }
  
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  //variabes
  constructor(private dataService: DataService) { }
   squares=this.dataService.squares;
   isdragging:boolean=false;
   isCar:boolean=false;
   isTarget:boolean=false;
   
  ngOnInit():void {
    this.fillarray();
    
  }
  getBackgroundImage(square: any): string {
    if (square.isDestintion) {
      return `url('assets/image/target.webp')`;
    } else if (square.isEntry) {
      return `url('assets/image/car.png')`;
    } else {
      return '';
    }
  }
    // Create the double array of squares and assign default properties
     fillarray():void{
    for (let row = 0; row < 23; row++) {
      const squareRow: Square[] = [];
      for (let col = 0; col < 57; col++) {
        const newSquare = new Square('white', Number.MAX_VALUE, row, col,this.dataService.StartingPos,this.dataService.EndPos,null);
        this.dataService.isStartEndPos(newSquare);
        squareRow.push(newSquare);
      }
      this.dataService.squares.push(squareRow);
    }
  }

  //functions
  toWall( s:Square): void {
    if(!s.isEntry&&!s.isDestintion){
      if(s.color=='white'){
        s.color='black';
        s.isWall=true;
      }
      else{
        s.color='white';
        s.isWall=false;
      }
    }
  }
  get_Board_with_weights():boolean{
    return this.dataService.Board_with_weights;
  }
  weighted_square(square:Square):boolean{
    if(square.isEntry||square.isDestintion||square.isWall)
      return false;
      return true;
  }
  mouse_Hover(square: Square) {
  
    if (this.isdragging&&!square.isEntry&&!square.isDestintion) {
      if(!this.isCar&&!this.isTarget){
        square.color = 'black';
        square.isWall=true;
      }
      if(this.isCar){
        this.dataService.entrySquare.isEntry=false;
        this.dataService.entrySquare.distance=Number.MAX_VALUE;
        this.dataService.entrySquare=square;
        square.isEntry=true;
        if(!this.dataService.firstDrawing){
          this.dataService.reset_board();
          this.dataService.dijakstra_walk();
        }
      }
      if(this.isTarget){
        this.dataService.destSquare.isDestintion=false;
        this.dataService.entrySquare.distance=Number.MAX_VALUE;
        this.dataService.destSquare=square;
        square.isDestintion=true;
        if(!this.dataService.firstDrawing){
          this.dataService.reset_board();
          this.dataService.dijakstra_walk();
        }
      }
    }
}
  mouse_Down(sqaure:Square){
    this.isdragging=true;
    if(sqaure.isEntry){
      this.isCar=true;
    }
    if(sqaure.isDestintion){
      this.isTarget=true;
    }
  }
  mouse_Up(square:Square){
    this.isdragging=false;
    this.isCar=false;
    this.isTarget=false;
  }
}



  
