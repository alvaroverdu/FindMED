import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.css']
})
export class NavbaruserComponent implements OnInit {


  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
      
  }

  logout() {
    this.usuarioService.logout();
  }

}
