import { createReducer, on } from '@ngrx/store';
import { VideoState, initialState } from '../state/video.state';
import * as VideoActions from '../actions/video.actions';

export const videoReducer = createReducer(
  initialState,
  
  // Load Videos
  on(VideoActions.loadVideos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(VideoActions.loadVideosSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  })),
  
  on(VideoActions.loadVideosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Select Video
  on(VideoActions.selectVideo, (state, { videoId }) => ({
    ...state,
    selectedVideoId: videoId
  })),
  
  // Clear Selected Video
  on(VideoActions.clearSelectedVideo, (state) => ({
    ...state,
    selectedVideoId: null
  }))
); 