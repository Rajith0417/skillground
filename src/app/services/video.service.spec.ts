import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { VideoService } from './video.service';
import { Video } from '../components/models/video.model';
import component from 'video.js/dist/types/component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VideoplayerComponent } from '../components/videoplayer/videoplayer.component';
import { of } from 'rxjs';

describe('VideoService', () => {

  let component: VideoplayerComponent;
  let fixture: ComponentFixture<VideoplayerComponent>;
  let mockVideoService: jasmine.SpyObj<VideoService>;

  const mockVideos: Video[] = [
    { id: 1, title: 'Sample 1', description: 'desc 1', url: 'https://example.com/video1.mp4' },
    { id: 2, title: 'Sample 2', description: 'desc 2', url: 'https://example.com/video2.mp4' }
  ];

  beforeEach(() => {

    const spy = jasmine.createSpyObj('VideoService', ['getVideos']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: VideoService, useValue: spy }],
      declarations: [VideoplayerComponent],
    }).compileComponents();

    mockVideoService = TestBed.inject(VideoService) as jasmine.SpyObj<VideoService>;
    mockVideoService.getVideos.and.returnValue(of(mockVideos));

    fixture = TestBed.createComponent(VideoplayerComponent);
    component = fixture.componentInstance;

  });

  it('should be created', () => {
    expect(mockVideoService).toBeTruthy();
  });

  it('should fetch and assign videos on init', fakeAsync(() => {
    component.ngOnInit();
    tick(); // simulate async
    expect(mockVideoService.getVideos).toHaveBeenCalled();
    expect(component.videos).toEqual(mockVideos);
  }));
});
