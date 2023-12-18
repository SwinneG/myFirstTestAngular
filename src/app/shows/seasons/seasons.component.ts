import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../shows.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit{

  seasonsList:any;
  showTitle:any;

  constructor(
    private showsService :ShowsService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        // console.log(params);
        const paramsResults = params;
        this.showTitle = paramsResults['title']
      }
    );

    const showId: any = this.route.snapshot.paramMap.get('id');

    
    this.showsService.getSeasonListByShowId(showId)
      .subscribe(response => {
        this.seasonsList = response; 
      })

  }

}
