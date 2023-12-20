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
  searchForm:any;
  showsList:any = [];
  searchList:any;
  pageNumber:number = 1;
  countPages:any = [];
  paginatedShowsList:any = [];
  selectedPaginatedShowList:any = []
  compteur:number = 0;

  constructor(
    private showsService: ShowsService,
    private router : Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.subscribeShowsList(this.pageNumber);

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

  subscribeShowsList(nb:number) {
    //vide le tableau pour mettre les numeros de pages precendents/suivants
    this.countPages = []

    this.showsService.getShowsList(nb)
    .subscribe(response => {
      this.showsList = response;

      let showsLength:number = this.showsList.length
      let dataSize:number = 25;
      let sliceStart:number = 0
      let sliceEnd:number = 25
      
      for(let i = 0 ; i <= showsLength; i++){
        this.compteur++

        showsLength = showsLength - dataSize
        this.countPages.push(this.compteur)

        this.paginatedShowsList[i] = this.showsList.slice(sliceStart,sliceEnd)
        sliceStart = sliceStart + 25
        sliceEnd = sliceEnd + 25
      }
    })
  }

  goToShowDetail(show: any) {
    let title:string = show.name.replaceAll(' ','-').toLowerCase()
    this.router.navigate([this.router.url, show.id, title])
  }

  getPaginatedDatas($event: Event, index:number){
    this.searchForm.reset()
    this.selectedPaginatedShowList = this.paginatedShowsList[index]

    let target = $event.target as HTMLElement
    if(target.classList.contains('lastEl')){
      this.pageNumber++;
      this.subscribeShowsList(this.pageNumber)
    }
    
  }

}

