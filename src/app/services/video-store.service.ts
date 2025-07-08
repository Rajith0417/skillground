import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Video } from '../components/models/video.model';
import { VideoResponse } from '../components/models/videoResponse.model';
import * as VideoActions from '../../../store/actions/video.actions';
import * as VideoSelectors from '../../../store/selectors/video.selectors';

@Injectable({
  providedIn: 'root'
})
export class VideoStoreService {

  constructor(private store: Store) {}

  // Actions
  loadVideos(): void {
    this.store.dispatch(VideoActions.loadVideos());
  }

  selectVideo(videoId: string): void {
    this.store.dispatch(VideoActions.selectVideo({ videoId }));
  }

  clearSelectedVideo(): void {
    this.store.dispatch(VideoActions.clearSelectedVideo());
  }

  // Selectors
  getVideoData$(): Observable<VideoResponse | null> {
    return this.store.select(VideoSelectors.selectVideoData);
  }

  getVideoLoading$(): Observable<boolean> {
    return this.store.select(VideoSelectors.selectVideoLoading);
  }

  getVideoError$(): Observable<any> {
    return this.store.select(VideoSelectors.selectVideoError);
  }

  getSelectedVideoId$(): Observable<string | null> {
    return this.store.select(VideoSelectors.selectSelectedVideoId);
  }

  getAllVideos$(): Observable<Video[]> {
    return this.store.select(VideoSelectors.selectAllVideos);
  }

  getSelectedVideo$(): Observable<Video | null> {
    return this.store.select(VideoSelectors.selectSelectedVideo);
  }

  getVideoCategories$(): Observable<{ name: string; videos: Video[] }[]> {
    return this.store.select(VideoSelectors.selectVideoCategories);
  }
} 