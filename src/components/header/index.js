import  headerModule from './header.vue';
const  header = {
   install:function(Vue){
     Vue.component('v-header',headerModule);
   }
}
export  default  header;
