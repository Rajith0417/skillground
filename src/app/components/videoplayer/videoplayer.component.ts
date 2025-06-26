import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Video } from '../models/video.model';

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent implements OnInit{

  videos:Video[] = [];

  constructor(private videoService: VideoService){}

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(response => {
      this.videos = response;
      console.log(response);
    });
  }
}
