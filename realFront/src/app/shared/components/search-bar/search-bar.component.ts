import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  

  enteredSearchValue:string = "";

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string> ();

  constructor( ) {};

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);
  }


}
