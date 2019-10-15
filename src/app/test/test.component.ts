import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  minDate = Date.now();
  maxDate = Date.now() + 1000 * 60 * 60 * 24 * 15;

  constructor() {}

  ngOnInit() {}
}
