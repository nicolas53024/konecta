<template>
    <div>
        <form class="form-inline mb-2" @submit.prevent="busqueda">
            <select class="form-control" required v-model="selected">
                                <option value="" selected disabled>Campo</option>
                                <option v-for="campo in campos" :key="campo.tag" :value="campo.value">{{campo.tag}}</option>
                            </select>
            <input type="text" placeholder="Contiene..." class="ml-1 form-control" v-model.trim="contiene">
            <button type="submit" class="ml-2 btn btn-success"><i class="fas fa-search"></i>Buscar</button>
            <div  class="ml-2 btn btn-danger"  @click="clean"><i class="fas fa-eraser"></i> Borrar</div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                campos:[
                   {value:'email',tag:'email'},
                   {value:'name',tag:'nombre'},
                ],
                selected:'',
                contiene:''
            }
        },
        methods: {
            busqueda() {
                this.$emit('getUsers',{campoBusqueda:this.selected,contiene:this.contiene})
            },
            clean(){
                this.selected='';
                this.contiene='';
                this.$emit('getUsers',null)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>