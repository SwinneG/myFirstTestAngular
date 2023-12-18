import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../shows.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit{
  searchForm :any;
  showsList:any = [];
  searchList:any;

  constructor(
    private showsService: ShowsService,
    private router : Router,
    private formBuilder: FormBuilder
  ) {
   
    
  }

  ngOnInit(): void {
    this.showsService.getShowsList()
      .subscribe(response => {
        this.showsList = response;
    })

    this.searchForm = this.formBuilder.group({
      search: '',
    });

    this.searchForm.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(() => {
       this.showsService.searchShow(this.searchForm.value.search)
        .subscribe(response => {
          this.searchList = response;
          // console.log(this.searchList)
        })
    });

    
  }

  goToShowDetail(show: any) {
    let title:string = show.name.replaceAll(' ','-').toLowerCase()
    this.router.navigate([this.router.url, show.id, title])
  }

  
}

