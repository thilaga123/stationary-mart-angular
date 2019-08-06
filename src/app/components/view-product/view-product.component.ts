import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
product: any;
  constructor(private sanitizer: DomSanitizer, private dataRoute: ActivatedRoute) { }

  ngOnInit() {
    const key = JSON.parse(this.dataRoute.snapshot.params['product']);
console.log(key);
this.product = key;
// {productid: 2, productName: "Color Pencils", imageUrl: "\stationary image\colorPencils.jpg", desc: "12 piece color pencil set .</br> solid color.</br> clean finish.</br> FABIR CASTEL SET.</br>↵", price: "200"}
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl("assets"+url);
}
}
