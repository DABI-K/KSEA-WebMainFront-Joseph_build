import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  scrolled = false;
  interval = 6;
  showIndex = 1;
  isPaused = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 1000;
  }
  constructor() {}

  ngOnInit(): void {
    this.auto();
  }

  auto(): void {
    setInterval(() => {
      if (!this.isPaused) {
        if (this.showIndex < 5) {
          this.showIndex = this.showIndex + 1;
        } else {
          this.showIndex = 1;
        }
      }
    }, this.interval * 1000);
  }
}
