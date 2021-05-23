<template>
    <div>
        <Nav />
        <div class="container mt-5" v-if="user">
            <router-link to="/users" class="btn btn-primary">Volver</router-link>
            <h2 class="text-center">Detalles de usuario</h2>
            <div class="card p-5">
                <h4>Nombre de usuario:<span class="text-muted">{{ user.name}}</span></h4>
                <h4>Email:<span class="text-muted">{{ user.email}}</span></h4>
                <h4>Rol:<span class="text-muted">{{ user.rol.key}}</span></h4>
                <h4>Creado:<span class="text-muted">{{ user.created_at}}</span></h4>
                <h4>Última actualización:<span class="text-muted">{{ user.updated_at}}</span></h4>
            </div>
        </div>
        <div class="container mt-5" v-if="notFound">
            <h1>404 Página no encontrada</h1>
        </div>
    </div>
</template>

<script>
    import Nav from "../components/Nav";
    import axios from "axios";
    export default {
        components: {
            Nav,
        },
        created() {
            this.getUser();
        },
        data() {
            return {
                user: null,
                notFound: false
            }
        },
        methods: {
            getUser() {
                axios.get(`api/user/${this.$route.params.id}`)
                    .then((res) => {
                        this.notFound = false;
                        this.user = res.data
                    }).catch((err)=>{
                        this.notFound = true;
                    })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>