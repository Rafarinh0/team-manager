import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {homeRoute, personsRoute, studyRoute, teamsRoute} from 'src/app/models/constants/routes';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideOptions: boolean; //vai esconder as opções em alguns casos
  isHome: boolean; //mesma coisa mas na home
  homeRoute = homeRoute; //o angular n deixa vc usar variaveis importadas direto
  teamsRoute = teamsRoute;
  studyRoute = studyRoute;
  personsRoute = personsRoute;

  sideBarVisible = false;

  constructor(public config: ConfigService, public router: Router) { }

  ngOnInit(): void {
    this.isHome = this.router.url === this.homeRoute;
    this.hideOptions = this.config.mobile || this.config.smallDesktop;
  }

}
