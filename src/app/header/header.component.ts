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
    
  }


  constructor(private WeatherService: WeatherService, private localStore: LocalService,private sharedService:SharedService) {

  }

  getWeatherByCityName(cityName: any) {
    if (cityName.value != '') {
     
      this.sharedService.getWeatherByCityName(cityName.value);
    }
    
  }

  
  getCityList(cityName: any){
    this.WeatherService.getCityNames(cityName.value).subscribe(data => {
        let datas = JSON.stringify(data);
        this.dropDownList = data;
    });
  }

  getWeatherByCords(lat:any,lon:any) {
    if (lat != '' && lon != '') { 
      this.sharedService.getWeatherDataByCords(lat,lon);
    }
    
  }
}
