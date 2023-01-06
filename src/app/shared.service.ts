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
    console.log();
  }
  getClickEvent() {
    console.log('click sent....');
    return this.subject.asObservable();

  }

  getWeatherDataByCords(lat: any, lon: any) {
    if (lat != '' && lon != '') {
      this.WeatherService.getWeatherDataByCords(lat, lon).subscribe(data => {
        this.weatherParameters = data;
        let datas = JSON.stringify(this.weatherParameters)
        console.log("datas/././././../bycords.... = " + datas);
        this.localStore.setLastCalledCity(datas);
        console.log(localStorage.getItem('data'));
        this.setRecentList(data);

        this.sendClickEvent(true);
      })

    }
  }




  getWeatherByCityName(cityName: any) {
    console.log('city./././....')
    console.log(cityName);
    if (cityName != '') {
      this.WeatherService.getWeatherDataByCityName(cityName).subscribe(data => {
        console.log('city')
        console.log(data);
        console.log('name');
        this.weatherParameters = data;
        let datas = JSON.stringify(this.weatherParameters)
        console.log("datas/././././.... = " + datas);
        this.localStore.setLastCalledCity( datas);
        console.log(localStorage.getItem('data'));
        this.setRecentList(data);

        this.sendClickEvent(true);
        // this.localStore.saveData(this.weatherParameters?.name, "datas"); 
      })
    }
  }


  setRecentList(data: any) {
    console.log('setting recentlist')
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
      console.log(this.recentList);
      this.localStore.setRecentList(JSON.stringify(this.recentList));

      console.log('addedd...');
    } else {
      console.log('already addedd...!!!');
    }
  }


}
