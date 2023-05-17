<!-- @format -->

<template>
  <div class="playground">
    <GameMap></GameMap>
  </div>

  <div v-if="$store.state.user.id == $store.state.pk.a_id" class="circle-blue"> </div>
  <div v-else class="circle-red"></div>
</template>

<script>
import GameMap from "./GameMap.vue";
export default {
  components: {
    GameMap,
  },
};
</script>

<style scoped>
.playground {
  width: 60vw;
  height: 70vh;
  margin: 40px auto;
  background-color: aqua;
}
.circle-red {
  width : 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: red;
  margin: auto;
}

.circle-blue {
  width : 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: blue;
  margin:auto;
}
</style>
