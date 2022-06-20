<template>
  <div class="lp-container" :style="`height: ${windowHeight}px`">
    <main v-if="dataLoaded" ref="main" class="lp-grid">
      <header>
        <div class="logo">
          <figure v-if="isMobile">
            <LogoLottie
              :key="isMobile"
              path="/lottie/stackedlogo/data.json"
              :forwardSpeed="0.5"
            />
          </figure>
          <figure v-else>
            <LogoLottie
              :key="isMobile"
              path="/lottie/logo/data.json"
              :forwardSpeed="0.5"
            />
          </figure>
        </div>
        <h1 v-if="data.siteSettings.siteTitle" class="visually-hidden">
          {{ data.siteSettings.siteTitle }}
        </h1>
        <h2 v-if="data.siteSettings.siteTagline">
          {{ data.siteSettings.siteTagline }}
        </h2>
      </header>
      <nav :class="isMenuExpanded ? 'expanded' : ''" ref="nav">
        <button class="menu-open-button no-btn-style" @click="toggleMenu">
          <span class="button-text">Menu</span>
        </button>
        <button class="menu-close-button no-btn-style" @click="toggleMenu">
          <span>
            <span class="visually-hidden">Close</span>
            <img src="/icons/close.svg" alt="Close Icon" />
          </span>
        </button>
        <ul class="inner-grid">
          <li @mouseover="setHoverClass(0)" @mouseout="removeHoverClass(0)">
            <a
              v-if="data.contactInfo.siteEmail"
              :href="`mailto:${data.contactInfo.siteEmail}`"
              class="link-inherit"
            >
              <span v-if="data.page.email_link_text">{{
                data.page.email_link_text
              }}</span>
              <span v-else>Email to inquire</span>
            </a>
          </li>
          <li @mouseover="setHoverClass(1)" @mouseout="removeHoverClass(1)">
            <a
              v-if="data.contactInfo.instagram"
              target="_blank"
              :href="`https://www.instagram.com/${data.contactInfo.instagram}`"
              class="link-inherit"
            >
              <span v-if="data.page.ig_link_text">{{
                data.page.ig_link_text
              }}</span>
              <span v-else>Follow on Instagram</span>
            </a>
          </li>
          <li
            v-if="data.page.pdf"
            @mouseover="setHoverClass(2)"
            @mouseout="removeHoverClass(2)"
            :style="`height: ${columnWidth}px`"
          >
            <a
              :href="`${data.page.pdf.url}?dl=${data.page.pdf.original}`"
              target="_blank"
              class="link-inherit"
              ><span>
                <span v-if="data.page.pdf_link_text">{{
                  data.page.pdf_link_text
                }}</span>
                <span v-else>Learn more</span> </span
              ><span class="show-on-mobile">
                <span v-if="data.page.pdf_mobile_link_text">{{
                  data.page.pdf_mobile_link_text
                }}</span>
                <span v-else>Download our Investment Guide</span>
              </span>
            </a>
          </li>
          <li
            v-else
            @mouseover="setHoverClass(2)"
            @mouseout="removeHoverClass(2)"
            :style="`height: ${columnWidth}px`"
          >
            ><span>
              <span v-if="data.page.pdf_link_text">{{
                data.page.pdf_link_text
              }}</span>
              <span v-else>Learn more</span> </span
            ><span class="show-on-mobile">
              <span v-if="data.page.pdf_mobile_link_text">{{
                data.page.pdf_mobile_link_text
              }}</span>
              <span v-else>Download our Investment Guide</span>
            </span>
          </li>
        </ul>
      </nav>
      <footer>
        <SiteSubmark :width="32" />
      </footer>
    </main>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type in ["landingPage", "brand", "contactInfo", "siteSettings"]]{
  'page': *[_type=='landingPage']{
    email_link_text,
      ig_link_text,
      pdf_link_text,
      pdf_mobile_link_text,
      "pdf": {
        "asset": pdf.asset,
        "url": pdf.asset->url,
        "original": pdf.asset->originalFilename
      }
  }[0],
'brand': *[_type=='brand']{
      "siteLogo": {
        "alt": siteLogo.image.asset->altText,

        "url": siteLogo.image.asset->url,
        "originalFilename": siteLogo.image.asset->originalFilename
      },
      "siteSecondaryLogo": {
        "alt": siteSecondaryLogo.image.asset->altText,
        "url": siteSecondaryLogo.image.asset->url,
        "originalFilename": siteSecondaryLogo.image.asset->originalFilename
      },
      "favicon": {
        "alt": favicon.image.asset->altText,
        "url": favicon.image.asset->url,
        "originalFilename": favicon.image.asset->originalFilename
      }
  }[0],  
  'siteSettings': *[_type=='siteSettings']{
    siteTitle,
      siteTagline
      
  }[0],
  'contactInfo': *[_type=='contactInfo']{
      siteEmail,
      instagram,
  }[0]
}[0]`;

export default {
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(query).then((res) => res);
    return { data };
  },
  head() {
    return {
      title: "Coming Soon",
    };
  },
  layout: "landing",
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
      if (this.data) {
        return true;
      } else {
        return false;
      }
    },
    activeLogo() {
      if (this.windowWidth > 980) {
        return this.data.siteSettings.siteLogo;
      } else {
        return this.data.siteSettings.siteSecondaryLogo;
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


<style lang="scss">
/* LANDING PAGE */
$bgHoverTransition: 0.5s ease all;
$mobile-bp: 980px;

.lp-container {
  height: 100vh;
}

main.lp-grid {
  background: #fbfaf2;
  transition: $bgHoverTransition;
}

@media (min-width: $mobile-bp) {
  main.lp-grid {
    &.emailHover {
      background: #fec3ad;
    }

    &.followHover {
      background: #faede3;
    }

    &.learnHover {
      background: #e6e1e8;

      nav ul li:last-child a {
        background: #f9f4cf;
      }
    }
  }
}

.lp-container {
  header {
    text-align: center;

    h2 {
      font-family: "HK Grotesk", Arial, Helvetica, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 18px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-align: center;
    }
  }

  nav p,
  nav ul {
    font-family: "Cormorant Garamond", Arial, Helvetica, sans-serif !important;
    font-style: italic;
    font-weight: 300;
    font-size: 32px;
    line-height: 30px;
    color: #272525;
  }

  footer {
    justify-self: center;
    align-self: end;
  }
}

@keyframes growCircle {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(30);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.lp-grid {
  height: 100%;
  overflow: hidden;

  @media (min-width: $collapse-bp) {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;

    header {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: 43px;
    }

    nav {
      flex: 1;

      .menu-close-button,
      .menu-open-button {
        display: none;
      }

      ul.inner-grid {
        padding: 25px 0;

        li span {
          padding-bottom: 18px;
          transition: $bgHoverTransition;
          border-bottom: 1px solid transparent;
        }

        li:hover span {
          border-bottom: 1px solid black;
        }

        li:first-child {
          grid-column: 1 / 4;
        }

        li:nth-child(2) {
          grid-column: 4/6;
          text-align: center;
        }

        li:last-child {
          grid-column: 8 / 9;

          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;

          a {
            width: 100%;
            min-width: 100%;
            display: flex;
            background: #e6e1e8;
            clip-path: circle(50%);
            text-align: center;
            justify-content: center;
            height: 100%;
            transition: $bgHoverTransition;

            span {
              width: 100%;
              flex: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0;
              border: 0;
            }
          }

          &:hover span {
            border-bottom: 0;
          }
        }
      }
    }

    footer {
      display: none;
    }
  }

  @media (max-width: $collapse-bp) {
    display: flex;
    flex-direction: column;
    justify-content: center;

    header {
      flex: 0 0 90%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: 230px;

      .logo {
        flex: 0 0 30%;
        margin-bottom: 25px;
      }
    }

    nav {
      position: fixed;
      top: 0;
      width: 100%;

      .menu-open-button,
      .menu-close-button {
        position: fixed;
      }

      .menu-open-button {
        background: #e6e1e8;
        border-radius: 50%;
        width: 98px;
        height: 98px;
        right: 20px;
        top: 20px;
      }

      &:not(.expanded) {
        .menu-close-button,
        ul {
          display: none;
        }
      }

      &.expanded {
        @media (max-height: 600px) {
          overflow: scroll;
        }

        position: fixed;
        height: 100%;

        .menu-open-button {
          z-index: 9;
          animation: growCircle 1s ease-in forwards;

          span {
            visibility: hidden;
          }
        }

        .menu-close-button {
          z-index: 12;
          padding: 20px;
          right: 0;
        }

        ul {
          position: relative;
          z-index: 10;
          opacity: 0;
          animation: fadeIn 0.3s 0.8s ease-in forwards;
          height: 100%;
          display: flex;
          list-style: none;
          flex-direction: column;
          justify-content: space-between;

          li {
            font-size: 98px;
            line-height: 90px;

            @media (max-width: 800px) {
              font-size: 75px;
              line-height: 68px;
            }

            @media (max-width: 640px) {
              font-size: 65px;
              line-height: 60px;
            }

            text-align: center;
            align-items: center;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          li:last-child {
            border-top: 1px solid black;

            a {
              display: flex;
              width: 100%;
              flex-direction: column;

              > span:last-child {
                margin-top: 28px;
                max-width: 180px;
                margin-left: auto;
                margin-right: auto;
                font-family: "HK Grotesk", Arial, Helvetica, sans-serif;
                font-style: normal;
                font-weight: normal;
                font-size: 15px;
                line-height: 25px;
                letter-spacing: 0.04em;
                text-transform: uppercase;
              }
            }
          }
        }
      }
    }

    footer {
      width: 100%;
      flex: 0 0 10%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: 56px;
    }
  }
}

// center the header
.lp-grid {
  @media (min-width: $collapse-bp) {
    header {
      justify-content: flex-end;

      .logo {
        position: fixed;
        z-index: 5;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    nav,
    footer {
      position: relative;
      z-index: 6;
    }
  }

  @media (max-width: $collapse-bp) {
    header {
      padding: 230px 0;
      position: fixed;
      z-index: 5;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      justify-content: center;
    }

    nav {
      z-index: 7;
    }

    footer {
      position: fixed;
      z-index: 6;
      bottom: 0;
    }
  }
}

@keyframes lpEnter {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.lp-container {
  ul.inner-grid li,
  header h2 {
    opacity: 0;
  }

  ul.inner-grid li {
    animation: lpEnter 1s 0.5s ease forwards;
  }

  header h2 {
    animation: lpEnter 1s 1s ease forwards;
  }
}
.inner-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 16px;
  max-width: 1338px;
  margin: 0 auto;

  @media (max-width: 1338px) {
    max-width: 100%;
  }
}
</style>