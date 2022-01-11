import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  readonly MOBILE_MAX_WIDTH = 425;
  readonly SMALL_DESKTOP = 1000;
  screenWidth: number = window.innerWidth; //retorna o width atual da tela
  mobile: boolean = this.screenWidth <=this.MOBILE_MAX_WIDTH;
  smallDesktop: boolean = this.screenWidth <= this.SMALL_DESKTOP;
  

  constructor() {
    window.addEventListener('resize', (event)=>{
      this.screenWidth = window.innerWidth;
      this.mobile = this.screenWidth <=this.MOBILE_MAX_WIDTH;
      this.smallDesktop = this.screenWidth <= this.SMALL_DESKTOP;
    });
  }
}
