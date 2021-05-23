<template>
  <div>
    <Nav />
    <div class="container mt-5">
      <h3 class="text-center">Clientes</h3>
      <div class="row">
        <div class="col-7">
          <h5>Lista de clientes</h5>
          <ul class="list-group">
            <li
              class="list-group-item"
              :key="client.id"
              v-for="client in clients"
            >
              <span class="lead">{{ client.name }}</span>
              <button class="btn btn-sm btn-success float-right mx-2 px-3" @click="show(client)">
                Ver
              </button>
              <button
                class="btn btn-sm btn-danger float-right mx-2"
                @click="eliminar(client.id)"
              >
                Eliminar
              </button>
              <button
                class="btn btn-sm btn-warning float-right"
                @click="currentClient = client"
              >
                Editar
              </button>
            </li>
          </ul>
          <v-pagination
            v-if="clients.length"
            v-model="page"
            class="mt-3"
            :page-count="total"
            :classes="bootstrapPaginationClasses"
          ></v-pagination>
        </div>
        <div class="col-5">
          <client-form
            ref="form"
            @refreshData="refreshData"
            :client="currentClient"
          ></client-form>
        </div>
      </div>
    </div>
    <b-modal id="client-modal" v-if="dataModal">
        <h6>{{dataModal.name}}</h6>
        <p><b>Documento:</b>{{dataModal.document}}</p>
        <p><b>email:</b>{{dataModal.email}}</p>
        <p><b>dirección:</b>{{dataModal.address}}</p>
    </b-modal>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import axios from "axios";
import vPagination from "vue-plain-pagination";
import ClientForm from "../components/ClientForm";
export default {
  components: {
    Nav,
    vPagination,
    ClientForm,
  },
  created() {
    this.getClients();
  },
  data() {
    return {
      dataModal:null,
      clients: [],
      currentClient: null,
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
    getClients() {
      axios.get(`api/client?page=${this.page}`).then((res) => {
        this.clients = res.data.data;
        this.total = res.data.last_page;
      });
    },
    refreshData(model, method) {
      if (method === "post") {
        this.clients.unshift(model);
      } else {
        this.getClients();
      }
    },
    eliminar(id) {
      axios
        .delete(`api/client/${id}`)
        .then((res) => {
          this.clients = this.clients.filter((client) => client.id != id);
          this.$refs.form.limpiar();
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Cliente Eliminado con exito",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo elminar el registro",
          });
        });
    },
    show(client){
        this.dataModal=client;
        this.$bvModal.show('client-modal')
    }
  },
  watch: {
    page: function (newVal, oldVal) {
      this.getClients();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>