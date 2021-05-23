<template>
    <div>
        <Nav />
        <div class="container mt-3">
            <h3 class="text-center">Usuarios</h3>
            <div class="row">
                <div class="col-7">
                    <h4>Lista de usuarios</h4>
                    <search-component @getUsers="getUsers"></search-component>
                    <ul class="list-group" v-if="users.length">
                        <li class="list-group-item" :key="user.id" v-for="user in users">
                            <span class="lead">{{ user.name }}</span>
                            <router-link
                            :to="{name: 'usersDetail', params:{id: user.id }}"
                             class="btn btn-sm btn-success float-right mx-2 px-3">
                                        Ver
                            </router-link>
                            <button class="btn btn-sm btn-danger float-right mx-2" @click="confirmarEliminar(user.id)">
                                        Eliminar
                                      </button>
                            <button @click="currentUser = user" class="btn btn-sm btn-warning float-right">Editar</button>
                        </li>
                    </ul>
                    <ul class="list-group" v-if="!users.length">
                        <h5>No hay usuarios para la busqueda</h5>
                    </ul>
                    <v-pagination v-if="users.length" v-model="page" class="mt-3" :page-count="total" :classes="bootstrapPaginationClasses"></v-pagination>
                </div>
                <div class="col-5">
                    <user-form ref="form" @refreshData="refreshData" :user="currentUser"></user-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Nav from "../components/Nav";
    import axios from "axios";
    import vPagination from "vue-plain-pagination";
    import SearchComponent from '../components/SearchComponent.vue';
    import UserForm from "../components/UserForm";
    export default {
        components: {
            Nav,
            vPagination,
            SearchComponent,
            UserForm
        },
        created() {
            this.getUsers();
        },
        data() {
            return {
                users: [],
                currentUser: null,
                total: 0,
                page: 1,
                bootstrapPaginationClasses: {
                    ul: "pagination small",
                    li: "page-item",
                    liActive: "active",
                    liDisable: "disabled",
                    button: "page-link",
                },
            };
        },
        methods: {
            getUsers(params = null) {
                let url = `api/user?page=${this.page}`;
                if (params) {
                    url = `api/user?${params.campoBusqueda}=${params.contiene}`
                }
                axios.get(url).then((res) => {
                    this.users = res.data.data;
                    this.total = res.data.last_page;
                });
            },
            refreshData(model, method) {
                if (method === "post") {
                    this.users.unshift(model);
                } else {
                    this.getUsers();
                }
            },
            confirmarEliminar(id) {
                this.$swal.fire({
                    title: 'Esta seguro de eliminar el usuario?',
                    showCancelButton: true,
                    confirmButtonText: `Borrar`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.eliminar(id)
                    }
                })
            },
            eliminar(id) {
                axios
                    .delete(`api/user/${id}`)
                    .then((res) => {
                        this.users = this.users.filter((user) => user.id != id);
                        this.$refs.form.limpiar();
                        this.$swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Usuario Eliminado con éxito",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((err) => {
                        this.$swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "No se pudo eliminar el registro",
                        });
                    });
            },
        },
        watch: {
            page: function(newVal, oldVal) {
                this.getUsers(null, null);
            },
        },
    };
</script>

<style lang="scss" scoped>

</style>