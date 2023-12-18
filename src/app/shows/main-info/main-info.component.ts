import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnInit{
  @Input() showDetail:any; 

  ngOnInit(){
    
  }
}
