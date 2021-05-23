<template>
  <div class="container shadow-lg p-5 rounded">
    <h5>{{ title }} usuario</h5>
    <form @submit.prevent="enviar()">
      <input v-model="form.name" placeholder="nombre" type="text" class="form-control mb-3" />
      <input v-model="form.email" placeholder="email" type="text" class="form-control mb-3" />
      <input v-model="form.password" placeholder="password" type="password" class="form-control mb-3" v-if="!edit" />
       <select class="form-control mb-2" required v-model="form.rol_id">
                                <option value="" selected disabled>Rol</option>
                                <option v-for="rol in roles" :key="rol.id" :value="rol.id">{{rol.key}}</option>
                </select>
        <span class="text-danger" v-if="errorResponse">{{errorResponse}}</span>
      <button class="btn btn-primary btn-block mt-2" v-if="edit"  :disabled="$v.form.$invalid">
        Editar
      </button>
      <button class="btn btn-success btn-block mt-2" v-else  :disabled="$v.form.$invalid">Guardar</button>
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
  props: ["user"],
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
              rol_id:'',
          },
          roles:[
                   {id:1,key:'admin'},
                   {id:2,key:'vendedor'},
                ],
      }
  },
  watch: {
    user: {
      handler(n, o) {
          this.edit=true
           Object.assign(this.form,n);
           this.form.rol_id=n.rol_id
      },
      deep: true,
    },
  },
  methods: {
      limpiar() {
          this.edit=false
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.form.rol_id = "";
    },
    enviar(){
        let method='post';
        let url='api/user';
        if( this.edit){
            method='put';
            url=`api/user/${this.user.id}`
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
     email: { required, email},
    },
  },
};
</script>

<style lang="scss" scoped>
</style>