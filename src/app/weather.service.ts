import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DropdownCityNames } from './dropdown-city-names';
import { WeatherParameters } from './weather-parameters';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
 url = 'https://api.openweathermap.org/data/2.5/weather';
 cityUrl = 'https://api.openweathermap.org/geo/1.0/direct?';
 apiKey = 'ae6be994243d195a95b068598d294f9c';
  constructor(private http:HttpClient) { }

  getWeatherDataByCords(lat: string | number | boolean,lon: string | number | boolean){
    let params = new HttpParams()
    .set('lat',lat)
    .set('lon',lon)
    .set('appId',this.apiKey)

    return this.http.get<WeatherParameters>(this.url , {params});

  }

  getWeatherDataByCityName(city:any){
    console.log("service..." + city);
    let params= new HttpParams()
    .set('q',city)
    .set('appid',this.apiKey)

    return this.http.get<WeatherParameters>(this.url, {params});
    // return this.http.get("https://api.openweathermap.org/data/2.5/weather?q=mandya&appid=ae6be994243d195a95b068598d294f9c");
  }

  getCityNames(city:any){
    console.log("service...citynames..." + city);
    let params= new HttpParams()
    .set('q',city)
    .set('limit',10)
    .set('appid',this.apiKey)

    return this.http.get<DropdownCityNames>(this.cityUrl, {params});
  }
  
}
