import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../shows.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss']
})
export class NavTabsComponent implements OnInit{

  show: any;
  id:string=""
  title:string=""
  titleForUrl:string=""

  constructor(
    private ShowsService: ShowsService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    const showId: any = this.route.snapshot.paramMap.get('id');
    this.id = showId

    this.ShowsService.getShowById(showId)
    .subscribe(response => {
      // console.log(response)
      this.show = response
      this.title = this.show.name;
      this.titleForUrl = this.title.replaceAll(' ','-').toLowerCase()
    })
  }
  
}
