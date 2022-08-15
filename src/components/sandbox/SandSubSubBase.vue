<template>
  <div class="subsubbase">
    <v-btn class="sb__btn" @click="onClickHandler">test bus</v-btn>
     <v-btn class="sb__btn" @click="onClickHandler2">test bus</v-btn>
  </div>
</template>

<script>

import { bus } from '../../Bus.js'


export default {
  name: "SandSubSubBase",
  data(){
    return {
      testVal: 'string data',
      testString: "test string tralalala 2124124!!!!"

    }
  },
  methods: {
    onClickHandler() {
      bus.$emit('mega-event', this.testVal);
    },
    onClickHandler2() {
      bus.$emit('mega-event2', this.testVal);
    }
  }
};
</script>

<style>

.subsubbase {
    border: 2px solid limegreen;
}


</style>