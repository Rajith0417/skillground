import { Routes } from '@angular/router';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'video', pathMatch: 'full' },
  { path: 'video', component: VideoplayerComponent },
  { path: 'video/:id', component: VideoplayerComponent },
  { path: '**', redirectTo: 'video' }
];
