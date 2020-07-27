import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {


  @Input('skip') skip: number;

  pageNext = 0;
  pagePrevius = 8;

  @Output() switchPagination = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }


  childPagination(skip: number) {
    this.switchPagination.emit({data: skip});
  }

}


