import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import videojs from 'video.js'
// import type Player from 'video.js/dist/types/player';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { VideoplayerComponent } from "./components/videoplayer/videoplayer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, VideoplayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'skillGround';
  // @ViewChild('target', { static: false }) target!: ElementRef;

  // player!: Player;

  // ngAfterViewInit(): void {
  //   this.player = videojs(this.target.nativeElement);
  // }

  // ngOnDestroy(): void {
  //   if (this.player) {
  //     this.player.dispose();
  //   }
  // }
}
