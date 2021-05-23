<template>
  <div class="container mt-5">
    <h3 class="text-center">Prueba Konecta</h3>
    <div class="row d-flex justify-content-center">
      <div class="card col-lg-5 col-sm-12 shadow-lg p-5" style="width: 18rem">
        <div class="modal-body">
          <div class="form-title text-center">
            <h5>Login</h5>
          </div>
          <div class="d-flex flex-column text-center">
            <form @submit.prevent="submitForm(form)">
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  v-model="form.email"
                  placeholder="Em@il..."
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  v-model="form.password"
                  placeholder="Contraseña..."
                />
              </div>
              <div v-if="!showSpinner">
                <button
                  type="button"
                  class="btn btn-danger btn-sm col-4 mr-1"
                  @click="limpiar"
                >
                  <i class="far fa-trash-alt"></i>
                  Limpiar
                </button>
                <input
                  type="submit"
                  class="btn btn-success btn-sm col-4"
                  value="login"
                  :disabled="$v.form.$invalid"
                />
              </div>
              <div v-else>
                <pulse-loader></pulse-loader>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { mapActions } from "vuex";
import { required,  email } from 'vuelidate/lib/validators';
export default {
  components: {
    PulseLoader,
  },
  data() {
    return {
      showSpinner: false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async submitForm() {
     this.showSpinner=true
       await this.login(this.form).then((res)=>{
           console.log('login succesfull');
           setTimeout(() => {
            this.$router.replace({ name: 'clients' });
                    }, 3000)
        })
        .catch((error) => {
          this.showSpinner=false
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Credenciales Invalidas!',
          })
        });
          
    },
    limpiar() {
      this.form.email = "";
      this.form.password = "";
    },
  },
 
};
</script>