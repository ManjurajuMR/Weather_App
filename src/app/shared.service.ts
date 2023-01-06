import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LocalService } from './local.service';
import { RecentData } from './recent-data';
import { WeatherParameters } from './weather-parameters';
import { WeatherService } from './weather.service';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  weatherParameters: WeatherParameters | undefined;
  recentList: RecentData[] | undefined;
  private subject = new BehaviorSubject<boolean>(false);
  value: any;
  constructor(private WeatherService: WeatherService, private localStore: LocalService) {

  }
  sendClickEvent(click: any) {
    this.subject.next(click);
  }
  getClickEvent() {
    return this.subject.asObservable();
  }

  getWeatherDataByCords(lat: any, lon: any) {
    if (lat != '' && lon != '') {
      this.WeatherService.getWeatherDataByCords(lat, lon).subscribe(data => {
        this.weatherParameters = data;
        let datas = JSON.stringify(this.weatherParameters)
        this.localStore.setLastCalledCity(datas);
        this.setRecentList(data);

        this.sendClickEvent(true);
      })

    }
  }

  getWeatherByCityName(cityName: any) {
    if (cityName != '') {
      this.WeatherService.getWeatherDataByCityName(cityName).subscribe(data => {
        this.weatherParameters = data;
        let datas = JSON.stringify(this.weatherParameters)
        this.localStore.setLastCalledCity( datas);
        this.setRecentList(data);
        this.sendClickEvent(true);
      })
    }
  }

  setRecentList(data: any) {
    let datas = JSON.stringify(data);
    let oldList = this.localStore.getRecentList();
    this.recentList = JSON.parse(oldList!!) || [];
    if (!this.recentList?.some((city: any) => city.cityId === this.weatherParameters?.id)) {
      const category: RecentData = {
        cityName: this.weatherParameters?.name,
        description: this.weatherParameters?.weather[0].description,
        countryName: this.weatherParameters?.sys.country,
        image: this.weatherParameters?.weather[0].icon,
        temp: (this.weatherParameters!.main.temp - 273.15).toFixed(0),
        cel: 'c',
        cityId: this.weatherParameters?.id,
        isFav: false
      };

      this.recentList?.push(category);
      this.localStore.setRecentList(JSON.stringify(this.recentList));
    } else {
      console.log('already addedd...!!!');
    }
  }


}
