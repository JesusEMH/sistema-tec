import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public title:string;

  constructor() { 
    this.title = "pagina de login";
  }

  ngOnInit(): void {
  }

}