import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  _id: String = '';
  name: String = '';
  // nome_produto: String = '';
  price: number = null;
  // preco_produto: number = null;
  width: number = null;
  // largura_produto: number = null;
  length: number = null;
  // comprimento_produto: number = null;
  grammage: number = null;
  // gramatura_produto: number = null;
  // peso_produto: number = null;
  // frete_produto: number = null;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'price': [null, Validators.required],
      'width': [null, Validators.required],
      'length': [null, Validators.required],
      'grammage': [null, Validators.required],
      // 'peso_produto': null,
      // 'frete_produto': null
    });
  }

  getProduct(id) {
    this.api.getProduct(id).subscribe(data => {
      console.log(data)
      // let peso_produto = data.grammage * data.width * data.length
      // let frete_produto = 5.45 * peso_produto
      this._id = data.id;
      this.productForm.setValue({
        name: data.name,
        price: data.price,
        width: data.width,
        length: data.length,
        grammage: data.grammage,
        // peso_produto: peso_produto,
        // frete_produto: frete_produto
      });
    });
  }

  updateProduct(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateProduct(this._id, form)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/produto/detalhes/' + this._id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

}
