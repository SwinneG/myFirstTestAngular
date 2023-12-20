import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  constructor(
    private http: HttpClient,
  ) {}

  public log(message?:any) {
    if(environment.isDebug) {
      console.log(message)
    }
  }

  public getQuery(query: string) {
    const commonUrl: string = `https://api.tvmaze.com/${query}`;
    return this.http.get(commonUrl)
  }

  public getShowsList(pageNumber:number) {

    const url: string = `shows?page=${pageNumber}`;
    return this.getQuery(url).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        this.log(error);
        return of({});
      })
    )
  }

  public getShowById(showId:number){
    const url: string = `shows/${showId}`;
    return this.getQuery(url).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        this.log(error);
        return of({});
      })
    )
  }

  // public getSeasonListByShowId(showId: number){
  //   const url: string = `shows/${showId}?embed[]=seasons&embed[]=episodes`;
  //   return this.getQuery(url).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error) => {
  //       this.log(error);
  //       return of({});
  //     })
  //   )
  // }

  public getSeasonListByShowId(showId: number){
    const url: string = `shows/${showId}/seasons`;
    return this.getQuery(url).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        this.log(error);
        return of({});
      })
    )
  }

  public getEpisodeListBySeasonId(seasonId: number) {
    const url: string = `seasons/${seasonId}/episodes`;
    return this.getQuery(url).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        this.log(error);
        return of({});
      })
    )
  }

  public getCastListByShowId(showId: number){
    const url: string = `shows/${showId}/cast`;
    return this.getQuery(url).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        this.log(error);
        return of({});
      })
    )
  }

  public searchShow(term: string) {
    const url: string = `singlesearch/shows?q=${term}`;
    return this.getQuery(url).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        this.log(error);
        return of({});
      })
    )
  }

}

