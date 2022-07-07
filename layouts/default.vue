<template>
  <div class="layout-container layout-default" :class="thisRouteClass">
    <SiteLoading
      :class="isLoadingSectionFadingOut ? 'hide' : 'show'"
      v-if="showLoadingSection"
    />
    <SiteHeader />
    <main class="site-main" ref="main">
      <nuxt />
    </main>
    <footer class="site-footer" ref="footer">
      <SiteFooter ref="footer" />
    </footer>
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
    this.setMenuCollapseOnOutsideClick();
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
    setMenuCollapseOnOutsideClick() {
      const main = this.$refs.main;
      if (main) {
        main.addEventListener("click", this.checkMenuCollapse);
      }
      const footer = this.$refs.footer;
      if (footer) {
        footer.addEventListener("click", this.checkMenuCollapse);
      }
    },

    checkMenuCollapse() {
      const menuControlBtn = document.getElementById("menuControl");
      const siteNav = document.getElementById("siteNav");
      if (siteNav) {
        if (siteNav.classList.contains("show")) {
          menuControlBtn.click();
        }
      }
    },
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
