import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Product } from 'src/model/product';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'preco', 'gramatura', 'frete', 'valor-total', 'camisas', 'custo', 'acao'];
  dataSource: Product[];

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this._api.getProducts()
      .subscribe(res => {
        this.dataSource = res;
        this.dataSource.data.map(data => {
          const area = data.width * data.length
          data.peso_produto = area * (data.grammage / 1000);
          data.frete_produto = parseFloat((5.45 * data.peso_produto).toFixed(2));
          data.valor_total_produto = (data.frete_produto + parseFloat(data.price)).toFixed(2)
          data.camisas_produto = Math.trunc(area / 8.75)
          data.custo_produto = (data.camisas_produto / parseFloat(data.price)).toFixed(2)
        })
        var bigger = parseFloat(this.dataSource.data[0].custo_produto);
        for (let i = 0; i < this.dataSource.data.length; i++) {
          let coast = parseFloat(this.dataSource.data[i].custo_produto)
          if (coast > bigger) {
            bigger = coast
          }
        }
        this.dataSource.data.map(coasts => {
          if (coasts.custo_produto == bigger) {
            var betterCoast = coasts.name
            for (let i = 0; i < this.dataSource.data.length; i++) {
              this.dataSource.data[i].betterCoast = betterCoast
            }
          }
        })
        console.log(this.dataSource)
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
