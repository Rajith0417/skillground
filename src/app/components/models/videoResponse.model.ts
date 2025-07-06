import { Video } from "./video.model";

export interface VideoResponse {
  categories: {
    name: string;
    videos: Video[];
  }[]
}
