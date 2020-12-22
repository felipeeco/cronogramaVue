//VueEx
const store = new Vuex.Store({
    state: {
        actividades: [],
        programas: []
    },
    mutations: {
        llamarJsonMutation(state, llamarJsonAction){
            state.actividades = llamarJsonAction;       
        }
    },
    actions: {
        llamarJson: function(){
            axios.get('/Documentos/Calendario-academico/calendario-2021-prueba.json')
            .then(response => {
                this.actividades = response.data.Nueva_estructura_proveedor;
                this.programas = response.data.BD_programas;
                console.log("cambio 3");
                console.log(this.actividades);
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
        }
    }
});

//Vue
new Vue({
    el: '#calendario-vue',
    store: store
});

//funciones
function calcularMes(fecha){
    fecha.substr(0, 2)
}