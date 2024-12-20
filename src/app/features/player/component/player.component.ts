import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImgFallbackDirective } from '../../../shared/directives/img-fallback.directive';
import { DecodeHtmlPipe } from '../../../shared/pipes/decode-html.pipe';
import { ElapsedTimePipe } from '../../../shared/pipes/elapsed-time.pipe';
import { FetchMetadataUseCase } from '../usecases/get-metadata-usecase';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    ElapsedTimePipe,
    DecodeHtmlPipe,
    ImgFallbackDirective,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  streamUrl = 'https://projectdm.innovaciones.co:8000/main';

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  songTitle = 'Loading...';
  songArtist = '';
  artworkUrl = '';
  elapsedTime = 0;
  isPlaying = false;
  isMuted = false;
  volume: number = 0.5; // Default volume at 50%

  constructor(private fetchMetadataUseCase: FetchMetadataUseCase) { }

  ngOnInit() {
    this.loadMetadata();
    setInterval(() => this.loadMetadata(), 15000); // Poll every 15 seconds
  }

  ngAfterViewInit() {
    // Set default volume when the audio element is initialized
    const audio = this.audioPlayer.nativeElement;
    audio.volume = this.volume;
  }

  playPauseAudio(): void {
    const audio = this.audioPlayer.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  toggleMute(): void {
    const audio = this.audioPlayer.nativeElement;
    this.isMuted = !this.isMuted;
    audio.muted = this.isMuted;
  }

  updateElapsedTime(): void {
    const audio = this.audioPlayer.nativeElement;
    this.elapsedTime = audio.currentTime;
  }

  changeVolume(event: Event): void {
    const audio = this.audioPlayer.nativeElement;
    const input = event.target as HTMLInputElement;
    this.volume = parseFloat(input.value);
    audio.volume = this.volume;
  }

  private loadMetadata(): void {
    this.fetchMetadataUseCase.execute().subscribe(
      (metadata) => {
        this.songTitle = metadata.title;
        this.songArtist = metadata.artist;
        this.artworkUrl = metadata.artwork;

        // const fac = new FastAverageColor();
        // const container = document.querySelector(appImgFallback'#cover');
        // if (container != null) {
        //   const img = container.querySelector('img');
        //   //img!.crossOrigin = 'anonymous';
        //   fac.getColorAsync(img)
        //     .then(color => {
        //       console.log(color)
        //       // container.style.backgroundColor = color.rgba;
        //       // container.style.color = color.isDark ? '#fff' : '#000';
        //     })
        //     .catch(e => {
        //       console.log(e);
        //     });
        // }

      },
      (error) => {
        console.error('Failed to load metadata:', error);
        this.songTitle = 'Error loading metadata';
        this.songArtist = '';
        this.artworkUrl = 'assets/default-artwork.png';
      }
    );
  }

}
