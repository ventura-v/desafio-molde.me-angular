import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'produtos',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Lista de Produtos' }
  },
  {
    path: 'produto/detalhes/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
    data: { title: 'Detalhe do Produto' }
  },
  {
    path: 'produto/novo',
    component: ProductCreateComponent,
    canActivate: [AuthGuard],
    data: { title: 'Adicionar Produto' }
  },
  {
    path: 'produto/editar/:id',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'Editar o Produto' }
  },
  {
    path: '',
    redirectTo: '/produtos',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
