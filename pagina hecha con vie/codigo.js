//funciones
function estadoFunction(date){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var fechaActual = new Date(year + "-" + month + "-" + day);
    var fechaInicioEvento = new Date(date);
    if(fechaInicioEvento > fechaActual){
        return true;
    }else{
        return false;
    }
}
function as(s){
    let a=["á","é","í","ó","ú","a","e","i","o","u"];
    let str="";
    for(let i=0; i<s.length; i++){
        let tmp = s[i];
       for(let x=0; x < a.length-5; x++){
          if(tmp.toLowerCase() == a[x]){ tmp === tmp.toLowerCase() ? tmp=a[x+5] : tmp=a[x+5].toUpperCase();}
       }
       str+=tmp;
    }
    return str;
}

//componentes
Vue.component('ordenar',{
    template: /*html*/
        `
        <select class="form-control"  id="exampleFormControlSelect1" :value="ordenarVar" @input="ordenarMethod">
            <option disabled value="">Ordenar</option>
            <option>Orden ascendente (fecha de inicio)</option>
            <option>Orden descendente (fecha de inicio)</option>
        </select>
        `,
        computed: {
            ...Vuex.mapState({
                ordenarVar: state => state.ordenarVar
            })
        
        },
        methods: {
           ordenarMethod(e){
               if(e.target.value == "Orden descendente (fecha de inicio)" && store.state.ordenDeActivades){
                    store.state.actividades = store.state.actividades.reverse();
                    store.state.ordenDeActivades = false;
               }else if(e.target.value == "Orden ascendente (fecha de inicio)" && !store.state.ordenDeActivades){
                    store.state.actividades = store.state.actividades.reverse();
                    store.state.ordenDeActivades = true;
               }
               this.$store.commit('ordenarMutation', e.target.value);
           }
        }

});
Vue.component('filtro',{
    template: /* html */
    `
    <div class="form Formulario_busqueda">
        <div class="input-group espacio">
            <div class="input-group-btn">
                <button class="btn btn-default" type="submit">
                    <i class="fas fa-search">
                        <!--icono-->
                    </i>
                </button>
            </div>
            <input class="form-control" v-model="filtro.palabraClaveFiltro" name="search" placeholder="¿Qué estás buscando?" type="text" />
            </div>
            <div class="form-group">
            <select class="form-control" v-model="filtro.tipoProgramaFiltro">
                <option disabled value="">Tipo de programa</option>
                <option>Pregrado</option>
                <option>Posgrado</option>
            </select>
            </div>
            <div class="form-group">
            <select class="form-control" v-model="filtro.categoriaFiltro">
                <option disabled value="">Categoria</option>
                <option>Cierre académico</option>
                <option>Comité de idiomas</option>
                <option>Exámenes finales</option>
                <option>Homologaciones, reconocimientos y validaciones</option>
                <option>Inicio y finalización de clases</option>
                <option>Otras actividades de la vida universitaria</option>
                <option>Pago de matrículas</option>
                <option>Proceso de inducción</option>
                <option>Publicación de grupos cancelados</option>
                <option>Recesos y vacaciones</option>
                <option>Registro de asignaturas</option>
                <option>Reporte de notas</option>
                <option>Reserva de cupo, re activaciones de cupo y reintegros</option>
                <option>Retiro de asignaturas</option>
            </select>
            </div>
            <div class="form-group">
            <select class="form-control" v-model="filtro.facultadFiltro">
                <option disabled value="">Facultad</option>
                <option>Escuela de Administración</option>
                <option>Escuela de Medicina y Ciencias de la Salud</option>
                <option>Escuela de Ciencias Humanas</option>
                <option>Facultad de Economía</option>
                <option>Facultad de Jurisprudencia</option>
                <option>Facultad de Estudios Internacionales, Políticos y Urbanos</option>
                <option>Facultad de Ciencias Naturales</option>
                <option>Facultad de Creación</option>
                <option>Escuela de Ingeniería, Ciencia y Tecnologí</option>
            </select>
            </div>
            <div class="form-group">
            <div class="input-group">
                <div class="input-group-btn">
                    <button class="btn btn-default" type="submit">
                        <i class="fas fa-search">
                        <!--icono-->
                        </i>
                    </button>
                </div>
                <input class="form-control" name="search" v-model="filtro.programaFiltro" placeholder="Programa" type="text" />
            </div>
            </div>
            <div class="form-group">
            <p><a aria-controls="multiCollapseExample1" aria-expanded="false" class="Fecha" data-toggle="collapse" href="#multiCollapseExample1" role="button">Seleccione un mes</a></p>
            <div class="row">
                <div class="col">
                    <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body"><input class="form-control" id="example-date-input" type="date" value="2011-08-19" /></div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <p><a aria-controls="multiCollapseExample2" aria-expanded="false" class="Fecha" data-toggle="collapse" href="#multiCollapseExample2" role="button">Seleccione un mes</a></p>
                <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample2">
                        <div class="card card-body">
                            <p>Fecha inicial</p>
                            <input class="form-control" id="example-date-input" type="date" value="2011-08-19" />
                            <p>Fecha final</p>
                            <input class="form-control" id="example-date-input" type="date" value="2011-08-19" />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-md-6">
                    <input v-on:click="filtroMethod" class="btn btn-primary" type="button" value="Buscar" />
                </div>
                <div class="col-md-6">
                    <input v-on:click="limpiarMethod" class="btn btn-primary Limpiar" type="button" value="Limpiar" />
                </div>
            </div>
        </div>
    </div>   
    `,
    computed: {
        ...Vuex.mapState(['filtro']),
    },
    methods: {
        filtroMethod(){
            document.getElementById("mensaje-no-resultados").style.display = "none";
            var tempActividades = store.state.actividadesLimpiar;
            var duo = false;
            function validarDuo(){
                if(duo){
                    tempActividades = store.state.actividades;
                }else{
                    tempActividades = store.state.actividadesLimpiar;
                }
            }
            if(store.state.filtro.palabraClaveFiltro !== ''){
                store.state.actividades = [];
                duo = true;
                tempActividades.forEach( item => {
                    if(item.contenido){
                        if(item.contenido.toLowerCase().search(store.state.filtro.palabraClaveFiltro.toLowerCase()) >= 0){
                            store.state.actividades.push(item);
                        }
                    }
                });
            }
            if(store.state.filtro.tipoProgramaFiltro !== ''){
                validarDuo();
                store.state.actividades = [];
                duo = true;
                tempActividades.forEach( item => {
                    if(item.tipoPrograma){
                        if(item.tipoPrograma == store.state.filtro.tipoProgramaFiltro){
                            store.state.actividades.push(item);
                        }
                    }
                    
                }); 
            }
            if(store.state.filtro.categoriaFiltro !== ''){
                validarDuo();
                store.state.actividades = [];
                duo = true;
                tempActividades.forEach( item => {
                    if(item.categoria){
                        if(item.categoria == store.state.filtro.categoriaFiltro){
                            store.state.actividades.push(item);
                        }
                    }  
                }); 
            }
            if(store.state.filtro.facultadFiltro !== ''){
                validarDuo();
                store.state.actividades = [];
                duo = true;
                tempActividades.forEach( item => {
                    if(item.facultad){
                        if(item.facultad.toLowerCase().search(store.state.filtro.facultadFiltro.toLowerCase()) >= 0){
                            store.state.actividades.push(item);
                        }
                    }
                }); 
            }
            if(store.state.filtro.programaFiltro !== ''){
                store.state.actividades = [];
                duo = true;
                tempActividades.forEach( item => {
                    if(item.programa){
                        if(item.programa.toLowerCase().search(store.state.filtro.programaFiltro.toLowerCase()) >= 0){
                            store.state.actividades.push(item);
                        }
                    }
                });
            }
            if(store.state.actividades.length == 0){
                document.getElementById("mensaje-no-resultados").style.display = "block";
                document.getElementById("boton-mostrar-mas").style.display = "none";
                store.state.usoFiltro = true;
            }
        },
        limpiarMethod(){
            store.state.actividades =  store.state.actividadesLimpiar.sort((a, b) => parseFloat(a.fechaInicio) - parseFloat(b.fechaInicio));
            store.state.filtro.palabraClaveFiltro = '';
            store.state.filtro.tipoProgramaFiltro = '';
            store.state.filtro.categoriaFiltro = '';
            store.state.filtro.facultadFiltro = '';
            store.state.filtro.programaFiltro = '';
            store.state.ordenarVar = '';
            document.getElementById("customCheck1").checked = false;
            document.getElementById("customCheck2").checked = false;
            document.getElementById("customCheck3").checked = false;
            document.getElementById("mensaje-no-resultados").style.display = "none";
            document.getElementById("boton-mostrar-mas").style.display = "block";
            store.state.mostrarSoloCinco = true;
        }
    }
});
Vue.component('periodos',{
    template: /* html */
    `
    <div class="flex-container componente-periodos">
        <div class="Semestre">
            <div class="custom-control form-control-lg custom-checkbox">
                <input class="custom-control-input" v-on:click="periodosMethod" id="customCheck1" type="checkbox" /> 
                <label class="custom-control-label" v-on:click="periodosMethod" for="customCheck1">Semestre <span class="num">1</span></label>
            </div>
            <p>Enero 17-2020<br />
                Mayo 15-2020
            </p>
        </div>
        <div class="Semestre">
            <div class="custom-control form-control-lg custom-checkbox">
                <input class="custom-control-input" v-on:click="periodosMethod" id="customCheck2" type="checkbox" /> 
                <label class="custom-control-label" v-on:click="periodosMethod" for="customCheck2">Semestre <span class="num">2</span>
                </label>
            </div>
            <p>Agosto 15-2020<br />
            Diciembre 20-2020
            </p>
        </div>
        <div class="Semestre">
            <div class="custom-control form-control-lg custom-checkbox">
                <input class="custom-control-input" v-on:click="periodosMethod" id="customCheck3" type="checkbox" /> 
                <label class="custom-control-label" v-on:click="periodosMethod" for="customCheck3">Intersemestral</label>
            </div>
            <p>Enero 17-2020<br />
            Mayo 15-2020
            </p>
        </div>    
    </div> 
    `,
    methods: {
        periodosMethod(){
            document.getElementById("mensaje-no-resultados").style.display = "none";
            var temporalActividades = [];
            if(store.state.usoFiltro){
                temporalActividades = store.state.actividades;
            }else{
                temporalActividades = store.state.actividadesLimpiar;
            }
            store.state.actividades = [];
            var validador = false;
            if(document.getElementById("customCheck1").checked){
                temporalActividades.forEach(  item => {
                    if(item.periodo == "Semestre I"){
                        store.state.actividades.push(item);
                    }
                });
                validador = true;
            }
            if(document.getElementById("customCheck2").checked){
                temporalActividades.forEach(  item => {
                    if(item.periodo == "Semestre II"){
                        store.state.actividades.push(item);
                    }
                });
                validador = true;
            }
            if(document.getElementById("customCheck3").checked){
                temporalActividades.forEach(  item => {
                    if(item.periodo == "Intersemestral"){
                        console.log(store.state.actividades);
                        store.state.actividades.push(item);
                    }
                });
                validador = true;
            }
            if(!validador){
                store.state.actividades = store.state.actividadesLimpiar;
            }
            if(store.state.actividades.length == 0){
                document.getElementById("mensaje-no-resultados").style.display = "block";
                document.getElementById("boton-mostrar-mas").style.display = "none";
            }
        }
    }
});
Vue.component('actividades', {
    template: /*html*/
        ` 
        <div class="col-lg-8">
            <h2 id="mensaje-no-resultados" style="display: none;" class="center">No se han encontrado resultados para esta búsqueda</h2>
            <div v-if="mostrarSoloCinco">
                <template v-for="(item, key) in actividades.slice(0, 5)">
                    <div class="row Programa-especifico">


                        <div class="col-md-4 col-lg-4 Fecha">
                            <div class="row">
                                <div class="col-md-2 col-lg-2">
                                    <i class="far fa-calendar">
                                        <!--icono-->
                                    </i>
                                </div>
                                <div class="col-md-10 col-lg-10 px-5">
                                    <strong class="titulo">{{ mes(item.fechaInicio) }} {{ dia(item.fechaInicio) }} de {{ year(item.fechaInicio) }}</strong> 
                                    <span>{{ mes(item.fechaFin) }} {{ dia(item.fechaFin) }} {{ year(item.fechaFin) }}</span>
                                </div>
                            </div>
                            <div class="mt-3 txt">
                                <strong>Tipo de programa</strong> <span>{{ item.tipoPrograma }}</span><br />
                                <strong>Categoria</strong> <span>{{ item.categoria }}</span>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-8 Descripcion">
                            <p class="titulo">{{ item.nombre}}</p>
                            <strong>Fecha de inicio:</strong> <span class="txt">
                            {{ dia(item.fechaInicio) }} {{ mes(item.fechaInicio) }}, de {{ year(item.fechaInicio) }}
                            </span><br />
                            <strong>Fecha de cierre:</strong> <span class="txt">
                            {{ dia(item.fechaFin) }} {{ mes(item.fechaFin) }}, de {{ year(item.fechaFin) }}
                            </span><br />
                            <div class="row">
                                <div class="col-lg-3 Semestre_uno"><a href="">{{ item.periodo }}</a></div>
                                <div class="col-lg-3 Cerrado"><a href="">{{ estado(item.fechaFin) }}</a></div>
                            </div>
                        </div>

                        <div class="col-lg-12 caja-fp">
                            <div class="row">
                                <div class="col-lg-6">
                                    <strong>Facultad</strong> 
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial-menos-3') }" class="lista-facultad lista-menos-3" v-html="programasMethod(item.facultad)"></ul>
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial') }" class="lista-facultad lista-corta" v-html="verMasProgramasMethod(item.facultad)"></ul>
                                    <a v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial') }" class="boton-ver-mas" href="#" @click.prevent="verMas($event)">Ver más</a>
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'abierto') }" class="lista-facultad lista-larga" v-html="verMenosProgramasMethod(item.facultad)"></ul>
                                    <a v-bind:class="{ ocultar : contadorProgramas(item.facultad,'abierto') }" class="boton-ver-menos" href="#" @click.prevent="verMenos($event)">Ver menos</a>
                                </div>
                                <div class="col-lg-6">
                                    <strong>Programa</strong> 
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial-menos-3') }" class="lista-facultad lista-menos-3" v-html="programasMethod(item.programa)"></ul>
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial') }" class="lista-facultad lista-corta" v-html="verMasProgramasMethod(item.programa)"></ul>
                                    <a v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial') }" class="boton-ver-mas" href="#" @click.prevent="verMas($event)">Ver más</a>
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'abierto') }" class="lista-facultad lista-larga" v-html="verMenosProgramasMethod(item.programa)"></ul>
                                    <a v-bind:class="{ ocultar : contadorProgramas(item.programa,'abierto') }" class="boton-ver-menos" href="#" @click.prevent="verMenos($event)">Ver menos</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="row justify-content-center">
                    <input v-if="actividades.length > 5" id="boton-mostrar-mas" type="button" value="Ver más" class="btn btn-primary" @click="mostrarSoloCincoMethod(false)">
                </div>
            </div>
            <div v-else>
                <template v-for="(item, key) in actividades">
                    <div class="row Programa-especifico">
                        <div class="col-md-4 col-lg-4 Fecha">
                            <div class="row">
                                <div class="col-md-2 col-lg-2">
                                    <i class="far fa-calendar">
                                        <!--icono-->
                                    </i>
                                </div>
                                <div class="col-md-10 col-lg-10 px-5">
                                    <strong class="titulo">{{ mes(item.fechaInicio) }} {{ dia(item.fechaInicio) }} de {{ year(item.fechaInicio) }}</strong> 
                                    <span>{{ mes(item.fechaFin) }} {{ dia(item.fechaFin) }} {{ year(item.fechaFin) }}</span>
                                </div>
                            </div>
                            <div class="mt-3 txt">
                                <strong>Tipo de programa</strong> <span>{{ item.tipoPrograma }}</span><br />
                                <strong>Categoria</strong> <span>{{ item.categoria }}</span>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-8 Descripcion">
                            <p class="titulo">{{ item.contenido }}</p>
                            <strong>Fecha de inicio:</strong> <span class="txt">
                            {{ dia(item.fechaInicio) }} {{ mes(item.fechaInicio) }}, de {{ year(item.fechaInicio) }}
                            </span><br />
                            <strong>Fecha de cierre:</strong> <span class="txt">
                            {{ dia(item.fechaFin) }} {{ mes(item.fechaFin) }}, de {{ year(item.fechaFin) }}
                            </span><br />
                            <div class="row">
                                <div class="col-lg-3 Semestre_uno"><a href="">{{ item.periodo }}</a></div>
                                <div class="col-lg-3 Cerrado"><a href="">{{ estado(item.fechaFin) }}</a></div>
                            </div>
                        </div>
                        <div class="col-lg-12 caja-fp">
                            <div class="row">
                                <div class="col-lg-6">
                                    <strong>Facultad</strong> 
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial-menos-3') }" class="lista-facultad lista-menos-3" v-html="programasMethod(item.facultad)"></ul>
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial') }" class="lista-facultad lista-corta" v-html="verMasProgramasMethod(item.facultad)"></ul>
                                    <a v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial') }" class="boton-ver-mas" href="#" @click.prevent="verMas($event)">Ver más</a>
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'abierto') }" class="lista-facultad lista-larga" v-html="verMenosProgramasMethod(item.facultad)"></ul>
                                    <a v-bind:class="{ ocultar : contadorProgramas(item.facultad,'abierto') }" class="boton-ver-menos" href="#" @click.prevent="verMenos($event)">Ver menos</a>
                                </div>
                                <div class="col-lg-6">
                                    <strong>Programa</strong> 
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial-menos-3') }" class="lista-facultad lista-menos-3" v-html="programasMethod(item.programa)"></ul>
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial') }" class="lista-facultad lista-corta" v-html="verMasProgramasMethod(item.programa)"></ul>
                                    <a v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial') }" class="boton-ver-mas" href="#" @click.prevent="verMas($event)">Ver más</a>
                                    <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'abierto') }" class="lista-facultad lista-larga" v-html="verMenosProgramasMethod(item.programa)"></ul>
                                    <a v-bind:class="{ ocultar : contadorProgramas(item.programa,'abierto') }" class="boton-ver-menos" href="#" @click.prevent="verMenos($event)">Ver menos</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="row justify-content-center">
                    <input id="boton-mostrar-mas" type="button" value="Ver menos" class="btn btn-primary" @click="mostrarSoloCincoMethod(true)">
                </div>
            </div>
        </div>
        `,
    computed: {
        ...Vuex.mapState(['actividades','programas', ]),
        ...Vuex.mapState({
            mostrarSoloCinco: state => state.mostrarSoloCinco
        })
    },
    methods: {
        year(date){
            return date.substring(0, 4);
        },
        mes(date){
            switch (date.substring(5, 7)){
                case "01":
                  return "Enero";
                  break;
                case "02":
                    return "Febrero";
                    break;
                case "03":
                    return "Marzo";
                    break;
                case "04":
                    return "Marzo";
                    break;
                case "05":
                    return "Mayo";
                    break;
                case "06":
                    return "Junio";
                    break;
                case "07":
                    return "Julio";
                    break;
                case "08":
                    return "Agosto";
                    break;
                case "09":
                    return "Septiembre";
                    break;
                case "10":
                    return "Octubre";
                    break;
                case "11":
                    return "Noviembre";
                    break;
                case "12":
                    return "Diciembre";
                    break;
              }
        },
        dia(date){
            return date.substring(8,10);
        },
        estado(date){
            if(estadoFunction(date)){
                return "Abierto";
            }else{
                return "Cerrado";
            }
        },
        programasMethod(programas){
           if(programas){
               var edicionString = programas.replaceAll(";", "</li><li>");
               return "<li>" + edicionString + "</li>";
           }  
        },
        verMasProgramasMethod(programas){
            if(programas){
                var edicionString = programas.replaceAll(";", "</li><li>");
                return "<li>" + edicionString + "</li>";
            }  
        },
        verMenosProgramasMethod(programas){
            if(programas){
                var edicionString = programas.replaceAll(";", "</li><li>");
                return "<li>" + edicionString + "</li>";
            }  
        },
        mostrarSoloCincoMethod(e){
            this.$store.commit('mostrarSoloCincoMutation', e);
        },
        contadorProgramas(programas,estado){
            if((programas.match(/;/g) || []).length > 3 && estado == 'inicial'){
                return false;
            }else if((programas.match(/;/g) || []).length < 3 && estado == 'inicial'){
                return true;
            }
            else if((programas.match(/;/g) || []).length < 3 && estado == 'inicial-menos-3'){
                return false;
            }else{
                return true;
            }
        },
        verMas(event){
            event.target.parentElement.getElementsByClassName("lista-corta")[0].style.display = "none";
            event.target.parentElement.getElementsByClassName("boton-ver-mas")[0].style.display = "none";
            event.target.parentElement.getElementsByClassName("lista-larga")[0].style.display = "block";
            event.target.parentElement.getElementsByClassName("boton-ver-menos")[0].style.display = "block";
        },
        verMenos(event){
            event.target.parentElement.getElementsByClassName("lista-larga")[0].style.display = "none";
            event.target.parentElement.getElementsByClassName("boton-ver-menos")[0].style.display = "none";
            event.target.parentElement.getElementsByClassName("lista-corta")[0].style.display = "block";
            event.target.parentElement.getElementsByClassName("boton-ver-mas")[0].style.display = "block";
        }
    }
});

