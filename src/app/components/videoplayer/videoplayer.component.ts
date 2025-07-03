import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VideoService } from '../../services/video.service';
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

  videos:Video[] = [];
  player!: Player;
  @ViewChild('target', { static: false }) target!: ElementRef;

  constructor(private videoService: VideoService){}

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(response => {
      this.videos = response;
      console.log(response);
    });
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
