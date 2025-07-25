import {
  Component,
  ElementRef,
  Input,
  input,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Video } from '../models/video.model';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import { VideoStoreService } from '../../services/video-store.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import log from 'video.js/dist/types/utils/log';

@Component({
  selector: 'app-videoplayer',
  imports: [CommonModule],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss',
  standalone: true,
})
export class VideoplayerComponent implements OnInit, OnDestroy {
  player!: Player;
  @ViewChild('target', { static: false }) target!: ElementRef<HTMLVideoElement>;
  private routeSub!: Subscription;
  selectedVideo$!: Observable<Video | null>;

  constructor(
    private videoStoreService: VideoStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route params and select video if id is present
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.videoStoreService.clearSelectedVideo();
        this.videoStoreService.selectVideo(id);
        this.selectedVideo$ = this.videoStoreService.getSelectedVideo$();
        // this.selectedVideo$ = this.videoStoreService.getSelectedVideo$();
        this.selectedVideo$.subscribe((video) => {
          if (video && this.target?.nativeElement) {
            const videoEl = this.target.nativeElement;

            // pause if playing
            videoEl.pause();

            // reload video with new sources
            videoEl.load();

            // play automatically
            // videoEl.play();
          }
        });
      } else {
        this.videoStoreService.clearSelectedVideo();
      }
    });
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
