import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import videojs from 'video.js'
// import type Player from 'video.js/dist/types/player';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { VideoStoreService } from './services/video-store.service';
import { VideoService } from './services/video.service';
import * as VideoActions from '../../store/actions/video.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
})
export class AppComponent implements OnInit {
  title = 'skillGround';
  // @ViewChild('target', { static: false }) target!: ElementRef;

  // player!: Player;

  constructor(
    private videoStoreService: VideoStoreService,
    private videoService: VideoService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Manually load videos since effects are disabled
    this.store.dispatch(VideoActions.loadVideos());

    // Load videos directly using the service
    this.videoService.getVideos().subscribe({
      next: (data) => {
        this.store.dispatch(VideoActions.loadVideosSuccess({ data }));
      },
      error: (error) => {
        this.store.dispatch(VideoActions.loadVideosFailure({ error }));
      }
    });
  }

  // ngAfterViewInit(): void {
  //   this.player = videojs(this.target.nativeElement);
  // }

  // ngOnDestroy(): void {
  //   if (this.player) {
  //     this.player.dispose();
  //   }
  // }
}
