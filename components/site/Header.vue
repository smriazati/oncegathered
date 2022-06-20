<template>
  <header class="site-header">
    <div class="site-header-wrapper">
      <h1 class="brand">
        <nuxt-link to="/">
          <span class="visually-hidden">Once Gathered</span>
          <SiteLogo v-if="!isMobile" :width="330" />
          <SiteStackedLogo v-else :width="330" />
        </nuxt-link>
      </h1>
      <button @click="toggleMenu()">
        <span v-if="!isExpanded">Menu</span>
        <span v-else class="light-text">Close</span>
      </button>
      <SiteNav
        :aria-expanded="`${isExpanded}`"
        :isMobile="isMobile"
        :class="isExpanded ? 'show' : 'hide'"
      />
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      isExpanded: false,
      isMobile: false,
    };
  },
  mounted() {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    onResize() {
      if (window.innerWidth > 980) {
        this.isMobile = false;
      } else {
        this.isMobile = true;
      }
    },
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
    },
  },
  watch: {
    $route() {
      if (this.isExpanded) {
        this.toggleMenu();
      }
    },
  },
};
</script>

<style lang="scss">
.site-header {
  .site-header-wrapper {
    @include baseGrid;
    @media (min-width: $collapse-bp) {
      padding: 25px 0;
    }
    > button {
      @include btnRoundMenu();
      position: relative;
      z-index: 201;
      @media (min-width: $collapse-bp) {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 1 / 2;
        padding: 11px 0;
        margin-bottom: 24px;
        place-self: center;
      }
      .light-text {
        color: $buttercream;
      }
    }
    .brand {
      @media (min-width: $collapse-bp) {
        grid-column: 3 / span 4;
        grid-row: 1 / 2;
        place-self: center;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 2 / 3;
        place-self: center;
      }
    }
    .site-nav {
      opacity: 0;
      transform: translateY(-100vh);
      transition: 0.35s ease-out all;
      &.show {
        opacity: 1;
        transform: translateY(0vh);
      }
      &.hide {
        opacity: 0;
        transform: translateY(-100vh);
      }
    }
  }
}
</style>