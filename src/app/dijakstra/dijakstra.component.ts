import { Component } from '@angular/core';
import { GridComponent, Square } from '../grid/grid.component';
import { Heap } from 'heap-js';
import { DataService } from '../data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-dijakstra',
  templateUrl: './dijakstra.component.html',
  styleUrls: ['./dijakstra.component.css']
  
})
export class DijakstraComponent {

    
constructor(private dataService: DataService) {
   // Preload videos
   this.tutorial=true;
   this.videos.forEach((videoSrc) => {
    const videoElement = document.createElement('video');
    videoElement.src = videoSrc;
    this.videoElements.push(videoElement);
  });
 }
tutorial:boolean=true;
currentPageIndex: number = 0;
    videos: string[] = [
      'assets/tutorial/1fixed.mp4',
      'assets/tutorial/2fixed.mp4',
      'assets/tutorial/3fixed.mp4',
    ];
  currentVideoSrc: string = this.videos[this.currentPageIndex];
  tutorialText: string[] =[ 'Drag start point and target',
  'Add walls by clicking the squares or clicking and draging',
  'Start the travelling by pressing one of the Algorithm\'s buttons',
  'Clear the board by clicking the Clear button'];
  
  videoElements: HTMLVideoElement[] = [];
  ngOnInit():void {
    this.tutorial=false;
  }
  handleTutorial():void{
    this.tutorial=true;
    this.currentPageIndex=0;
  }
  handle_weight():void{
   this.dataService.add_weight();
  }
  goToPrevious() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.currentVideoSrc = this.videos[this.currentPageIndex];
      }
  }
    
  goToNext() {
    if (this.currentPageIndex < this.videos.length - 1) {
      this.currentPageIndex++;
      this.currentVideoSrc = this.videos[this.currentPageIndex];
      }
  }
  playNextVideo() {
    if (this.currentPageIndex < this.videos.length - 1) {
      this.currentPageIndex++;
      this.currentVideoSrc = this.videos[this.currentPageIndex];
    }
  }
  closeJumpingScreen(){
  this.tutorial=false;
  this.currentPageIndex=0;
}
public dijakstra_walk():void{
  this.dataService.reset_board();
  this.dataService.firstDrawing=true;
  this.dataService.dijakstra_walk();
}
  public handle_Clear():void{
    this.dataService.Clear_Board();
}
}


