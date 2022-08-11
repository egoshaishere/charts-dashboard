<!---БАТОН-->
<template>
  <div class="sandbox__subbase">
    <v-btn class="sb__btn" @click="$emit('click')">click</v-btn>
    <v-btn class="sb__btn" @click="$emit('coco')">coco</v-btn>

    <v-btn class="sb__btn" @click="$emit('roco')">roco</v-btn>
  </div>
</template>

<script>
export default {
  name: "SubBase",
};
</script>

<style>
.sandbox__subbase {
  border: solid 2px red;
  margin: 20px;


  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.sb__btn {
  margin: 20px;
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%); 
  border-radius: 3;
  border: 0;
  color: "white";
  height: 48;
  padding: "0 30px";
  box-shadow: "0 3px 5px 2px rgba(255, 105, 135, .3)";
}
</style>