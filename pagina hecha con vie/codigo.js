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
                                <strong class="titulo">{{ mes(item.fechaInicio) }} {{ dia(item.fechaInicio) }}</strong> 
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
        </div>
        `,
    computed: {
        ...Vuex.mapState(['actividades','programas']),
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
        }
    }
});

Vue.component('ordenar',{
    template: /*html*/
        `
        <select class="form-control" @change="ordenarMethod($event)" id="exampleFormControlSelect1">
            <option selected="selected" value="orden-ascendente">Orden ascendente (fecha de inicio)</option>
            <option value="orden-descendente">Orden descendente (fecha de inicio)</option>
        </select>
        `,
        methods: {
            ordenarMethod(event){
                if(event.target.value == "orden-ascendente"){
                    store.state.actividades = store.state.actividades.sort((a, b) => parseFloat(a.fechaInicio) - parseFloat(b.fechaInicio));
                }else if(event.target.value == "orden-descendente"){
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
                    <input v-on:click="filtroMethod" class="btn btn-primary" type="submit" value="Buscar" />
                </div>
                <div class="col-md-6">
                    <input class="btn btn-primary Limpiar" type="submit" value="Limpiar" />
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
            if(store.state.filtro.palabraClaveFiltro !== ''){
                console.log(as(store.state.filtro.palabraClaveFiltro));
            }
        }
    }
});

//VueEx
const store = new Vuex.Store({
    state: {
        actividadesPrimerFiltro: [],
        actividades: [],
        programas: [],
        filtro: {
            palabraClaveFiltro: '',
            tipoProgramaFiltro: '',
            categoriaFiltro: '',
            facultadFiltro: '',
            programaFiltro: ''
        }
    },
    mutations: {
        llamarJsonMutation(state, llamarJsonAction){

            state.programas = llamarJsonAction.BD_programas;

            //filtro por eventos cerrados y abiertos
            llamarJsonAction.Nueva_estructura_proveedor.forEach( item => {
                if(estadoFunction(item.fechaFin)){
                    state.actividadesPrimerFiltro.push(item);
                }
            });

            state.actividades = state.actividadesPrimerFiltro.sort((a, b) => parseFloat(a.fechaInicio) - parseFloat(b.fechaInicio));
        }
    },
    actions: {
        llamarJson: async function({ commit }){
            const data = await fetch('calendario-2021-prueba.json');
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
    }
});