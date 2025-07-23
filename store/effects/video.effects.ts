import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { VideoService } from '../../src/app/services/video.service';
import * as VideoActions from '../actions/video.actions';

@Injectable()
export class VideoEffects {

  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.loadVideos),
      mergeMap(() =>
        this.videoService.getVideos().pipe(
          map(data => VideoActions.loadVideosSuccess({ data })),
          catchError(error => of(VideoActions.loadVideosFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private videoService: VideoService
  ) {}
}
