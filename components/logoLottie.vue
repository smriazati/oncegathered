<template>
  <div id="app">
    <lottie
      :options="defaultOptions"
      :height="height"
      :width="width"
      v-on:animCreated="handleAnimation"
    />
  </div>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import animationData from "~/assets/lottie/logo/data.json";

export default {
  components: {
    lottie: lottie,
  },
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
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
  },
};
</script>