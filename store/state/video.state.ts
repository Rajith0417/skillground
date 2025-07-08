import { VideoResponse } from '../../src/app/components/models/videoResponse.model';

export interface VideoState {
  data: VideoResponse | null;
  loading: boolean;
  error: any;
  selectedVideoId: string | null;
}

export const initialState: VideoState = {
  data: null,
  loading: false,
  error: null,
  selectedVideoId: null
}; 