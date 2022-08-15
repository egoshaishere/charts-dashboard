<!---ТИКЕР-->
<template>
  <div class="sandbox__sandbase">
    <SandSubBase
      @click="add"
      @coco="brrr"
      @roco="justMethod"
      @test1="test1Method"
    />
  </div>
</template>

<script>
import SandSubBase from "./SandSubBase.vue";
import { bus } from "../../Bus.js";

export default {
  name: "SandBase",
  components: {
    SandSubBase,
  },
  methods: {
    add() {
      console.log(
        "функция add вызвана в результате перехвата всплывающего события click"
      );
    },
    brrr() {
      console.log(
        "функция brrr вызвана в результате перехвата всплывающего события coco"
      );
    },
    justMethod() {
      console.log("react");
    },
    test1Method() {
      console.log("перехвачено событие test1");
    },
    megaEventHandler(payload) {
      console.log("событие перехвачено с помощью event bus", payload);

       bus.$on("mega-event2", (payload) => {this.testEventHandler(payload)});
    },
    testEventHandler(payload) {
      console.log("событие перехвачено", payload);
    }
  },
  created() {
    bus.$on("mega-event", (payload) => {this.megaEventHandler(payload)});
  },
};
</script>

<style>
.sandbox__sandbase {
  margin: 20px;

  border: 2px solid orange;
}
</style>