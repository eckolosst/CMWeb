import { Component } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Router, ActivatedRoute} from '@angular/router'
import { FormControl, FormControlDirective, Validators } from '@angular/forms';

@Component({
   selector: 'main',
   templateUrl: 'main.template.html'
})

export class MainComponent {
        public secciones;
        public seleccion = -1;
        public errorMsg = '';
        public title: String;
        public description: String;
        public titleFC = new FormControl('', [Validators.required]);
        public seccionFC = new FormControl('', [Validators.required]);

        constructor(
            private _route: ActivatedRoute,
            private _router: Router
        ){
            this.secciones = [
                {
                    "title": "¿Quiénes Somos?",
                    "description": 'una descripcion random'
                },
                {
                    "title": "Violencia de Género",
                    "description": ''
                },
                {
                    "title": "¿Cómo Denunciar?",
                    "description": ''
                },
                {
                    "title": "¿Qué Medidas Tomar?",
                    "description": ''
                },
                {
                    "title": "¿Dónde Denunciar?",
                    "description": ''
                },
                {
                    "title": "¿Qué Hacer en un Caso?",
                    "description": ''
                },
                {
                    "title": "Consultas en NQN Capital",
                    "description": ''
                },
                {
                    "title": "Sé Protagonista",
                    "description": ''
                },
                {
                    "title": "Síntomas de la Violencia",
                    "description": ''
                },
                {
                    "title": "Ciclo de la Violencia",
                    "description": ''
                },
                {
                    "title": "Cifras de la Violencia",
                    "description": '<p><strong>EN ARGENTINA</strong></p><p>En nuestro país, muere una mujer cada 31 horas producto de la violencia de género. Lamentablemente, los números de los femicidios siguen en aumento año tras año.</p><p>Ante la ausencia de estadísticas oficiales sobre femicidios en Argentina, la Asociación Civil "<em>La Casa del Encuentro</em>" en el año 2008 comienza a elaborar un registro y produce el 1º Informe de Femicidios en Argentina. Para continuar este trabajo crean el "<em>Observatorio de Femicidios en Argentina Adriana Marisel Zambrano</em>". Estas son las cifras del último informe correspondiente a 2014:</p><p>AÑO 2014: 277 FEMICIDIOS Y 29 FEMICIDIOS "VINCULADOS" DE HOMBRES Y NIÑOS</p><p>AÑO 2008 A 2014: en 7 años se registraron 1088 femicidios. 2196 hijas e hijos quedaron sin madres, víctimas colaterales de los femicidios. 1403 son menores de edad.</p><p><em>Para más información hacé click en este enlace:</em> <a href="http://www.lacasadelencuentro.org" target="_blank">http://www.lacasadelencuentro.org</a></p><p><br></p><p><strong>EN LA CIUDAD DE NEUQUÉN</strong></p><p>De acuerdo a los registros elaborados por el servicio 0800-MUJER (0800-122-6853) durante el período 2012-2014 se recibieron 9.434 llamados. Durante los primeros 4 meses de 2015 se registraron 631 llamados. De los cuales, 24 fueron casos de emergencia. Además, ante la gravedad de casos puntuales, hubo 15 ingresos a refugios.</p>'
                },
                {
                    "title": "Legislación Vigente",
                    "description": ''
                }
            ]
            // this.title = "Este es el texto por default"
        }
        setSeccion() {
            console.log(this.description);
            this._router.navigate(['/home']);
        }
        llenar(i){
            this.seleccion = i;
            this.title=this.secciones[i].title;
            this.description=this.secciones[i].description
        }
}
