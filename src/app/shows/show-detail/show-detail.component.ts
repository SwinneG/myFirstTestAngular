import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../shows.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent implements OnInit{

  showDetail:any = {};
 
  constructor(
    private showsService :ShowsService,
    private route: ActivatedRoute,
  ){}
  
  ngOnInit(): void {

    const showId:any = this.route.snapshot.paramMap.get('id');  

    if(showId) {

      this.showsService.getShowById(showId)
        .subscribe(response => {
          this.showDetail = response;
      });

    }
  }
  
}
