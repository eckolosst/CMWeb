import { Component } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Router, ActivatedRoute} from '@angular/router'
import { FormControl, FormControlDirective, Validators } from '@angular/forms';
import { MdSnackBar, MdSnackBarHorizontalPosition, MdSnackBarVerticalPosition, MdSnackBarConfig } from '@angular/material';
declare var $: any;


@Component({
   selector: 'main',
   templateUrl: 'main.template.html'
})

export class MainComponent {
        public secciones;
        public seleccion = -1;
        public errorMsg = '';
        public title: String;
        public titleFijo: String;
        public description: String;
        public titleFC = new FormControl('', [Validators.required]);
        public seccionFC = new FormControl('', [Validators.required]);

        constructor(
            private _route: ActivatedRoute,
            private _router: Router,
            public snackBar: MdSnackBar
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
                    "description": '<p>Compartimos esta App porque queremos aportar en la construcción de una vida libre de violencia de género. Si la bajaste en tu dispositivo, si la encontraste en nuestro blog y te interesó su contenido, habremos dado un paso más para alcanzar el objetivo de construir una sociedad más justa. </p><p>Te invitamos a que difundas esto que nos une. Y te convocamos a que formes parte también del proceso colectivo de transformación de nuestra realidad. Hay mucho por hacer para lograr la igualdad de derechos, para alcanzar una verdadera equidad de género que se traduzca en una justa distribución de responsabilidades, poder y recursos. </p><p>Luchemos juntas por las libertades que nos faltan! </p><p>Porque necesitamos la <strong>URGENTE </strong>declaración de “Emergencia Nacional por la No Violencia hacia las mujeres”. </p><p>Para que todas las instituciones que intervienen ante una situación de violencia de género –Salud, Policía, Justicia, Asistencia Social estén capacitadas para hacerlo. </p><p>Para que se elabore un registro oficial de situaciones de violencia y sus consecuencias, para poder a partir de estadísticas, realizar diseños de políticas públicas que realmente aborden el problema. </p><p>Para que se realicen campañas comunicacionales de prevención y sensibilización. El Estado debe darnos mensajes claros sobre la violencia de género.</p><p>Para que se incluya en el proceso de transformación al varón, desnaturalizando comportamientos violentos o potencialmente violentos, y buscando la construcción de nuevas masculinidades. </p><p>Ciudad Mujer Protagonista nos ha encontrado, te invitamos a que nos contactes y sumes vos también tus ganas de vivir una vida sin violencia. Por vos, por nosotras, por todas! </p><p><strong>CONTACTO: </strong>mumalanqn@gmail.com</p><p><strong>Facebook:</strong> Mumalá Neuquén Capital</p>'
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
            this.seleccion = -1;
            this.snackBar.open("Sección  "+this.titleFijo.toUpperCase()+"  actualizada con éxito!", null,{
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              extraClasses: ['success-snackbar']
            });

            // Transformación String a HTML (para APP - NO BORRAR TODAVIA)
            // var $hs = $( "#hs" );
            // var htmlString = $.parseHTML( this.description );
            // $hs.append( htmlString );
        }
        llenar(i){
            this.seleccion = i;
            this.title=this.secciones[i].title;
            this.titleFijo=this.secciones[i].title;
            this.description=this.secciones[i].description
        }

        back(){
            this.seleccion = -1;
        }
}
