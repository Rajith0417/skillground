import { Component, ElementRef, Input, input, OnInit, ViewChild } from '@angular/core';
import { Video } from '../models/video.model';
import videojs from 'video.js'
import type Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent implements OnInit{

  player!: Player;
  @Input() video: Video | undefined;
  @ViewChild('target', { static: false }) target!: ElementRef;

  constructor(){}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.player = videojs(this.target.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
