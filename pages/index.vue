<template>
  <div class="lp-container" :style="`height: ${windowHeight}px`">
    <main v-if="dataLoaded" ref="main" class="lp-grid">
      <header>
        <div class="logo">
          <figure v-if="isMobile">
            <!-- <img
              :src="`${$urlFor(siteSettings.siteSecondaryLogo.url)
                .forceDownload(siteSettings.siteSecondaryLogo.originalFilename)
                .size(parseInt(windowWidth * 0.9))}`"
              :alt="siteSettings.siteSecondaryLogo.alt"
              :width="parseInt(windowWidth * 0.9)"
            /> -->
            <LogoLottie :key="isMobile" path="/lottie/stackedlogo/data.json" />
          </figure>
          <figure v-else>
            <LogoLottie :key="isMobile" path="/lottie/logo/data.json" />
          </figure>
        </div>
        <h1 v-if="siteSettings.siteTitle" class="visually-hidden">
          {{ siteSettings.siteTitle }}
        </h1>
        <h2 v-if="siteSettings.siteTagline">{{ siteSettings.siteTagline }}</h2>
      </header>
      <nav :class="isMenuExpanded ? 'expanded' : ''" ref="nav">
        <button class="menu-open-button" @click="toggleMenu">
          <span class="button-text">Menu</span>
        </button>
        <button class="menu-close-button" @click="toggleMenu">
          <span>
            <span class="visually-hidden">Close</span>
            <img src="/icons/close.svg" alt="Close Icon" />
          </span>
        </button>
        <ul class="inner-grid">
          <li @mouseover="setHoverClass(0)" @mouseout="removeHoverClass(0)">
            <a
              v-if="siteSettings.siteEmail"
              :href="`mailto:${siteSettings.siteEmail}`"
            >
              <span v-if="page.email_link_text">{{
                page.email_link_text
              }}</span>
              <span v-else href="">Email to inquire</span>
            </a>
          </li>
          <li @mouseover="setHoverClass(1)" @mouseout="removeHoverClass(1)">
            <a
              v-if="siteSettings.instagram"
              target="_blank"
              :href="`https://www.instagram.com/{siteSettings.instagram }`"
            >
              <span v-if="page.ig_link_text">{{ page.ig_link_text }}</span>
              <span v-else>Follow on Instagram</span>
            </a>
          </li>
          <li
            v-if="page.pdf"
            @mouseover="setHoverClass(2)"
            @mouseout="removeHoverClass(2)"
            :style="`height: ${columnWidth}px`"
          >
            <a :href="`${page.pdf.url}?dl=${page.pdf.original}`" target="_blank"
              ><span>
                <span v-if="page.pdf_link_text">{{ page.pdf_link_text }}</span>
                <span v-else>Learn more</span> </span
              ><span class="show-on-mobile">
                <span v-if="page.pdf_mobile_link_text">{{
                  page.pdf_mobile_link_text
                }}</span>
                <span v-else>Download our Investment Guide</span>
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <footer>
        <figure v-if="siteSettings.favicon">
          <img
            :src="`${$urlFor(siteSettings.favicon.url)
              .forceDownload(siteSettings.favicon.originalFilename)
              .size(32)}`"
            :alt="siteSettings.favicon.alt"
            width="32"
          />
        </figure>
      </footer>
    </main>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
const pageQuery = groq`*[_type == "landingPage"]{
      email_link_text,
      ig_link_text,
      pdf_link_text,
      pdf_mobile_link_text,
      "pdf": {
        "asset": pdf.asset,
        "url": pdf.asset->url,
        "original": pdf.asset->originalFilename
      }
    }`;
const siteSettingsQuery = groq`*[_type == "siteSettings"]{
      siteTitle,
      siteTagline,
      siteEmail,
      instagram,
      "siteLogo": {
        alt,
        asset,
        "url": siteLogo.asset->url,
        "originalFilename": siteLogo.asset->originalFilename
      },
      "siteSecondaryLogo": {
        alt,
        asset,
        "url": siteSecondaryLogo.asset->url,
        "originalFilename": siteSecondaryLogo.asset->originalFilename
      },
      "favicon": {
        alt,
        asset,
        "url": favicon.asset->url,
        "originalFilename": favicon.asset->originalFilename
      }}`;

export default {
  async asyncData({ $sanity }) {
    const page = await $sanity.fetch(pageQuery).then((res) => res[0]);
    const siteSettings = await $sanity
      .fetch(siteSettingsQuery)
      .then((res) => res[0]);

    return { page, siteSettings };
  },
  head() {
    return {
      title: "Coming Soon",
    };
  },
  data() {
    return {
      hoverClasses: ["emailHover", "followHover", "learnHover"],
      windowWidth: undefined,
      windowHeight: undefined,
      isMenuExpanded: false,
      logoDesktopMargin: 0,
    };
  },
  computed: {
    dataLoaded() {
      if (this.page && this.siteSettings) {
        return true;
      } else {
        return false;
      }
    },
    activeLogo() {
      if (this.windowWidth > 980) {
        return this.siteSettings.siteLogo;
      } else {
        return this.siteSettings.siteSecondaryLogo;
      }
    },
    activeLogoSize() {
      if (this.windowWidth > 980) {
        return 1030;
      } else {
        return parseInt(this.windowWidth * 0.9);
      }
    },
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
    columnWidth() {
      if (!process.client) {
        return;
      }
      let colWidth = 0;
      let gridWidth = 0;
      if (this.windowWidth > 1388) {
        colWidth = 153;
      } else {
        //
        if (this.windowHeight > 600) {
          gridWidth = this.windowWidth * 1;
          colWidth = parseInt((gridWidth - 16 * 7) / 8);
        } else {
          colWidth = 136;
        }
      }
      return colWidth;
    },
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    });
  },
  methods: {
    toggleMenu() {
      this.isMenuExpanded = !this.isMenuExpanded;
    },
    setHoverClass(i) {
      const main = this.$refs.main;
      if (!main) {
        return;
      }
      main.classList.add(this.hoverClasses[i]);
    },
    removeHoverClass(i) {
      const main = this.$refs.main;
      if (!main) {
        return;
      }
      main.classList.remove(this.hoverClasses[i]);
    },
  },
};
</script>


