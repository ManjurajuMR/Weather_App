import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Colors } from 'src/assets/sass/colors';
import { Constants } from '../constants';



import { LocalService } from '../local.service';
import { RecentData } from '../recent-data';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-content-favourite',
  templateUrl: './content-favourite.component.html',
  styleUrls: ['./content-favourite.component.css']
})
export class ContentFavouriteComponent implements OnInit {
  favList: RecentData[] | undefined;
  oldFavList: RecentData[] | undefined;
  resList: RecentData[] | undefined;
  resData: RecentData | undefined;
  cityCount: any;
  constant = Constants;
  colors = Colors;
  constructor(private localStorage: LocalService, private sharedService: SharedService,private modalService: NgbModal) {
    
  }
  ngOnInit(): void {
    this.getFavList();
  }

  isFav(isFav: boolean) {
    return isFav;
  }

  favToggleClick(cityID: any, isFav: any) {
    this.getFavList();
    if (isFav) {
      this.removeFav(cityID);
    } else {
      this.addFav(cityID);
    }
  }
  getImageUrl(imageID: any) {
    return this.localStorage.getImageUrl(imageID);
  }
  addFav(cityID: any) {
    this.resData = this.resList?.find(item => item.cityId === cityID);
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
      this.localStorage.setFavList(JSON.stringify(this.oldFavList));
    }
  }

  removeFav(cityID: any) {
    this.oldFavList = this.getFavList();
    if (this.oldFavList?.some((city: any) => city.cityId === cityID)) {
      var index = this.oldFavList?.findIndex((item) => item.cityId === cityID);
      this.oldFavList?.splice(index, 1);
      this.localStorage.setFavList(JSON.stringify(this.oldFavList));
    }
  }


  getFavList() {
    let fav = this.localStorage.getFavList();
    this.favList = JSON.parse(fav!!) || [];
    this.cityCount = this.favList?.length;
    return this.favList;
  }
  getResList() {
    let res = this.localStorage.getRecentList();
    this.resList = JSON.parse(res!!) || [];
    return this.resList;
  }

  clearAllFavList() {
    this.localStorage.clearAllFavList();
    this.ngOnInit(); 
  }
	openAlertBox(content:any) {
		this.modalService.open(content, { centered: true });
	}


  getWeatherByCityName(cityName: any) {
    if (cityName.value != '') {
      this.sharedService.getWeatherByCityName(cityName);
    }
  }

  isFavDataListEmpty(){
    return this.favList?.length ? true : false ;  
  }
}
