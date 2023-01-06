import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContentHomeComponent } from '../content-home/content-home.component';
import { DropdownCityNames } from '../dropdown-city-names';
import { LocalService } from '../local.service';
import { RecentData } from '../recent-data';
import { SharedService } from '../shared.service';
import { WeatherParameters } from '../weather-parameters';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  weatherParameters: WeatherParameters | undefined;
  recentList: RecentData[] | undefined;
  dropDownList:DropdownCityNames | undefined;
form: any;

  ngOnInit(): void {
    console.log(this.localStore.getData("maddur") + "...e...")
  }


  constructor(private WeatherService: WeatherService, private localStore: LocalService,private sharedService:SharedService) {

  }

  getWeatherByCityName(cityName: any) {
    console.log('city...')
    console.log(cityName.value);
    if (cityName.value != '') {
      // this.WeatherService.getWeatherDataByCityName(cityName.value).subscribe(data => {
      //   console.log('city')
      //   console.log(data);
      //   console.log('name');
      //   this.weatherParameters = data;
      //   let datas = JSON.stringify(this.weatherParameters)
      //   console.log("datas = " + datas);
      //   this.localStore.saveData('latest', datas);
      //   console.log(localStorage.getItem('data'));
      //   this.setRecentList(data);
      //   this.sharedService.sendClickEvent(true);
      //   // this.localStore.saveData(this.weatherParameters?.name, "datas"); 
      // })
      this.sharedService.getWeatherByCityName(cityName.value);
    }
    
  }

  // setRecentList(data: any) {
  //   console.log('setting recentlist')
  //   let datas = JSON.stringify(data);
  //   let oldList = this.localStore.getRecentList();
  //   this.recentList = JSON.parse(oldList!!) || [];
  //   if (!this.recentList?.some((city: any) => city.cityId === this.weatherParameters?.id)) {
  //     const category: RecentData = {
  //       cityName: this.weatherParameters?.name,
  //       description: this.weatherParameters?.weather[0].description,
  //       countryName: this.weatherParameters?.sys.country,
  //       image: this.weatherParameters?.weather[0].icon,
  //       temp: (this.weatherParameters!.main.temp- 273.15).toFixed(0),
  //       cel: 'c',
  //       cityId: this.weatherParameters?.id,
  //       isFav: false
  //     };

  //     this.recentList?.push(category);
  //     console.log(this.recentList);
  //     this.localStore.setRecentList(JSON.stringify(this.recentList));
      
  //     console.log('addedd...');
  //   }else{
  //     console.log('already addedd...!!!');
  //   }
  // }
  getCityList(cityName: any){
    this.WeatherService.getCityNames(cityName.value).subscribe(data => {
        console.log('citynames....')
        let datas = JSON.stringify(data);
        this.dropDownList = data;
        console.log('citynames....' + this.dropDownList[0].local_names);
    });
  }

  getWeatherByCords(lat:any,lon:any) {
    console.log('city...')
    console.log(lat + lon);
    if (lat != '' && lon != '') {
      // this.WeatherService.getWeatherDataByCityName(cityName.value).subscribe(data => {
      //   console.log('city')
      //   console.log(data);
      //   console.log('name');
      //   this.weatherParameters = data;
      //   let datas = JSON.stringify(this.weatherParameters)
      //   console.log("datas = " + datas);
      //   this.localStore.saveData('latest', datas);
      //   console.log(localStorage.getItem('data'));
      //   this.setRecentList(data);
      //   this.sharedService.sendClickEvent(true);
      //   // this.localStore.saveData(this.weatherParameters?.name, "datas"); 
      // })
      this.sharedService.getWeatherDataByCords(lat,lon);
    }
    
  }
}
