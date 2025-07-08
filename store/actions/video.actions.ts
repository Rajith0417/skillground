import { createAction, props } from '@ngrx/store';
import { VideoResponse } from '../../src/app/components/models/videoResponse.model';

// Load Videos
export const loadVideos = createAction('[Video] Load Videos');

export const loadVideosSuccess = createAction(
  '[Video] Load Videos Success',
  props<{ data: VideoResponse }>()
);

export const loadVideosFailure = createAction(
  '[Video] Load Videos Failure',
  props<{ error: any }>()
);

// Select Video
export const selectVideo = createAction(
  '[Video] Select Video',
  props<{ videoId: string }>()
);

// Clear Selected Video
export const clearSelectedVideo = createAction(
  '[Video] Clear Selected Video'); 