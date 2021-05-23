import Vue from 'vue'
import VueRouter from 'vue-router';
import store from '../store'

Vue.use(VueRouter);


const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/clients',
        name: 'clients',
        component: () =>
            import ('../views/Clients.vue'),
        meta: { auth: true }
    },
    {
        path: '/users',
        name: 'users',
        component: () =>
            import ('../views/Users.vue'),
        meta: { auth: true },
        beforeEnter: (to, from, next) => {
            if (!store.getters["auth/isAdmin"]) {
                next('/clients')
            }
            next()
        }
    },
    {
        path: '/users/:id',
        name: 'usersDetail',
        component: () =>
            import ('../views/UserDetail.vue'),
        meta: { auth: true }
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        if (!store.getters["auth/autenticado"]) next('/');
        next()

    } else {
        next()
    }
})

export default router