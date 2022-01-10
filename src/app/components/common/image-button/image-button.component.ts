import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.scss']
})
export class ImageButtonComponent implements OnInit {

  @Input() route: string;
  @Input() text: string;
  @Input() image: string;

  constructor() { }

  ngOnInit(): void {
  }

}
