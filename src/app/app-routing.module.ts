import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BuscaComponent } from './pages/busca/busca.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'passagens/busca',
    component: BuscaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
