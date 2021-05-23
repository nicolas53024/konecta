<template>
  <div class="container shadow-lg p-5 rounded">
    <h5>{{ title }} cliente</h5>
    <form @submit.prevent="enviar()">
      <input v-model="form.name" placeholder="nombre" type="text" class="form-control mb-3" />
      <input v-model="form.document" placeholder="documento" type="text" class="form-control mb-3" />
      <input v-model="form.email" placeholder="email" type="text" class="form-control mb-3" />
      <input v-model="form.address" placeholder="dirección" type="text" class="form-control mb-3" />
        <span class="text-danger" v-if="errorResponse">{{errorResponse}}</span>
      <button class="btn btn-primary btn-block" v-if="edit"  :disabled="$v.form.$invalid">
        Editar
      </button>
      <button class="btn btn-success btn-block" v-else  :disabled="$v.form.$invalid">Guardar</button>
       <button
                  type="button"
                  class="btn btn-danger btn-block mt-2"
                  @click="limpiar"
                >
                  <i class="far fa-trash-alt"></i>
                  Limpiar
                </button>
    </form>
  </div>
</template>

<script>
import { required,  email,minLength } from 'vuelidate/lib/validators';
export default {
  props: ["client"],
  computed: {
    title() {
      return this.edit ? "Editar" : "Agregar";
    },
  },
  data() {
      return {
          edit:false,
          errorResponse:null,
          form:{
              name:'',
              document:'',
              email:'',
              address:''
          }
      }
  },
  watch: {
    client: {
      handler(n, o) {
          this.edit=true
           Object.assign(this.form,n);
      },
      deep: true,
    },
  },
  methods: {
      limpiar() {
          this.edit=false
      this.form.name = "";
      this.form.document = "";
      this.form.email = "";
      this.form.address = "";
    },
    enviar(){
        let method='post';
        let url='api/client';
        if( this.edit){
            method='put';
            url=`api/client/${this.client.id}`
        }
        axios[method](url,this.form).then((res)=>{
            this.$emit('refreshData',res.data,method)
            this.limpiar()
            this.edit=false
        }).catch((err)=>{
            let key=Object.keys(err.response.data.errors) 
            this.errorResponse=err.response.data.errors[key[0]][0]
            const self = this
                   setInterval(function() {
                        self.errorResponse =null
                   }, 4000);
        })
    },
  },
   validations: {
    form: {
     name: { required, minLength: minLength(4) },
     document: { required,minLength: minLength(8) },
     email: { required, email},
     address: { required, minLength: minLength(10) },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>