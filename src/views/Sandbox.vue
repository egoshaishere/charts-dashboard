<template>
  <div class="sandbox__view" >
    <button v-on:click="infoHideShow">btn</button>
    <Information v-if="isInfoShow" v-on:click="infoHideShow"/>
    <SandBase />
  </div>
</template>

<script>
import SandBase from '@/components/sandbox/SandBase.vue';
import Information from '@/components/sandbox/Information.vue';

export default {
    name: "Sandbox",
    components: {
      SandBase,
      Information
    },
    data(){
      return {
        isInfoShow: false
      }
    },
    methods: {
      infoHideShow(){
        this.isInfoShow = !this.isInfoShow
      },
      test() {
        console.log('test')
      }
    }
}
</script>

<style>

.sandbox__view {
  width: auto;
  height: auto;
  margin: 20px;
  border: solid 2px green;
}

.just_div {
  width: 100px;
  height: 40px;
}

</style>