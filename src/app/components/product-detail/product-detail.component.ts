import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Product } from 'src/model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product = { _id: '', name: '', price: null, width: null, length: null, grammage: null, peso_produto: null, frete_produto: null, valor_total_produto: null, camisas_produto: null, dt_atualizacao: null };
  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params['id']);
  }

  getProduct(id) {
    this.api.getProduct(id)
      .subscribe(data => {
        this.product = data;
        console.log(this.product);
        const area = this.product.width * this.product.length
        this.product.peso_produto = area * (this.product.grammage / 1000);
        this.product.frete_produto = parseFloat((5.45 * this.product.peso_produto).toFixed(2))
        this.product.valor_total_produto = (this.product.frete_produto + parseFloat(this.product.price)).toFixed(2)
        this.product.camisas_produto = Math.trunc(area / 8.75)
        this.isLoadingResults = false;
      });
  }

  deleteProduct(id) {
    this.isLoadingResults = true;
    this.api.deleteProduct(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/produtos']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

}
