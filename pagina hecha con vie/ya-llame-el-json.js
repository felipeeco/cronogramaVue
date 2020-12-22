//componentes
Vue.component('actividades', {
    template: /*html*/
        `  <div>
            <h1>Hello friend</h1>
                <ul v-for="item of actividades">
                    <li>{{ item.name }}</li>
                </ul>
            </div>
        `,
    computed: {
        ...Vuex.mapState(['actividades'])
    },
    methods: {
        ...Vuex.mapActions(['llamarJson'])
    }
});

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
        llamarJson: async function({ commit }){
            const data = await fetch('https://jsonplaceholder.typicode.com/users');
            const dataJson = await data.json();
            commit('llamarJsonMutation', dataJson);
        }
    }
});

//Vue
new Vue({
    el: '#caja-vue',
    store: store,
    created() {
        this.$store.dispatch('llamarJson');
      }
});