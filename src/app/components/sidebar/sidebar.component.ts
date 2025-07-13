import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Video } from '../models/video.model';
import { CommonModule } from '@angular/common';
import { VideoResponse } from '../models/videoResponse.model';
import { VideoStoreService } from '../../services/video-store.service';
import { Observable, combineLatest, startWith, map, BehaviorSubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatPaginatorModule, MatIconModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  videos$!: Observable<Video[]>;
  filteredVideos$!: Observable<Video[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  searchTerm: string = '';
  private searchTermSubject = new BehaviorSubject<string>('');
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

    // Filter videos based on search term
    this.filteredVideos$ = combineLatest([
      this.videos$,
      this.searchTermSubject.pipe(startWith(''))
    ]).pipe(
      map(([videos, searchTerm]) => {
        if (!searchTerm) return videos;
        const lower = searchTerm.toLowerCase();
        return videos.filter(v => v.title.toLowerCase().includes(lower));
      })
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchTermSubject.next('');
  }

  selectVideo(videoId: string): void {
    this.videoStoreService.selectVideo(videoId);
  }

  // Update search term on input change
  onSearchTermChange(term: string) {
    this.searchTermSubject.next(term);
  }

}
