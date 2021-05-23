<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link to="/" class="navbar-brand">Konecta App</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/clients" class="nav-link" :class="{'active':currentPath('/clients')}">Clientes</router-link>
          <router-link to="/users" class="nav-link" :class="{'active':currentPath('/users')}" v-if="isAdmin">Usuarios</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{user.email}}</em>
            </template>
            <b-dropdown-item href="#"  >nombre:{{user.name}}</b-dropdown-item>
            <b-dropdown-item href="#"  >rol:{{user.rol.key}}</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="salir()" >Salir</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  
  </div>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex';
export default {
  computed: {
    ...mapState('auth',['user']),
    ...mapGetters('auth',['isAdmin']),
  },
    methods: {
       ...mapActions('auth',['logout']),
        currentPath(url) {
            return this.$route.fullPath===url
        },
        async salir(){
                await this.logout();
                this.$router.replace({
                    name: 'Home'
                });
        }
    },
    
};
</script>

<style lang="scss" scoped>
</style>