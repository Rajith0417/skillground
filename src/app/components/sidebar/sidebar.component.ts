import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { VideoService } from '../../services/video.service';
import { Video } from '../models/video.model';
import { CommonModule } from '@angular/common';
import { VideoResponse } from '../models/videoResponse.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatPaginatorModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  videos:Video[] = [];

  constructor(private videoService: VideoService){

  }

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(response => {
      // this.videos = response.categories.videos
      // console.log(response.categories[0].videos);
      this.videos = response.categories?.[0]?.videos ?? [];
      console.log(this.videos);
    });
  }

}
