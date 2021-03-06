import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {EventoService} from "../../services/evento.service";
import {MantenimientoService} from "../../services/mantenimiento.service";
import {SalidaService} from "../../services/salida.service";
import {variableService} from "../../services/variables.service"
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styleUrls: ['./aprobar.component.scss'],
  providers: [UserService, EventoService, MantenimientoService, SalidaService, variableService]
})
export class AprobarComponent implements OnInit {

  token: any;
  textoCrear: string;
  id: number;
  solicitud: string;
  form: FormGroup;
  tipo: string;
  identity: any;
  aprobado: { status: string, verificado: boolean; };

  constructor(
    private _UserService: UserService,
    private _eventoService: EventoService,
    private _mantenimientoService: MantenimientoService,
    private _salidaService: SalidaService,
    private _variableService: variableService,
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _spinner: NgxSpinnerService
  ) {
    this.token = this._variableService.getToken();
    this.textoCrear = "Apruebe la solicitud";  
    this.identity = this._variableService.getIdentity(); 

    this.aprobado = {
      "status": "aprobado",
      "verificado": true
    }

   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.editarForm();
    this.getSolicitud();
  }

  private editarForm() {

		this.form = this._formBuilder.group({
      email: new FormControl(this.identity.email, { validators: [Validators.required], updateOn: 'change' }),
      password: new FormControl('', {validators: [Validators.required], updateOn: 'change' } )
		});

  } 

  getSolicitud(){

    this._route.params.subscribe(params => {

      this.id = +params['id'];
      this.solicitud = params['solicitud']

      switch(this.solicitud){
        case 'eventos':
          this.tipo = 'eventos';
          break;
        case 'mantenimientos':
          this.tipo = 'mantenimiento';
          break;
        case 'salidas':
          this.tipo = 'salidas';
          break;
        default:
          this.tipo = 'null';
          break;

      }


      });
  }

  onSubmit(form){
    this._spinner.show();
    this._UserService.clave(this.token, form).subscribe(
      response => {
        if(response.status == 'success'){

          //redireccion a la solicitud
          switch(this.tipo){
            case 'eventos':
              this.aprobarEvento();
              break;
            case 'Mantenimientos':
              this.aprobarMantenimiento();
              break;
            case 'salidas':
              this.aprobarSalida();
              break;
          }
          
    

        }else{
          this._spinner.hide();
          this._toastr.error('Parece que ha habido algun error','OOPS');

        }
      },
      error => {
        this._spinner.hide();
        this._toastr.error('Parece que los datos han sido erróneos','OOPS');
        console.log(<any>error);

      }
    );

  }

  aprobarEvento(){
      this._eventoService.updateEvento(this.token, this.aprobado, this.id).subscribe(
        response => {
          if(response.status == "success"){
            this._spinner.hide();
            this._toastr.success('La aprobación se ha realizado con éxito', 'LISTO');
            this._router.navigate(['eventos/'+this.id]);
  
          }else{
            this._spinner.hide();
            this._toastr.error('La solicitud no se ha podido aprobar', 'SOLICITUD FALLIDA');
          }
  
        },
  
        error => {
          this._spinner.hide();
          this._toastr.error('La solicitud no se ha podido aprobar', 'SOLICITUD FALLIDA');
          console.log(<any>error);
  
        }
      )
    } 

    aprobarMantenimiento(){
      this._mantenimientoService.updateMantenimiento(this.token, this.aprobado, this.id).subscribe(
        response => {
          if(response.status == "success"){
            this._spinner.hide();
            this._toastr.success('La aprobación se ha realizado con éxito', 'LISTO');
            this._router.navigate(['mantenimiento/'+this.id]);
  
          }else{
            this._spinner.hide();
            this._toastr.error('La solicitud no se ha podido aprobar', 'SOLICITUD FALLIDA');
          }
  
        },
  
        error => {
          this._spinner.hide();
          this._toastr.error('La solicitud no se ha podido aprobar', 'SOLICITUD FALLIDA');
          console.log(<any>error);
  
        }
      )
    }

    aprobarSalida(){
      this._salidaService.updateSalida(this.token, this.aprobado, this.id).subscribe(
        response => {
          if(response.status == "success"){
            this._spinner.hide();
            this._toastr.success('La aprobación se ha realizado con éxito', 'LISTO');
            this._router.navigate(['salidas/'+this.id]);
  
          }else{
            this._spinner.hide();
            this._toastr.error('la solicitud no se ha podido aprobar', 'SOLICITUD FALLIDA');
          }
  
        },
  
        error => {
          this._spinner.hide();
          this._toastr.error('la solicitud no se ha podido aprobar', 'SOLICITUD FALLIDA');
          console.log(<any>error);
  
        }
      )
    }


}












