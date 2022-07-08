import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';


declare function iniciarCustom();


@Component({
  selector: 'app-usuario-layout',
  templateUrl: './usuario-layout.component.html',
  styleUrls: ['./usuario-layout.component.css']
})
export class UsuarioLayoutComponent implements OnInit {

  constructor( private location: Location,
               private router: Router) { }

  ngOnInit(): void {
    iniciarCustom();
  }

  irAtras(){
    this.location.back();
  }

  comprobarUrlInicio(){
    if(this.router.url === '/usuario/mainpage'){
      return true;
    }else{
      return false;
    }
  }

}
