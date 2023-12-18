import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../shows.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss']
})
export class CastComponent implements OnInit{

  showCast: any;
  showTitle:any;

  constructor(
    private showsService : ShowsService,
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

    const showId:any = this.route.snapshot.paramMap.get('id');

    this.showsService.getCastListByShowId(showId)
      .subscribe(response => {
          this.showCast = response
          // console.log(this.showCast)
      })
  }
}