//VueEx
const store = new Vuex.Store({
    state: {
        actividadesSegmentadas: [],
        actividades: [],
        actividadesLimpiar: [],
        usoFiltro: false,
        programas: [],
        filtro: {
            palabraClaveFiltro: '',
            tipoProgramaFiltro: '',
            categoriaFiltro: '',
            facultadFiltro: '',
            programaFiltro: ''
        },
        ordenarVar: '',
        ordenDeActivades: true, //true es ascedente,
        mostrarSoloCinco: true,
    },
    mutations: {
        llamarJsonMutation(state, llamarJsonAction){
            //actividades segmentadas
            if(window.location.pathname.toLowerCase().search("estudiantes") >= 0){
                llamarJsonAction.Actividades.forEach( item => {
                    if(item.segmento.search("Estudiante") >= 0){
                        state.actividadesSegmentadas.push(item);
                    }
                });
            }else if(window.location.pathname.toLowerCase().search("profesores") >= 0){
                llamarJsonAction.Actividades.forEach( item => {
                    if(item.segmento.search("profesor") >= 0){
                        state.actividadesSegmentadas.push(item);
                    }
                });
            }else if(window.location.pathname.toLowerCase().search("funcionarios") >= 0){
                llamarJsonAction.Actividades.forEach( item => {
                    if(item.segmento.search("funcionario") >= 0){
                        state.actividadesSegmentadas.push(item);
                    }
                });
            }

            //filtro por eventos cerrados y abiertos
            state.actividadesSegmentadas.forEach( item => {
                if(estadoFunction(item.fechaFin)){
                    state.actividades.push(item);
                }
            });

            state.actividades = state.actividades.sort((a, b) => parseFloat(a.fechaInicio) - parseFloat(b.fechaInicio));
            state.actividadesLimpiar = state.actividades;
        },
        ordenarMutation(state, value){
            state.ordenarVar = value
        },
        mostrarSoloCincoMutation(state, value){
            state.mostrarSoloCinco = value
        }
    },
    actions: {
        llamarJson: async function({ commit }){
            //const data = await fetch('calendario-2021-prueba.json');
            const data = await fetch('/Documentos/Calendario-academico/calendario-2021-json.json');
            const dataJson = await data.json();
            commit('llamarJsonMutation', dataJson);
        }
    }
});

//Vue
new Vue({
    el: '#caja-vue',
    store: store,
    created(){
        this.$store.dispatch('llamarJson');
    },
});