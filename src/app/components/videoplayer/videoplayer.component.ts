import { Component, ElementRef, Input, input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Video } from '../models/video.model';
import videojs from 'video.js'
import type Player from 'video.js/dist/types/player';
import { VideoStoreService } from '../../services/video-store.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent implements OnInit, OnDestroy{

  player!: Player;
  @ViewChild('target', { static: false }) target!: ElementRef;
  
  selectedVideo$!: Observable<Video | null>;

  constructor(private videoStoreService: VideoStoreService){}

  ngOnInit(): void {
    this.selectedVideo$ = this.videoStoreService.getSelectedVideo$();
  }

  ngAfterViewInit(): void {
    // Only initialize videojs if the target element exists
    if (this.target && this.target.nativeElement) {
      try {
        this.player = videojs(this.target.nativeElement);
      } catch (error) {
        console.error('Error initializing VideoJS player:', error);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
