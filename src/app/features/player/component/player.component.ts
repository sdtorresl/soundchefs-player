import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  streamUrl = 'https://projectdm.innovaciones.co:8000/main';
  apiUrl = 'https://projectdm.innovaciones.co/api/'; // Update with actual API endpoint
  defaultArtwork = 'assets/default-artwork.png';

  songTitle: string | null = null;
  songArtist: string | null = null;
  artworkUrl: string | null = null;
  isPlaying = false;
  isMuted = false;
  elapsedTime = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchMetadata();
    setInterval(() => this.fetchMetadata(), 15000); // Poll metadata every 15 seconds
  }

  playPauseAudio(audioPlayer: HTMLAudioElement): void {
    if (this.isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  toggleMute(audioPlayer: HTMLAudioElement): void {
    this.isMuted = !this.isMuted;
    audioPlayer.muted = this.isMuted;
  }

  updateElapsedTime(audioPlayer: HTMLAudioElement): void {
    this.elapsedTime = audioPlayer.currentTime;
  }

  fetchMetadata(): void {
    this.http.get<any>(`${this.apiUrl}nowplaying`) // Adjust endpoint as per LibreTime's API
      .subscribe(data => {
        const currentTrack = data.current || {};
        this.songTitle = currentTrack.title || null;
        this.songArtist = currentTrack.artist || null;
        this.artworkUrl = currentTrack.artwork || this.defaultArtwork;
      }, error => {
        console.error('Error fetching metadata:', error);
        this.songTitle = 'Unknown Title';
        this.songArtist = 'Unknown Artist';
        this.artworkUrl = this.defaultArtwork;
      });
  }

  loadMetadata(audioPlayer: HTMLAudioElement): void {
    this.elapsedTime = audioPlayer.currentTime;
  }


}
