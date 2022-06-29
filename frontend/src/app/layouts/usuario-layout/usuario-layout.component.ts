import { Component, OnInit } from '@angular/core';

declare function iniciarCustom();


@Component({
  selector: 'app-usuario-layout',
  templateUrl: './usuario-layout.component.html',
  styleUrls: ['./usuario-layout.component.css']
})
export class UsuarioLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    iniciarCustom();
  }

}
