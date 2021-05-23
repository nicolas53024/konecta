import axios from 'axios';
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://konecta.test/';
// local state
const state = {
    isAuthenticated: false,
    user: null,
};

const getters = {
    autenticado(state) {
        return state.user != null
    },
    isAdmin(state) {
        return state.user.rol.key === 'admin'
    }
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
};

const actions = {
    login({ dispatch, commit }, credentials) {

        return axios.post('api/auth/login', credentials).then((res) => {
            Cookies.set("token", res.data.access_token);
            commit('SET_USER', res.data.user);
            localStorage.setItem('usuario', JSON.stringify(res.data.user))
        });

    },
    async logout({ dispatch }) {
        await axios.post('api/auth/logout');
        localStorage.removeItem('usuario')
        Cookies.remove('token');

    },
    getUser({ commit }) {
        if (Cookies.get("token")) {
            let token = Cookies.get("token");
            if (localStorage.getItem('usuario')) {
                commit('SET_USER', JSON.parse(localStorage.getItem('usuario')));
                return true;
            }
            axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
            axios.get('api/auth/user').then((res) => {
                localStorage.setItem('usuario', JSON.stringify(res.data))
                commit('SET_USER', res.data);
                commit('SET_AUTHENTICATED', true);
            }).catch(() => {
                commit('SET_USER', null);
                commit('SET_AUTHENTICATED', false);
            })
        }
        return false


    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};