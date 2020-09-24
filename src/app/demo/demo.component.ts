import { Component, OnInit } from '@angular/core';
import { SwiperConfig } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  selectedPerson = 0;
  selectedTieColor = { 0: 0, 1: 0, 2: 0 };
  selectedSession = { 0: 0, 1: 0, 2: 0 };

  constructor() {}

  ngOnInit(): void {}
}
