<template>
  <div class="layout-container layout-default" :class="thisRouteClass">
    <SiteLoading
      :class="isLoadingSectionFadingOut ? 'hide' : 'show'"
      v-if="showLoadingSection"
    />

    <SiteHeader />
    <main class="site-main">
      <nuxt />
    </main>
    <SiteFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoadingSection: true,
      isLoadingSectionFadingOut: false,
      hideLoadingSectionTimer: 1500,
      fadeOutTimer: 500,
      timeOut: null,
      fadeTimeOut: null,
    };
  },
  mounted() {
    this.setLoadingSectionFadeOutTimer();
  },
  watch: {
    showLoadingSection() {
      if (this.timeOut && !this.showLoadingSection) {
        clearTimeout(this.timeOut);
      }
    },
    isLoadingSectionFadingOut() {
      if (this.fadeTimeOut && this.isLoadingSectionFadingOut) {
        clearTimeout(this.fadeTimeOut);
      }
    },
  },
  methods: {
    setLoadingSectionFadeOutTimer() {
      this.fadeTimeOut = setTimeout(
        () => this.fadeOutLoadingSection(),
        this.hideLoadingSectionTimer
      );
    },
    fadeOutLoadingSection() {
      this.isLoadingSectionFadingOut = true;
      this.setLoadingSectionTimer();
    },
    setLoadingSectionTimer() {
      this.timeOut = setTimeout(
        () => this.hideLoadingSection(),
        this.hideLoadingSectionTimer
      );
    },

    hideLoadingSection() {
      this.showLoadingSection = false;
    },
  },
  computed: {
    thisRouteClass() {
      const path = this.$route.fullPath;
      let thisRouteClass;
      if (path === "/") {
        thisRouteClass = "home";
      } else {
        // thisRouteClass = path.replaceAll("/", "-");
      }
      return thisRouteClass;
    },
  },
};
</script>
