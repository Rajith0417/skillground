import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { VideoService } from '../../services/video.service';
import { Video } from '../models/video.model';
import { CommonModule } from '@angular/common';
import { VideoResponse } from '../models/videoResponse.model';
import { VideoStoreService } from '../../services/video-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatPaginatorModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  videos$!: Observable<Video[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  selectedVideoId$!: Observable<string | null>;

  constructor(
    private videoService: VideoService,
    private videoStoreService: VideoStoreService
  ){}

  ngOnInit(): void {
    // Initialize observables after constructor
    this.videos$ = this.videoStoreService.getAllVideos$();
    this.loading$ = this.videoStoreService.getVideoLoading$();
    this.error$ = this.videoStoreService.getVideoError$();
    this.selectedVideoId$ = this.videoStoreService.getSelectedVideoId$();
  }

  selectVideo(videoId: string): void {
    this.videoStoreService.selectVideo(videoId);
  }

}
