import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumComponent } from './components/album/album.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { HomeComponent } from './components/home/home.component'
import { appComponent } from './components/app/app.component';


const routes: Routes = [
  {
    path: 'album',
    component: AlbumComponent
  },
  {
    path: 'app',
    component: appComponent
  },
  {
    path: 'album/imagen/:id',
    component: ImagenComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'album/:id',
    component: AlbumComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
