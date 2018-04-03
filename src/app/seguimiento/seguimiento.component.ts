import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { SimpleTimer} from 'ng2-simple-timer';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css'],
  providers: [SimpleTimer, UserService]
})
export class SeguimientoComponent implements OnInit{
  public origen;
  public destino;
  public lat;
  public lng;
  public id;
  public timerId: string;
  public conectado = false;

  constructor(
    private st: SimpleTimer,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this._route.params.subscribe(params => {
      this.id = params['id'];
      this._userService.getSeguimiento(this.id).subscribe(
        result => {
          var seg = result.usuario.seguimiento;
          if(seg){
            this.origen = {
              lat: seg[0].lat,
              lng: seg[0].lng,
              label: "Origen",
              draggable: false,
              icon: '../../assets/seguimiento/origen.png'
            };
            this.destino = {
              lat: seg[1].lat,
              lng: seg[1].lng,
              label: "Destino",
              draggable: false,
              icon: '../../assets/seguimiento/destino.png'
            };
            this.lat = (this.origen.lat + this.destino.lat)/2;
            this.lng = (this.origen.lng + this.destino.lng)/2;
            this.conectado = true;
          }
          else{
            alert("Error al obtener el Seguimiento");
          }
        },
        err => {
          alert("Error al buscar el Usuario");
          console.error(err)
        });
      });
  }

  ngOnInit() {
    this.st.newTimer('timer', 5);
  	this.timerId = this.st.subscribe('timer', () => this.callback());
  }

  callback(){
    this._userService.getSeguimiento(this.id).subscribe(
      result => {
        console.log(result)
        var seg = result.usuario.seguimiento;
        if(seg){
          this.origen.lat = seg[0].lat;
          this.origen.lng = seg[0].lng;
          this.lat = (this.origen.lat + this.destino.lat)/2;
          this.lng = (this.origen.lng + this.destino.lng)/2;
          console.log("Actualizando Origen")
          let distancia = Math.sqrt(Math.pow(this.destino.lat - this.origen.lat,2)+ Math.pow(this.destino.lng - this.origen.lng,2))
          console.log("Distancia: ",distancia)
          if(distancia < 0.0005){
            this.delete();
            alert('Destino alcanzado (:')
          }
        }
        else{
          alert("Error al buscar el Seguimiento");
        }
      },
      err => {
        alert("Error al buscar el Usuario");
        console.error(err)
      });
  }

  delete(){
    this.st.delTimer('timer');
  }

}
