import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VideoState } from '../state/video.state';

export const selectVideoState = createFeatureSelector<VideoState>('video');

export const selectVideoData = createSelector(
  selectVideoState,
  (state) => state.data
);

export const selectVideoLoading = createSelector(
  selectVideoState,
  (state) => state.loading
);

export const selectVideoError = createSelector(
  selectVideoState,
  (state) => state.error
);

export const selectSelectedVideoId = createSelector(
  selectVideoState,
  (state) => state.selectedVideoId
);

export const selectAllVideos = createSelector(
  selectVideoData,
  (data) => {
    if (!data) return [];
    return data.categories.flatMap(category => category.videos);
  }
);

export const selectSelectedVideo = createSelector(
  selectAllVideos,
  selectSelectedVideoId,
  (videos, selectedId) => {
    if (!selectedId) return null;
    return videos.find(video => video.id === selectedId) || null;
  }
);

export const selectVideoCategories = createSelector(
  selectVideoData,
  (data) => data?.categories || []
); 