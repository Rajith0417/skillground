import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Video } from '../components/models/video.model';
import { VideoResponse } from '../components/models/videoResponse.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root' // Makes the service available application-wide
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getVideos():Observable<VideoResponse>{
    return this.http.get<VideoResponse>("/videos.json");
  }
}
