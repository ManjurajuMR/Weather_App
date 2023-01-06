import { Component, Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from '../constants';

import { LocalService } from '../local.service';
import { RecentData } from '../recent-data';
import { SharedService } from '../shared.service';
import { WeatherParameters } from '../weather-parameters';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ContentHomeComponent implements OnInit {
  favData: RecentData[] | undefined;
  favList: RecentData[] | undefined;
  oldFavList: RecentData[] | undefined;
  recentList: RecentData[] | undefined;
  editFav: RecentData | undefined;
  favCount: number | undefined;
  addedToFav: boolean = false;
  firstLaunch: boolean = true;
  lat: any;
  lon: any;
  weatherData: WeatherParameters | undefined;
  weatherDescription: any;
  weatherTemp: any;
  minWeatherTemp: any;
  maxWeatherTemp: any;
  tempCelFar: any;
  minTempCelFar: any;
  maxTempCelFar: any;
  imageUrl: any;
  weather: WeatherParameters | undefined;
  footerContent: any;
  isInCel: boolean = true;
  clickEventSubsciption: Subscription | undefined;
  constant = Constants;

  // weatherParameter: WeatherParameters;
  constructor(private WeatherService: WeatherService, private localStorage: LocalService, private sharedService: SharedService) {
    this.clickEventSubsciption = sharedService.getClickEvent().subscribe(() => {
      console.log('click received');
      this.ngOnInit();
    });
  }
  ngOnInit(): void {
    if (!this.firstLaunch) {
      console.log('onlyset' + this.firstLaunch);
      this.setWeatherData();

    } else {
      this.getLocation();
      console.log('bylocation' + this.firstLaunch);

    }
    this.setActiveBtnStyle("cel", "far");
    this.getFavList();
   
  }


  getLocation() {
    console.log('Hii....28');
    if ('geolocation' in navigator) {
      console.log('Hii....30');
      navigator.geolocation.watchPosition((success) => {
        console.log('Hii....32');
        console.log(success.coords.latitude + "lon = " + success.coords.longitude);
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        if (this.lat != '' && this.lon != '') {

          this.sharedService.getWeatherDataByCords(this.lat,this.lon);
        }
      })

      this.firstLaunch = false;
    }

  }





  setWeatherData() {
    this.firstLaunch = false;
    let datas = this.localStorage.getData('latest');
    this.weatherData = JSON.parse(datas!!);
    console.log('setting' + this.weatherData?.main.temp);
    this.weatherTemp = (this.weatherData!.main.temp - 273.15).toFixed(0);
    this.tempCelFar = this.weatherTemp;
    this.minWeatherTemp = (this.weatherData!.main.temp_min - 273.15).toFixed(0);
    this.minTempCelFar = this.minWeatherTemp;
    this.maxWeatherTemp = (this.weatherData!.main.temp_max - 273.15).toFixed(0);
    this.maxTempCelFar = this.maxWeatherTemp;
    this.weatherDescription = this.weatherData?.weather[0].description;
    this.imageUrl = this.localStorage.getImageUrl(this.weatherData?.weather[0].icon);
    console.log('imageurl' + this.imageUrl);
    this.setFooterContent();
    // let cityCount = this.favData?.filter(item => item.isFav === true && item.cityId === this.weatherData?.id).length;
    this.addedToFav = this.getFavList()?.filter(item => item.cityId === this.weatherData?.id).length ? true : false;


  }
  setFooterContent() {
    this.footerContent = [
      { imageSrc: '../assets/Web/01_Home/background/Group 6 Copy/icon_temperature_info.png', header: "Min - Max", header_val: this.minTempCelFar + "°" + " - " + this.maxTempCelFar + "°" },
      { imageSrc: '../assets/Web/01_Home/background/Group 6/icon_precipitation_info.png', header: 'Precipitation', header_val: (this.weatherData!.main.feels_like - 273.15).toFixed(2) + "%" },
      { imageSrc: '../assets/Web/01_Home/background/Group 8/icon_humidity_info.png', header: 'Humidity', header_val: this.weatherData?.main.humidity + "%" },
      { imageSrc: '../assets/Web/01_Home/background/Group 9/icon_wind_info.png', header: 'Wind', header_val: this.weatherData?.wind.speed + " mph" },
      { imageSrc: '../assets/Web/01_Home/background/Group 10/icon_visibility_info.png', header: 'Visibility', header_val: this.weatherData?.visibility + " mph" }
    ];
  }

  favToggleClick() {
    this.getFavList();
    if (this.addedToFav) {
      this.removeFav();
    } else {
      this.addFav();
    }
    this.addedToFav = !this.addedToFav;
  }

  addFav() {
    this.oldFavList = this.getFavList();
    if (!this.oldFavList?.some((city: any) => city.cityId === this.weatherData?.id)) {
      const category: RecentData = {
        cityName: this.weatherData?.name,
        description: this.weatherData?.weather[0].description,
        countryName: this.weatherData?.sys.country,
        image: this.weatherData?.weather[0].icon,
        temp: (this.weatherData!.main.temp - 273.15).toFixed(0),
        cel: 'c',
        cityId: this.weatherData?.id,
        isFav: true
      };
      this.oldFavList?.push(category)
      console.log("added to fav" + this.oldFavList + category.cityName);
      this.localStorage.setFavList(JSON.stringify(this.oldFavList));
    }
  }

  removeFav() {
    this.oldFavList = this.getFavList();
    if (this.oldFavList?.some((city: any) => city.cityId === this.weatherData?.id)) {
      var index = this.oldFavList?.findIndex((item) => item.cityId === this.weatherData?.id);
      this.oldFavList?.splice(index, 1);
      console.log("removed from fav" + this.oldFavList);
      this.localStorage.setFavList(JSON.stringify(this.oldFavList));
    }
  }
  getFavList() {
    let fav = this.localStorage.getFavList();
    this.favList = JSON.parse(fav!!) || [];
    return this.favList;
  }

  celciusClick() {
    if (!this.isInCel) {
      this.tempCelFar = ((this.tempCelFar - 32) * (5 / 9)).toFixed(0);
      this.minTempCelFar = ((this.minTempCelFar - 32) * (5 / 9)).toFixed(0);
      this.maxTempCelFar = ((this.maxTempCelFar - 32) * (5 / 9)).toFixed(0);
      this.setFooterContent();
      this.isInCel = true;
      this.setActiveBtnStyle("cel", "far");
    }
  }
  faraniteClick() {
    if (this.isInCel) {
      this.tempCelFar = ((this.weatherTemp * 9 / 5) + 32).toFixed(0);
      this.minTempCelFar = ((this.minWeatherTemp * 9 / 5) + 32).toFixed(0);
      this.maxTempCelFar = ((this.maxWeatherTemp * 9 / 5) + 32).toFixed(0);
      this.setFooterContent();
      this.isInCel = false;
      this.setActiveBtnStyle("far", "cel");
    }
  }

  setActiveBtnStyle(activeButton: any, deActiveButton: any) {
    let activeBtn = document.getElementById(activeButton);
    let deActiveBtn = document.getElementById(deActiveButton);

    activeBtn!.style.color = '#E32843';
    activeBtn!.style.outline = 'none';
    activeBtn!.style.backgroundColor = 'white';

    deActiveBtn!.style.color = 'white';
    deActiveBtn!.style.border = '1px solid white';
    deActiveBtn!.style.backgroundColor = 'transparent';
  }
}