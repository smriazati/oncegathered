<template>
  <div class="site-nav">
    <div class="site-nav-wrapper">
      <nav class="main-nav">
        <ul>
          <li class="lg-screen-hide"><nuxt-link to="/">Home</nuxt-link></li>
          <li><nuxt-link to="/weddings">Weddings</nuxt-link></li>
          <li><nuxt-link to="/offerings">Offerings</nuxt-link></li>
          <li><nuxt-link to="/about">About</nuxt-link></li>
          <li><nuxt-link to="/contact">Get in Touch</nuxt-link></li>
        </ul>
      </nav>
      <section v-if="hasAddress && !isMobile" class="address">
        <h2>Studio Address</h2>
        <div class="address-wrapper">
          <p v-if="data.address.line1">{{ data.address.line1 }}</p>
          <p v-if="data.address.line2">{{ data.address.line2 }}</p>
        </div>
        <p>By appointment only</p>
      </section>
      <section class="contact" v-if="hasEmail && hasInsta && !isMobile">
        <h2>Get in touch</h2>
        <p>
          <a
            :href="`mailto:${data.siteEmail}`"
            target="_blank"
            class="link-hover"
            >{{ data.siteEmail }}</a
          >
        </p>
        <p>
          <a
            :href="`https://www.instagram.com/${data.instagram}`"
            target="_blank"
            class="link-hover"
            >@{{ data.instagram }}</a
          >
        </p>
      </section>
      <nav class="social-icons">
        <ul class="flex-row">
          <li v-if="hasInsta">
            <a
              :href="`https://www.instagram.com/${data.instagram}`"
              target="_blank"
              class="icon instagram"
              ><span>Instagram</span></a
            >
          </li>
          <li v-if="hasPinterest">
            <a
              :href="`https://www.pinterest.com/${data.pinterest}`"
              target="_blank"
              class="icon pinterest"
              ><span>Pinterest</span></a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == "contactInfo"]{
  instagram, siteEmail, pinterest, address
}[0]`;

export default {
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
  async fetch() {
    this.data = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,

  data() {
    return {
      data: undefined,
    };
  },
  computed: {
    hasAddress() {
      if (this.data?.address) {
        return true;
      } else {
        return false;
      }
    },
    hasInsta() {
      if (this.data?.instagram) {
        return true;
      } else {
        return false;
      }
    },
    hasPinterest() {
      if (this.data?.pinterest) {
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
.site-nav {
  position: absolute;
  z-index: 199;
  width: 100%;
  top: 0;
  left: 0;
  background: $deep-green;
  color: $buttercream;
  .site-nav-wrapper {
    @include baseGrid;
    @media (min-width: $collapse-bp) {
      padding: 142px 0;
    }
    @media (max-width: $collapse-bp) {
      padding: 92px 0;
    }

    nav.main-nav {
      .nuxt-link-exact-active {
        color: $link-color;
        &:hover {
          cursor: default;
        }
      }
      @media (min-width: $collapse-bp) {
        grid-column: 2 / span 4;
        grid-row: 1 / 4;
      }

      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 1 / 2;
        text-align: center;
      }
    }

    section a:not(:hover) {
      color: inherit;
    }
    section.address {
      @media (min-width: $collapse-bp) {
        grid-column: 7 / span 2;
        grid-row: 1 / 2;
      }
      @media (max-width: $collapse-bp) {
        display: none;
      }
    }
    section.contact {
      @media (min-width: $collapse-bp) {
        grid-column: 7 / span 2;
        grid-row: 2 / 3;
      }
      @media (max-width: $collapse-bp) {
        display: none;
      }
    }

    nav.social-icons {
      @media (min-width: $collapse-bp) {
        grid-column: 7 / span 2;
        grid-row: 3 / 4;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 2 / 3;
        place-self: center;
      }
    }

    .main-nav {
      ul {
        display: flex;
        flex-direction: column;
        li {
          @include serifTypeface;
          font-size: 48px;
          font-style: italic;
          line-height: 58px;
          letter-spacing: 0em;
          &:not(:last-child) {
            @media (min-width: $collapse-bp) {
              margin-bottom: 70px;
            }
          }
          @media (max-width: $collapse-bp) {
            margin-bottom: 40px;
          }
        }
      }
    }

    section {
      h2 {
        @include sansSerifTypeface;
        font-size: 15px;
        line-height: 25px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 22px;
        font-style: normal;
      }

      &.address {
        p {
          @include sansSerifTypeface;
          font-size: 15px;
          line-height: 25px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
      }

      &.contact {
        p {
          @include sansSerifTypeface;
          font-size: 16px;
          line-height: 26px;
        }
      }
    }

    .social-icons {
      margin-top: 27px;
      ul {
        li:not(:last-child) {
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>