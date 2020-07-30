import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Option from '../models/option';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output()
  filtered = new EventEmitter<number>();
  options: Option[] = [
    new Option(1, 'Genre'),
    new Option(2, 'Rating'),
    new Option(3, 'Reviews'),
    new Option(4, 'Composer')
  ];
  constructor() { }

  Filter(id: number): void{
    this.filtered.emit(id);
  }
  ngOnInit(): void {
  }

}
