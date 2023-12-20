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
  pageNumber: number = 1;
  countPages:any = [];
  paginatedShowsList:any = [];
  selectedPaginatedShowList:any = []

  constructor(
    private showsService: ShowsService,
    private router : Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.showsService.getShowsList(this.pageNumber)
      .subscribe(response => {
        this.showsList = response;

        let showsLength:number = this.showsList.length
        let dataSize:number = 25;
        let compteur:number = 0;
        let sliceStart:number = 0
        let sliceEnd:number = 25

        for(let i = 0 ; i <= showsLength; i++){
          compteur++

          showsLength = showsLength - dataSize
          this.countPages.push(compteur)

          this.paginatedShowsList[i] = this.showsList.slice(sliceStart,sliceEnd)
          sliceStart = sliceStart + 25
          sliceEnd = sliceEnd + 25

          //au clic sur la page 10
          // if(Math.sign(showsLength) == -1 ){
          //   console.log('on relance le subscribe page 2,...');
          // }
          
        }

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
        })
    });

  }

  goToShowDetail(show: any) {
    let title:string = show.name.replaceAll(' ','-').toLowerCase()
    this.router.navigate([this.router.url, show.id, title])
  }

  getPaginatedDatas(index:number){
    this.searchForm.reset()
    this.selectedPaginatedShowList = this.paginatedShowsList[index]
    
  }

}

