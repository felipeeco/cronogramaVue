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
                                <strong>Facultad</strong> <span v-html="programasMethod(item.facultad)"></span><br />
                                <strong>Programa</strong> 
                                <span v-html="programasMethod(item.programa)"></span><br />
                                <strong>Categoria</strong> <span>{{ item.categoria }}</span>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-8 Descripcion">
                            <p class="titulo">{{ item.contenido }}</p>
                            <!--
                            <p class="txt">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &#39;Content here, content here&#39;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &#39;lorem ipsum&#39; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                            -->
                            <!--
                            <i class="fas fa-map-marker-alt">
                                
                            </i>
                            -->
                            <!--
                            <strong>Lugar:</strong> <span class="txt">Universidad del Rosario, Sede, Claustro, Aula Mutis</span><br />
                            <i class="far fa-calendar">
                                
                            </i>
                            -->
                            <strong>Fecha de inicio:</strong> <span class="txt">
                            {{ dia(item.fechaInicio) }} {{ mes(item.fechaInicio) }}, de {{ year(item.fechaInicio) }}
                            </span><br />
                            <strong>Fecha de cierre:</strong> <span class="txt">
                            {{ dia(item.fechaFin) }} {{ mes(item.fechaFin) }}, de {{ year(item.fechaFin) }}
                            </span><br />
                            <!--
                            <i class="far fa-clock">
                            
                            </i>
                    
                            <strong>Hora:</strong> <span class="txt">De 8:00 a.m. a 12:30 p.m</span>
                            -->
                            <div class="row">
                                <div class="col-lg-3 Semestre_uno"><a href="">{{ item.periodo }}</a></div>
                                <div class="col-lg-3 Cerrado"><a href="">{{ estado(item.fechaFin) }}</a></div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="row justify-content-center">
                    <input id="boton-mostrar-mas" type="button" value="Ver más" class="btn btn-primary" @click="mostrarSoloCincoMethod(false)">
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
                                <strong>Facultad</strong> <span v-html="programasMethod(item.facultad)"></span><br />
                                <strong>Programa</strong> 
                                <span v-html="programasMethod(item.programa)"></span><br />
                                <strong>Categoria</strong> <span>{{ item.categoria }}</span>
                            </div>
                        </div>
                        <div class="col-md-8 col-lg-8 Descripcion">
                            <p class="titulo">{{ item.contenido }}</p>
                            <!--
                            <p class="txt">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &#39;Content here, content here&#39;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for &#39;lorem ipsum&#39; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                            -->
                            <!--
                            <i class="fas fa-map-marker-alt">
                                
                            </i>
                            -->
                            <!--
                            <strong>Lugar:</strong> <span class="txt">Universidad del Rosario, Sede, Claustro, Aula Mutis</span><br />
                            <i class="far fa-calendar">
                                
                            </i>
                            -->
                            <strong>Fecha de inicio:</strong> <span class="txt">
                            {{ dia(item.fechaInicio) }} {{ mes(item.fechaInicio) }}, de {{ year(item.fechaInicio) }}
                            </span><br />
                            <strong>Fecha de cierre:</strong> <span class="txt">
                            {{ dia(item.fechaFin) }} {{ mes(item.fechaFin) }}, de {{ year(item.fechaFin) }}
                            </span><br />
                            <!--
                            <i class="far fa-clock">
                            
                            </i>
                    
                            <strong>Hora:</strong> <span class="txt">De 8:00 a.m. a 12:30 p.m</span>
                            -->
                            <div class="row">
                                <div class="col-lg-3 Semestre_uno"><a href="">{{ item.periodo }}</a></div>
                                <div class="col-lg-3 Cerrado"><a href="">{{ estado(item.fechaFin) }}</a></div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="row justify-content-center">
                    <input id="boton-mostrar-mas" type="button" value="Ver menos" class="btn btn-primary" @click="mostrarSoloCincoMethod(true)">
                </div>
            </div>
            <!--
            <div class="row justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
            -->
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
            return date.substring(8);
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
            return programas.replaceAll(";", "<br />");
           }  
        },
        mostrarSoloCincoMethod(e){
            this.$store.commit('mostrarSoloCincoMutation', e);
        }
    }
});
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
              this.$store.commit('ordenarMutation', e.target.value);
               if(e.target.value == "Orden ascendente (fecha de inicio)"){
                    store.state.actividades = store.state.actividades.sort((a, b) => parseFloat(a.fechaInicio) - parseFloat(b.fechaInicio));
                }else if(e.target.value == "Orden descendente (fecha de inicio)"){
                    store.state.actividades = store.state.actividades.sort((a, b) => parseFloat(b.fechaInicio) - parseFloat(a.fechaInicio));
                }
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
            store.state.actividades = [];
            var validador = false;
            if(document.getElementById("customCheck1").checked){
                store.state.actividadesSinFiltro.forEach(  item => {
                    if(item.periodo == "Semestre I"){
                        store.state.actividades.push(item);
                    }
                });
                validador = true;
            }
            if(document.getElementById("customCheck2").checked){
                store.state.actividadesSinFiltro.forEach(  item => {
                    if(item.periodo == "Semestre II"){
                        store.state.actividades.push(item);
                    }
                });
                validador = true;
            }
            if(document.getElementById("customCheck3").checked){
                store.state.actividadesSinFiltro.forEach(  item => {
                    if(item.periodo == "Intersemestral"){
                        store.state.actividades.push(item);
                    }
                });
                validador = true;
            }
            if(!validador){
                store.state.actividades = store.state.actividadesLimpiar;
            }
        }
    }
});

