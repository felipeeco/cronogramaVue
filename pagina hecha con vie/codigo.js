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
    let sinEspacios = s.replaceAll(" ", "");
    let a=["á","é","í","ó","ú","a","e","i","o","u"];
    let str="";
    for(let i=0; i<sinEspacios.length; i++){
        let tmp = sinEspacios[i];
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
            <select class="form-control" v-model="filtro.tipoProgramaFiltro" @change="listaProgramas()">
                <option disabled value="">Tipo de programa</option>
                <option>Pregrado</option>
                <option>Posgrado</option>
            </select>
            </div>
            <div class="form-group">
            <select class="form-control" v-model="filtro.categoriaFiltro" @change="listaProgramas()">
                <option disabled value="">Categoría</option>
                <option class="ct ct-funcionario">Cierre académico</option>
                <option class="">Comité de idiomas</option>
                <option class="ct ct-funcionario">Contratación</option>
                <option class="">Exámenes finales</option>
                <option class="">Homologaciones, reconocimientos y validaciones</option>
                <option class="">Inicio y finalización de clases</option>
                <option class="">Otras actividades de la vida universitaria</option>
                <option class="ct ct-estudiante">Pago de matrículas</option>
                <option class="">Proceso de inducción</option>
                <option class="ct ct-funcionario">Proceso de Planeación y Oferta Académica</option>
                <option class="ct ct-profesores">Profesores</option>
                <option class="">Publicación de grupos cancelados</option>
                <option class="ct ct-funcionario">Recesos y vacaciones</option>
                <option class="ct ct-funcionario">Registro de asignaturas</option>
                <option class="">Reporte de notas</option>
                <option class="">Reserva de cupo, re activaciones de cupo y reintegros</option>
                <option class="">Retiro de asignaturas</option>
            </select>
            </div>
            <div class="form-group">
            <select class="form-control" v-model="filtro.facultadFiltro" @change="listaProgramas()">
                <option disabled value="">Facultad</option>
                <option>Escuela de Administración</option>
                <option>Escuela de Medicina y Ciencias de la Salud</option>
                <option>Escuela de Ciencias Humanas</option>
                <option>Facultad de Economía</option>
                <option>Facultad de Jurisprudencia</option>
                <option>Facultad de Estudios Internacionales, Políticos y Urbanos</option>
                <option>Facultad de Ciencias Naturales</option>
                <option>Facultad de Creación</option>
                <option>Escuela de Ingeniería Ciencia y Tecnología</option>
            </select>
            </div>
            <div class="form-group">
                <select class="form-control" v-model="filtro.programaFiltro">
                    <option disabled value="">Programa</option>
                    <template v-for="(item, key) in programas">
                        <option>{{ item.programa }}</option>
                    </template>
                </select>
            </div>
            <div class="form-group">
                <p><a type="button" @click="mostrarRangoDeFechas()" class="Fecha">Rango de fechas</a></p>
                <div class="row" id="rango-fechas">
                    <div class="col">
                        <div>
                        <div class="card card-body">
                            <p>Fecha inicial</p>
                            <input class="form-control" id="example-date-input" type="date" v-model="filtro.fechaInicial" />
                            <p id="fecha-inicial-alerta">Fecha inicial no puede estar vacio</p>
                            <p>Fecha final</p>
                            <input class="form-control" id="example-date-input" type="date" v-model="filtro.fechaFinal" />
                            <p id="fecha-final-alerta">Fecha final no puede estar vacio</p>
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
        ...Vuex.mapState(['filtro','programas'])
    },
    methods: {
        filtroMethod(){
            document.getElementById("mensaje-no-resultados").style.display = "none";
            document.getElementById("fecha-inicial-alerta").style.display = "none";
            document.getElementById("fecha-final-alerta").style.display = "none";
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
                validarDuo();
                store.state.actividades = [];
                duo = true;
                tempActividades.forEach( item => {
                    if(item.contenido){
                        if(as(item.contenido.toLowerCase()).search(as(store.state.filtro.palabraClaveFiltro.toLowerCase())) >= 0){
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
                        if(as(item.categoria.toLowerCase()) == as(store.state.filtro.categoriaFiltro.toLowerCase())){
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
                        if(as(item.facultad.toLowerCase()).search(as(store.state.filtro.facultadFiltro.toLowerCase())) >= 0){
                            store.state.actividades.push(item);
                        }
                    }
                }); 
            }
            if(store.state.filtro.programaFiltro !== ''){
                validarDuo();
                store.state.actividades = [];
                duo = true;
                tempActividades.forEach( item => {
                    if(item.programa){
                        if(as(item.programa.toLowerCase()).search(as(store.state.filtro.programaFiltro.toLowerCase())) >= 0){
                            store.state.actividades.push(item);
                        }
                    }
                });
            }
            if(store.state.filtro.fechaInicial !== '' || store.state.filtro.fechaFinal !== ''){
                if(store.state.filtro.fechaInicial == '' && store.state.filtro.fechaFinal !== ''){
                    document.getElementById("fecha-inicial-alerta").style.display = "block";
                }else if(store.state.filtro.fechaInicial !== '' && store.state.filtro.fechaFinal == ''){
                    document.getElementById("fecha-final-alerta").style.display = "block";
                }else if(store.state.filtro.fechaInicial !== '' && store.state.filtro.fechaFinal !== ''){
                    validarDuo();
                    store.state.actividades = [];
                    duo = true;
                    tempActividades.forEach( item => {
                        var fechaInicialFiltro = new Date(store.state.filtro.fechaInicial);
                        var fechaFinalFiltro = new Date(store.state.filtro.fechaFinal);
                        var fechaInicialExcel = new Date(item.fechaInicio);
                        var fechaFinalExcel = new Date(item.fechaFin);

                        if((fechaInicialFiltro <=  fechaFinalExcel) && (fechaInicialExcel <=  fechaFinalFiltro)){
                            store.state.actividades.push(item);
                        }
                    }); 
                }
            }
            if(store.state.actividades.length == 0){
                document.getElementById("mensaje-no-resultados").style.display = "block";
                document.getElementById("boton-mostrar-mas").style.display = "none";
                store.state.usoFiltro = true;
            }
        },
        listaProgramas(){
            var tempProgramas = store.state.programasLimpiar;
            var tempActividadesP = store.state.actividadesLimpiar;
            var duo = false;
            function validarDuo(){
                if(duo){
                    tempProgramas = store.state.programas;
                }else{
                    tempProgramas = store.state.programasLimpiar;
                }
            }
            if(store.state.filtro.tipoProgramaFiltro !== ''){
                validarDuo();
                store.state.programas = [];
                duo = true;
                tempProgramas.forEach(item => {
                    if(item.nivel){
                        if(store.state.filtro.tipoProgramaFiltro == "Pregrado"){
                            if(item.nivel.toLowerCase() == "pregrado"){
                                store.state.programas.push(item);
                            }
                        }else if(store.state.filtro.tipoProgramaFiltro == "Posgrado"){
                            if(item.nivel.toLowerCase() != "pregrado"){
                                store.state.programas.push(item);
                            }
                        }
                    }
                });
            }
            if(store.state.filtro.categoriaFiltro !== ''){
                validarDuo();
                store.state.programas = [];
                duo = true;                
                tempProgramas.forEach( itemPrograma => {
                    var result = false;
                    tempActividadesP.forEach( item => {
                        if(item.categoria && item.programa){
                            if(as(item.categoria.toLowerCase()) == as(store.state.filtro.categoriaFiltro.toLowerCase())){
                                if(as(item.programa.toLowerCase()).search(as(itemPrograma.programa.toLowerCase())) >= 0){
                                    result = true;
                                }
                            }
                        }
                    });
                    if(result){
                        store.state.programas.push(itemPrograma);
                    }
                });
            }
            if(store.state.filtro.facultadFiltro !== ''){
                validarDuo();
                store.state.programas = [];
                duo = true;        
                tempProgramas.forEach( itemPrograma => {
                    if(as(itemPrograma.facultad.toLowerCase()) == as(store.state.filtro.facultadFiltro.toLowerCase())){
                        store.state.programas.push(itemPrograma);
                    }
                });
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
            store.state.filtro.fechaInicial = '';
            store.state.filtro.fechaFinal = '';
            document.getElementById("customCheck1").checked = false;
            document.getElementById("customCheck2").checked = false;
            document.getElementById("customCheck3").checked = false;
            document.getElementById("mensaje-no-resultados").style.display = "none";
            document.getElementById("fecha-inicial-alerta").style.display = "none";
            document.getElementById("fecha-final-alerta").style.display = "none";
            document.getElementById("rango-fechas").style.display = "none";
            document.getElementById("boton-mostrar-mas").style.display = "block";
            store.state.mostrarSoloCinco = true;
            store.state.programas = store.state.programasLimpiar;
        },
        mostrarRangoDeFechas(){
            let divRangoFechas = document.getElementById("rango-fechas");
            if (window.getComputedStyle(divRangoFechas).display === "none"){
                divRangoFechas.style.display = "block";
            }else{
                divRangoFechas.style.display = "none";
            }
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
                                <strong>Categoria</strong> <span>{{ item.categoria }}</span><br />
                                <strong>Facultad</strong>
                                    <div class="caja-facultad">
                                    
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial-menos-3') }" class="lista-facultad lista-menos-3" v-html="programasMethod(item.facultad)"></ul>
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial') }" class="lista-facultad lista-corta" v-html="verMasProgramasMethod(item.facultad)"></ul>
                                        <a v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial') }" class="boton-ver-mas" href="#" @click.prevent="verMas($event)">Ver más</a>
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'abierto') }" class="lista-facultad lista-larga" v-html="verMenosProgramasMethod(item.facultad)"></ul>
                                        <a v-bind:class="{ ocultar : contadorProgramas(item.facultad,'abierto') }" class="boton-ver-menos" href="#" @click.prevent="verMenos($event)">Ver menos</a>
                                        
                                    </div> 
                                    <br />
                                <strong>Programa</strong> 
                                    <div class="caja-programas">
                                    
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial-menos-3') }" class="lista-facultad lista-menos-3" v-html="programasMethod(item.programa)"></ul>
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial') }" class="lista-facultad lista-corta" v-html="verMasProgramasMethod(item.programa)"></ul>
                                        <a v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial') }" class="boton-ver-mas" href="#" @click.prevent="verMas($event)">Ver más</a>
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'abierto') }" class="lista-facultad lista-larga" v-html="verMenosProgramasMethod(item.programa)"></ul>
                                        <a v-bind:class="{ ocultar : contadorProgramas(item.programa,'abierto') }" class="boton-ver-menos" href="#" @click.prevent="verMenos($event)">Ver menos</a>
                                    
                                    </div>
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
                                <div class="col-lg-3 Semestre_uno"><div>{{ item.periodo }}</div></div>
                                <div class="col-lg-3 Cerrado"><div>{{ estado(item.fechaFin) }}</div></div>
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
                                <strong>Categoria</strong> <span>{{ item.categoria }}</span><br />
                                <strong>Facultad</strong>
                                    <div class="caja-facultad">
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial-menos-3') }" class="lista-facultad lista-menos-3" v-html="programasMethod(item.facultad)"></ul>
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial') }" class="lista-facultad lista-corta" v-html="verMasProgramasMethod(item.facultad)"></ul>
                                        <a v-bind:class="{ ocultar : contadorProgramas(item.facultad,'inicial') }" class="boton-ver-mas" href="#" @click.prevent="verMas($event)">Ver más</a>
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.facultad,'abierto') }" class="lista-facultad lista-larga" v-html="verMenosProgramasMethod(item.facultad)"></ul>
                                        <a v-bind:class="{ ocultar : contadorProgramas(item.facultad,'abierto') }" class="boton-ver-menos" href="#" @click.prevent="verMenos($event)">Ver menos</a>
                                    </div> 
                                    <br />
                                <strong>Programa</strong> 
                                    <div class="caja-programas">
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial-menos-3') }" class="lista-facultad lista-menos-3" v-html="programasMethod(item.programa)"></ul>
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial') }" class="lista-facultad lista-corta" v-html="verMasProgramasMethod(item.programa)"></ul>
                                        <a v-bind:class="{ ocultar : contadorProgramas(item.programa,'inicial') }" class="boton-ver-mas" href="#" @click.prevent="verMas($event)">Ver más</a>
                                        <ul v-bind:class="{ ocultar : contadorProgramas(item.programa,'abierto') }" class="lista-facultad lista-larga" v-html="verMenosProgramasMethod(item.programa)"></ul>
                                        <a v-bind:class="{ ocultar : contadorProgramas(item.programa,'abierto') }" class="boton-ver-menos" href="#" @click.prevent="verMenos($event)">Ver menos</a>
                                    </div>
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
                                <div class="col-lg-3 Semestre_uno"><div>{{ item.periodo }}</div></div>
                                <div class="col-lg-3 Cerrado"><div>{{ estado(item.fechaFin) }}</div></div>
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
        ...Vuex.mapState(['actividades']),
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
            if(programas){
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
        programasLimpiar: [],
        filtro: {
            palabraClaveFiltro: '',
            tipoProgramaFiltro: '',
            categoriaFiltro: '',
            facultadFiltro: '',
            programaFiltro: '',
            fechaInicial: '',
            fechaFinal: '',
        },
        ordenarVar: '',
        ordenDeActivades: true, //true es ascedente,
        mostrarSoloCinco: true,
    },
    mutations: {
        llamarJsonMutation(state, llamarJsonAction){
            //actividades segmentadas
            if(window.location.pathname.toLowerCase().search("estudiantes") >= 0){
                var elements = document.getElementsByClassName("ct-estudiante");
                for (var i = 0, len = elements.length; i < len; i++) {
                    elements[i].style.display = "block";
                }
                llamarJsonAction.Actividades.forEach( item => {
                    if(item.segmento.search("Estudiante") >= 0){
                        state.actividadesSegmentadas.push(item);
                    }
                });
            }else if(window.location.pathname.toLowerCase().search("profesores") >= 0){
                var elements = document.getElementsByClassName("ct-profesores");
                for (var i = 0, len = elements.length; i < len; i++) {
                    elements[i].style.display = "block";
                }
                llamarJsonAction.Actividades.forEach( item => {
                    if(item.segmento.search("profesor") >= 0){
                        state.actividadesSegmentadas.push(item);
                    }
                });
            }else if(window.location.pathname.toLowerCase().search("funcionarios") >= 0){
                var elements = document.getElementsByClassName("ct-funcionario");
                for (var i = 0, len = elements.length; i < len; i++) {
                    elements[i].style.display = "block";
                }
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
        llamarJsonProgramas(state, Json){
            let programasOrdenados = Json.programas;
            programasOrdenados.sort(function(a, b){
                if(a.programa < b.programa) { return -1; }
                if(a.programa > b.programa) { return 1; }
                return 0;
            });

            state.programas = programasOrdenados;
            state.programasLimpiar = programasOrdenados;
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
        },
        jsonProgramas: async function({ commit }){
            const dataProgramas = await fetch('/Documentos/Calendario-academico/programas.json');
            //const dataProgramas = await fetch('programas.json');
            const dataJsonProgramas = await dataProgramas.json();
            commit('llamarJsonProgramas', dataJsonProgramas);
        }
    }
});

//Vue
new Vue({
    el: '#caja-vue',
    store: store,
    created(){
        this.$store.dispatch('llamarJson');
        this.$store.dispatch('jsonProgramas');
    },
});