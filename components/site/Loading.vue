<template>
  <section class="loading-section">
    <div class="loading-section-wrapper">
      <figure v-if="isMobile">
        <LogoLottie
          :key="isMobile"
          path="/lottie/stackedlogo/data.json"
          :forwardSpeed="speed"
        />
      </figure>
      <figure v-else>
        <LogoLottie
          :key="isMobile"
          path="/lottie/logo/data.json"
          :forwardSpeed="speed"
        />
      </figure>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      speed: 1,
      windowWidth: undefined,
      windowHeight: undefined,
    };
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    });
  },
  computed: {
    isMobile() {
      if (!process.client) {
        return;
      }
      if (this.windowWidth < 980) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss">
.loading-section {
  position: fixed;
  z-index: 201;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: $buttercream;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-out opacity, 0.1s 0.5s ease z-index;
  &.show {
    opacity: 1;
    z-index: 301;
  }
  &.hide {
    opacity: 0;
    z-index: 0;
  }
}
</style>