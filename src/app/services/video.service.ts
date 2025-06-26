import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../components/models/video.model';


@Injectable({
  providedIn: 'root' // Makes the service available application-wide
})
export class VideoService {

  constructor(private http: HttpClient) { }

  getVideos(){
    return this.http.get<Video[]>("/videos.json");
  }
}
