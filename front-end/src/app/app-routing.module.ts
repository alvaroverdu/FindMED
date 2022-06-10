import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { UsuarioLayoutComponent } from './layouts/usuario-layout/usuario-layout.component';
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: '', component: UsuarioLayoutComponent, children: [
      { path: 'home', component: HomePage }
    ]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
