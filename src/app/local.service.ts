import { Injectable } from '@angular/core';
import { RecentData } from './recent-data';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public setLastCalledCity(value: string) {
    this.saveData('latest', value);
  }
  public getLastCalledCity() {
    return this.getData('latest');
  }

  public setFavList(value: string) {
    this.saveData('favList', value);
  }
  public getFavList() {
    return this.getData('favList');
  }
  public setRecentList(value: string) {
    this.saveData('recentList', value);
  }

  public getRecentList() {
    return this.getData('recentList');
  }
  public clearAllFavList() {
    this.removeData('favList');
  }
  public clearAllRecentList() {
    this.removeData('recentList');
  }
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }


  getImageUrl(imageId: any) {
    console.log("im.." + imageId)
    let imageUrl: any;
    switch (imageId) {
      case '02n':
        imageUrl = '../assets/Web/01_Home/background/icon_partially_cloudy_big.png';
        break;
      case '02d':
        imageUrl = '../assets/Web/01_Home/background/icon_partially_cloudy_big.png';
        break;
      case '03n':
        imageUrl = '../assets/Web/01_Home/background/icon_partially_cloudy_big.png';
        break;
      case '03d':
        imageUrl = '../assets/Web/01_Home/background/icon_partially_cloudy_big.png';
        break;
      case '04n':
        imageUrl = '../assets/Web/01_Home/background/icon_partially_cloudy_big.png';
        break;
      case '04d':
        imageUrl = '../assets/Web/01_Home/background/icon_partially_cloudy_big.png';
        break;
      case '50n':
        imageUrl = '../assets/Web/01_Home/background/icon_thunderstorm_big.png';
        break;
      case '50d':
        imageUrl = '../assets/Web/01_Home/background/icon_thunderstorm_big.png';
        break;
      case '10n':
        imageUrl = '../assets/Web/01_Home/background/icon_rain_big.png';
        break;
      case '10d':
        imageUrl = '../assets/Web/01_Home/background/icon_rain_big.png';
        break;
      case '01n':
        imageUrl = '../assets/Web/01_Home/background/icon_clear_night.png';
        break;
      case '01d':
        imageUrl = '../assets/Web/01_Home/background/icon_mostly_sunny.png';
        break;
      default:
        imageUrl = '../assets/Web/01_Home/background/icon_mostly_sunny.png';
        break;
    }
    return imageUrl;
  }

}






