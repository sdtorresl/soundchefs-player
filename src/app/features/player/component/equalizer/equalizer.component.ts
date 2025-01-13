import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-equalizer',
  standalone: true,
  imports: [
    NgFor,
    NgClass
  ],
  templateUrl: './equalizer.component.html',
  styleUrl: './equalizer.component.scss'
})
export class EqualizerComponent implements OnInit {
  @Input() playing = false; // Input to control the playing state

  bars: { squares: any[] }[] = [];

  defaultSquares: number[] = [2, 6, 6, 2, 4, 3, 3, 8, 6, 1];


  ngOnInit() {
    this.initializeBars();

    setInterval(() => {
      if (this.playing) {
        this.updateBars();
      } else {
        this.drawFixedBars();
      }
    }, 100);
  }

  drawFixedBars() {
    this.bars.forEach((bar, index) => {
      // Draw bars with a fixed number of squares
      bar.squares = Array.from({ length: this.defaultSquares[index] });
    });
  }

  initializeBars() {
    console.log('Updating');
    this.bars = Array.from({ length: 10 }, () => ({ squares: [] }));
    this.updateBars();
  }

  updateBars() {
    this.bars.forEach(bar => {
      bar.squares = [];
      const sqrCount = Math.floor(Math.random() * 8) + 1;
      bar.squares = Array.from({ length: sqrCount });
    });
  }
}
