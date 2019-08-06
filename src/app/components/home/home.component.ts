import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;

  constructor(private service:AppService, private sanitizer: DomSanitizer, private route: Router) { }

  ngOnInit() {
this.service.getAllProducts().subscribe(result=>this.products = result);
  }

  public getSantizeUrl(url : string) {
      return this.sanitizer.bypassSecurityTrustUrl("assets"+url);
  }

  viewProduct(product){
    this.route.navigate(['view-product', JSON.stringify(product)]);
  }
}
