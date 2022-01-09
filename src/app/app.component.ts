import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  teste = true;

  lista = [{nome: 'Nome 1'}, {nome: 'Nome 2'}, {nome: 'Nome 3'}];
}