//VueEx
const store = new Vuex.Store({
    state: {
        actividadesSegmentadas: [],
        actividadesSinFiltro: [],
        actividades: [],
        actividadesLimpiar: [],
        programas: [],
        filtro: {
            palabraClaveFiltro: '',
            tipoProgramaFiltro: '',
            categoriaFiltro: '',
            facultadFiltro: '',
            programaFiltro: ''
        },
        ordenarVar: '',
        mostrarSoloCinco: true,
    },
    mutations: {
        llamarJsonMutation(state, llamarJsonAction){
            //programas
            state.programas = llamarJsonAction.BD_programas;

            //testeo
            //console.log(llamarJsonAction.Nueva_estructura_proveedor);

            //actividades segmentadas
            if(window.location.pathname.toLowerCase().search("estudiantes") >= 0){
                llamarJsonAction.Nueva_estructura_proveedor.forEach( item => {
                    if(item.segmento.search("Estudiante") >= 0){
                        state.actividadesSegmentadas.push(item);
                    }
                });
            }else if(window.location.pathname.toLowerCase().search("profesores") >= 0){
                llamarJsonAction.Nueva_estructura_proveedor.forEach( item => {
                    if(item.segmento.search("profesor") >= 0){
                        state.actividadesSegmentadas.push(item);
                    }
                });
            }else if(window.location.pathname.toLowerCase().search("funcionarios") >= 0){
                llamarJsonAction.Nueva_estructura_proveedor.forEach( item => {
                    if(item.segmento.search("funcionario") >= 0){
                        state.actividadesSegmentadas.push(item);
                    }
                });
            }

            //actividades sin filtro
            state.actividadesSinFiltro = state.actividadesSegmentadas;

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
    data() {
        return {
          page: 1,
          list: [],
        };
      },
    store: store,
    methods: {
        infiniteHandler($state) {
          axios.get(api, {
            params: {
              page: this.page,
            },
          }).then(({ data }) => {
            if (data.hits.length) {
              this.page += 1;
              this.list.push(...data.hits);
              $state.loaded();
            } else {
              $state.complete();
            }
          });
        },
      },
    created(){
        this.$store.dispatch('llamarJson');
    }
});