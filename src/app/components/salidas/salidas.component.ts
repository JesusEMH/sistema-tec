import { Component, OnInit } from '@angular/core';
import {variableService} from "../../services/variables.service"
import {SalidaService} from "../../services/salida.service"
import { NgxSpinnerService } from "ngx-spinner";
import { global } from "../../services/global";

 

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss'],
  providers: [SalidaService, variableService]
})
export class SalidasComponent implements OnInit {

  public textoCrear: string;
  public token;
  public salidas;
  public total;
  public last_page;
  public current_page;
  public next_page_url;
  public prev_page_url;
  types: string[];
  order: { type: string; };
  public global;


  constructor(
    private _salidaService: SalidaService,
    private _spinner: NgxSpinnerService,
    private _variableService: variableService,
 
    ) 
    {
      this.global = global.url;
      this.textoCrear = "Solicitudes de salidas"
      this.token = this._variableService.getToken();
      this.types = [ 'Mas recientes', 'Mas antiguos', 'Por mes', 'Por estado' ];
      
      this.order = {
        type: 'type1'          
    }; 

     }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.getSalidas();
    
  }

  getSalidas(){
    this._spinner.show();
    this._salidaService.getSalidas(this.token).subscribe(
      response => {
        this._spinner.show();
        if(response.status == 'success'){
          this.salidas = response.elementos.data;
          localStorage.setItem('eventos',JSON.stringify(response.elementos.data));
          this.total = response.elementos.total;
          this.last_page = response.elementos.last_page;
          this.current_page = response.elementos.current_page;

          this.next_page_url = this.changeUrlApi(response.elementos.next_page_url);
          this.prev_page_url = this.changeUrlApi(response.elementos.prev_page_url);
          this._spinner.hide();

        }else{
          this._spinner.hide();

        }

      },
      error => {
        this._spinner.hide();

      }
    )
    
  }

  nextPage(){
    this._spinner.show();
    this._salidaService.getNextPage(this.token, this.next_page_url ).subscribe(
      response => {
        console.log('si entra')
        if(response.status == 'success'){
          this.salidas = response.elementos.data;
          this.total = response.elementos.total;
          this.last_page = response.elementos.last_page;
          this.current_page = response.elementos.current_page;

          this.next_page_url = this.changeUrlApi(response.elementos.next_page_url);
          this.prev_page_url = this.changeUrlApi(response.elementos.prev_page_url);
          this._spinner.hide();

        }else{
          console.log('entra y se regresa')
          this._spinner.hide();

        }

      },
      error => {
        console.log('no entra')
        console.log(<any>error)
        this._spinner.hide();

      }

    );
  }

  previousPage(){
    this._spinner.show();
    this._salidaService.getNextPage(this.token, this.prev_page_url ).subscribe(
      response => {
        console.log('si entra')
        if(response.status == 'success'){
          this.salidas = response.elementos.data;
          this.total = response.elementos.total;
          this.last_page = response.elementos.last_page;
          this.current_page = response.elementos.current_page;

          this.next_page_url = this.changeUrlApi(response.elementos.next_page_url);
          this.prev_page_url = this.changeUrlApi(response.elementos.prev_page_url);
          this._spinner.hide();

        }else{
          console.log('entra y se regresa')
          this._spinner.hide();

        }

      },
      error => {
        console.log('no entra')
        console.log(<any>error)
        this._spinner.hide();

      }

    );
  }

  getAntiguos(){
    this._spinner.show();
    this._salidaService.getAntiguos(this.token).subscribe(
      response => { 
        if(response.status == 'success'){
          this.salidas = response.elementos.data;
          this.total = response.elementos.total;
          this.last_page = response.elementos.last_page;
          this.current_page = response.elementos.current_page;

          this.next_page_url = this.changeUrlApi(response.elementos.next_page_url);
          this.prev_page_url = this.changeUrlApi(response.elementos.prev_page_url);
          this._spinner.hide();

        } else{
          console.log('entra y se regresa')
          this._spinner.hide();
        }
             

      },
      error => {
        this._spinner.hide();
        console.log(<any>error);

      }
    )

  }



  getPorMes(){
    this._spinner.show();
    this._salidaService.getPorMes(this.token).subscribe(
      response => {
        if(response.status == 'success'){
          this.salidas = response.elementos.data;
          this.total = response.elementos.total;
          this.last_page = response.elementos.last_page;
          this.current_page = response.elementos.current_page;

          this.next_page_url = this.changeUrlApi(response.elementos.next_page_url);
          this.prev_page_url = this.changeUrlApi(response.elementos.prev_page_url);
          this._spinner.hide();

        }else{
          console.log('entra y se regresa')
          this._spinner.hide();

        }
        

      },
      error => {
        this._spinner.hide();
        console.log(<any>error);

      }
    )

  }

  getPorStatus(){
    this._spinner.show();
    this._salidaService.getPorStatus(this.token).subscribe(
      response =>{
        if(response.status == 'success'){
          this.salidas = response.elementos.data;
          this.total = response.elementos.total;
          this.last_page = response.elementos.last_page;
          this.current_page = response.elementos.current_page;

          this.next_page_url = this.changeUrlApi(response.elementos.next_page_url);
          this.prev_page_url = this.changeUrlApi(response.elementos.prev_page_url);
          this._spinner.hide();

        }else{
          console.log('entra y se regresa')
          this._spinner.hide();

        }
        

      },
      error =>{
        this._spinner.hide();
        console.log(<any>error);

      }
    )

  }

  getOptions(value){
    let data = this.order.type=value;

    switch(data){
      case 'Mas recientes':
        this.getSalidas();
      break;

      case 'Mas antiguos':
        this.getAntiguos();
      break;

      case 'Por mes':
        this.getPorMes();
      break;

      case 'Por status':
        this.getPorStatus();
      break;

    }

  }

  changeUrlApi(url){

    if(url === null){
      return "";
    }
    const restOfUrl = url.substring(47);

    return `${this.global}${restOfUrl}`
  }

}
