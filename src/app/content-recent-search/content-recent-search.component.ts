import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants';
import { LocalService } from '../local.service';
import { RecentData } from '../recent-data';
import { SharedService } from '../shared.service';
import { WeatherParameters } from '../weather-parameters';

@Component({
  selector: 'app-content-recent-search',
  templateUrl: './content-recent-search.component.html',
  styleUrls: ['./content-recent-search.component.css']
})
export class ContentRecentSearchComponent implements OnInit {

  rescentDataList: RecentData[] | undefined;
  favList: RecentData[] | undefined;
  resData:RecentData | undefined;
  oldFavList:RecentData[] | undefined;
  recsData: any;
  constant = Constants;
  constructor(private localStore: LocalService, private sharedService: SharedService) {

  }
  ngOnInit(): void {
    this.getResList();
  }

  isFav(cityId: any) {
    return this.getFavList()?.filter(item =>item.cityId === cityId).length ? true : false ;  
  }

  favToggleClick(cityID:any){
    this.getFavList();
    if(this.isFav(cityID)){
      this.removeFav(cityID);
    }else{
      this.addFav(cityID);  
    }
  }

  getImageUrl(imageID:any){
    console.log("favim.." + imageID)
    return this.localStore.getImageUrl(imageID);
  }

  addFav(cityID:any){
    this.resData = this.rescentDataList?.find(item => item.cityId === cityID);
    this.oldFavList = this.getFavList();
    if (!this.oldFavList?.some((city: any) => city.cityId === cityID)) {
      const category: RecentData = {
        cityName: this.resData?.cityName,
        description: this.resData?.description,
        countryName: this.resData?.countryName,
        image: this.resData?.image,
        temp: this.resData?.temp,
        cel: 'c',
        cityId: this.resData?.cityId,
        isFav: true
      };
      this.oldFavList?.push(category)
      console.log("added to fav" + this.oldFavList + category.cityName);
      this.localStore.setFavList(JSON.stringify(this.oldFavList));
    }
  }
  
  removeFav(cityID:any){
    this.oldFavList = this.getFavList();
    if (this.oldFavList?.some((city: any) => city.cityId === cityID)) {
      var index = this.oldFavList?.findIndex((item) => item.cityId === cityID);
      this.oldFavList?.splice(index,1);
      console.log("removed from fav" + this.oldFavList);
      this.localStore.setFavList(JSON.stringify(this.oldFavList));
    }
  }

  getResList() {
    let res = this.localStore.getRecentList();
    this.rescentDataList = JSON.parse(res!!) || [];
    return this.rescentDataList;
  }
  getFavList(){
    let fav = this.localStore.getFavList();
    this.favList = JSON.parse(fav!!) || [];
    return this.favList;
  }
  clearAllRecentSearch() {
    console.log('clear')
    this.localStore.clearAllRecentList();
    this.ngOnInit();
  }

  getWeatherByCityName(cityName: any) {
    console.log('city./././....')
    console.log(cityName);
    if (cityName.value != '') {
      this.sharedService.getWeatherByCityName(cityName);
    }
  }

  isRescentDataListEmpty(){
    console.log('isempty' + this.rescentDataList?.length ? true : false);
    return this.rescentDataList?.length ? true : false ;  
  }
}
