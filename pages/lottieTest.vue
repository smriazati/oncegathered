<template>
  <div id="app">
    <lottie
      :options="defaultOptions"
      :height="400"
      :width="1030"
      v-on:animCreated="handleAnimation"
    />
  </div>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import animationData from "~/assets/lottie/logo/data.json";

export default {
  name: "app",
  components: {
    lottie: lottie,
  },
  data() {
    return {
      defaultOptions: { animationData: animationData },
      animationSpeed: 3,
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
      this.anim.setSpeed(this.animationSpeed);
    },
    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed);
    },
  },
};
</script>