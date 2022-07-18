<template>
  <div class="site-footer-wrapper">
    <nav class="site-map">
      <ul>
        <li><nuxt-link to="/weddings">Weddings</nuxt-link></li>
        <li><nuxt-link to="/offerings">Offerings</nuxt-link></li>
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li><nuxt-link to="/alacarte">Order A La Carte</nuxt-link></li>
      </ul>
    </nav>
    <div class="submark">
      <nuxt-link to="/"><SiteSubmark :width="150" /></nuxt-link>
    </div>
    <nav class="contact-links">
      <ul>
        <li><nuxt-link to="/contact">Get in Touch</nuxt-link></li>
        <li v-if="hasEmail">
          <a :href="data.email" target="_blank">Email</a>
        </li>
        <li v-if="hasInstagram">
          <a
            :href="`https://www.instagram.com/${data.instagram}`"
            target="_blank"
            >Instagram</a
          >
        </li>
        <li v-if="hasPinterest">
          <a
            :href="`https://www.pinterest.com/${data.pinterest}`"
            target="_blank"
            >Pinterest</a
          >
        </li>
      </ul>
    </nav>
    <div class="footer-text">
      <p>
        © {{ currentYear }} Once Gathered LLC
        <a href="https://www.otherlove.co" target="_blank" class="link-inherit"
          >Made with Otherlove.</a
        >
      </p>
    </div>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "contactInfo"]{
    "email": siteEmail,
    "instagram": instagram,
    "pinterest": pinterest
}[0]`;
export default {
  async fetch() {
    this.data = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  data: () => ({
    data: null,
  }),
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    hasPinterest() {
      if (this.data?.pinterest) {
        return true;
      } else {
        return false;
      }
    },
    hasInstagram() {
      if (this.data?.instagram) {
        return true;
      } else {
        return false;
      }
    },
    hasEmail() {
      if (this.data?.siteEmail) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>


<style lang="scss">
.site-footer {
  background: $deep-green;
  color: $buttercream;
  padding-top: 50px;

  .site-footer-wrapper {
    display: grid;
    text-align: center;

    @media (min-width: $collapse-bp) {
      max-width: 976px;
      margin: 0 auto;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto auto;
      grid-row-gap: 50px;
      grid-template-areas:
        "navSiteMap submark navContact"
        ". footerText .";
    }
    @media (max-width: $collapse-bp) {
      grid-template-columns: 1fr;
      grid-template-areas:
        "submark"
        "navSiteMap"
        "navContact"
        "footerText";
    }
    nav.site-map {
      grid-area: navSiteMap;
    }
    .submark {
      grid-area: submark;
    }
    nav.contact-link {
      grid-area: navContact;
    }
    .footer-text {
      grid-area: footerText;
      text-transform: uppercase;
      letter-spacing: 0.04em;

      @media (min-width: $collapse-bp) {
        grid-column: 1 / 4;
        padding-bottom: 16px;
      }
      @media (max-width: $collapse-bp) {
        padding-top: 24px;
        padding-bottom: 10px;
      }
      p {
        @media (min-width: $collapse-bp) {
          font-size: 11px;
          line-height: 12px;
        }
        @media (max-width: $collapse-bp) {
          font-size: 8px;
          line-height: 12px;
        }
      }
    }
    > * {
      place-self: center;
    }

    nav {
      ul {
        display: flex;
        flex-direction: column;
        li {
          text-transform: uppercase;
          letter-spacing: 0.04em;
          a.nuxt-link-exact-active {
            color: $link-color;
            &:hover {
              cursor: default;
            }
          }
          @media (min-width: $collapse-bp) {
            font-size: 14px;
            line-height: 32px;
          }
          @media (max-width: $collapse-bp) {
            font-size: 12px;
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>