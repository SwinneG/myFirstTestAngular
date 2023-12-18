import { Component, Input, OnInit } from '@angular/core';
import { ShowsService } from '../shows.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {

  seasons:any;
  seasonArray:any;
  episodes:any;
  showTitle:any;

  constructor(
    private showsService :ShowsService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(){

    this.route.queryParams
      .subscribe(params => {
        // console.log(params);
        const paramsResults = params;
        this.showTitle = paramsResults['title']
      }
    );

    const showId: any = this.route.snapshot.paramMap.get('id');  
   
    if(showId) {

      this.showsService.getSeasonListByShowId(showId)
        .subscribe(response => {
          this.seasons = response;
          this.seasons.reverse()
          // console.log(this.seasons)

          this.seasonArray = this.seasons.map((item:any) => {
            return item.id;
          });
          // console.log(this.seasonArray)

          this.seasonArray.map((el:number, index:number) => {
            // console.log(el)
            // console.log(index)
            this.showsService.getEpisodeListBySeasonId(el)
            .subscribe(response => {
                this.episodes = response;
                // console.log(this.episodes)
                this.seasons[index]["episodes"] = this.episodes.reverse()
              })
          })
         
      });

    }
  }
}
