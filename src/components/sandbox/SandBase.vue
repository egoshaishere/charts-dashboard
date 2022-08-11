<!---ТИКЕР-->
<template>
  <div class="sandbox__sandbase">
    <SandSubBase @click="add" @coco="brrr" @roco="justMethod"/>
  </div>
</template>

<script>
import SandSubBase from './SandSubBase.vue';


export default {
    name: "SandBase",
    components: {
        SandSubBase
    },
    methods: {
      add(){
        console.log('функция add вызвана в результате перехвата всплывающего события click')
      },
      brrr(){
        console.log('функция brrr вызвана в результате перехвата всплывающего события coco')
      },
      justMethod(){
        console.log('react')
      }
    }


}
</script>

<style>
.sandbox__sandbase {
  margin: 20px;

  border: 2px solid orange; 
}

</style>