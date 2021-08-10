import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randomIntFromInterval } from './mathHelper';

const API_URL:string = "https://source.unsplash.com/random";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/text',
    'Access-Control-Allow-Origin':'*'
  })
 };

@Injectable({
  providedIn: 'root'
})
export class GetImagesService {

  constructor(private _http: HttpClient) { }

  public getRandomImage(...tags:string[]) {
    const randomNumber = randomIntFromInterval(100,300)
    return this._http.get(API_URL+`/${randomIntFromInterval(randomNumber,randomNumber)}x${randomIntFromInterval(randomNumber,randomNumber)}/?`+tags, { responseType: 'blob' });
  }



}
