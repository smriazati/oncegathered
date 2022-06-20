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
    };
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
  transition: 0.8s ease-out opacity, 2s 2s ease z-index;
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