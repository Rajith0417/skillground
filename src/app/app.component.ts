import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import videojs from 'video.js'
import type Player from 'video.js/dist/types/player';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'skillGround';
  @ViewChild('target', { static: true }) target!: ElementRef;

  player!: Player;

  ngAfterViewInit(): void {
    this.player = videojs(this.target.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
