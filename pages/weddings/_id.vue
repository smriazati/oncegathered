<template>
  <div class="wedding-page" ref="container">
    <div class="wedding-page-wrapper" v-if="data" ref="wrapper">
      <div class="grid-wrapper grid-wrapper-gallery">
        <div class="image-wrapper" v-if="hasFeatured">
          <figure>
            <img
              @load="handleLoad"
              :src="$urlFor(data.featuredImg.url).width(480).url()"
              :alt="data.featuredImg.alt"
              width="480"
            />
          </figure>
        </div>
        <div ref="gallery" class="gallery-wrapper" v-if="data.gallery">
          <figure v-for="item in data.gallery" :key="item._key">
            <img
              @load="handleLoad"
              :src="$urlFor(item.url).width(480).url()"
              :alt="item.alt"
              width="480"
            />
          </figure>
        </div>
      </div>
      <div class="grid-wrapper grid-wrapper-text">
        <div class="text-wrapper" ref="text">
          <h1 v-if="data.names">{{ data.names }}</h1>
          <ul>
            <li v-if="data.location">
              <span v-if="data.location.url">
                <a :href="data.location.url" target="_blank">{{
                  data.location.name
                }}</a>
              </span>
              <span v-else>
                {{ data.location.name }}
              </span>
            </li>
            <li v-if="data.photographer">
              <span v-if="data.photographer.url">
                <a :href="data.photographer.url" target="_blank">{{
                  data.photographer.name
                }}</a>
              </span>
              <span v-else>
                {{ data.photographer.name }}
              </span>
            </li>
            <li v-if="data.planner">
              <span v-if="data.planner.url">
                <a :href="data.planner.url" target="_blank">{{
                  data.planner.name
                }}</a>
              </span>
              <span v-else>
                {{ data.planner.name }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="nextSlug" class="pagination">
        <nuxt-link :to="`/weddings/${nextSlug}`" class="btn btn-round"
          ><span>Next</span></nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ params, $sanity }) {
    const query = groq`*[_type == "weddings" && slug.current == "${params.id}"]{
        names,
        _id,
        photographer,
        planner,
        "location": {
            "name": location->name,
            "url": location->url
        },
        "featuredImg": {
            "url": featuredImg.image.asset->url,
            "alt": featuredImg.image.asset->altText
        },
        "gallery": gallery[]{
            _key,
            "url": image.asset->url,
            "alt": image.asset->altText
        }
    }[0]`;
    const data = await $sanity.fetch(query).then((res) => res);
    return { data };
  },
  head() {
    return {
      title: `${
        this.data.location.name
          ? ` ${this.data?.names} at ${this.data?.location.name}`
          : ` ${this.data?.names}`
      }`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${
            this.data.location.name
              ? ` ${this.data?.names} wedding at ${this.data?.location.name}`
              : ` ${this.data?.names} wedding`
          } with flowers by Once Gathered.`,
        },
      ],
    };
  },
  scrollToTop: true,
  data() {
    return {
      // containerHeight: undefined,
      nextSlug: undefined,
      imagesLoaded: 0,
    };
  },
  mounted() {
    this.registerScrollTrigger();
    this.watchDivHeight();
    this.setNextBtn();
  },
  beforeDestroy() {
    // console.log("killing st");
    ScrollTrigger.getAll().forEach((t) => t.kill());
  },
  methods: {
    registerScrollTrigger() {
      if (!gsap) {
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
    },
    watchDivHeight() {
      const wrapper = this.$refs.wrapper;
      const resize_ob = new ResizeObserver(() => {
        // console.log("div height change");
        this.$nextTick(() => {
          // this.setAnimation();
          ScrollTrigger.refresh();
        });
      });
      resize_ob.observe(wrapper);
    },
    handleLoad() {
      this.imagesLoaded++;
      // console.log("img loaded");

      this.$nextTick(() => {
        this.setAnimation();
      });
    },
    setAnimation() {
      const footer = document.querySelector("footer.site-footer");
      // console.log(footer);
      const text = this.$refs.text;
      if (!footer || !text) {
        return;
      }
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top top",
          endTrigger: footer,
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: 1.1,
          markers: true,
        },
      });
    },
    async setNextBtn() {
      const allWeddingsQuery = groq`*[_type == "weddings"]|order(_createdAt asc)`;
      const allWeddings = await this.$sanity
        .fetch(allWeddingsQuery)
        .then((res) => res);

      let thisIndex;
      for (var i = 0; i < allWeddings.length; i++) {
        if (allWeddings[i]._id === this.data._id) {
          thisIndex = i;
        }
      }

      let nextIndex;
      if (thisIndex === allWeddings.length - 1) {
        nextIndex = 0;
      } else {
        nextIndex = thisIndex + 1;
      }

      this.nextSlug = allWeddings[nextIndex].slug.current;
    },
  },
  computed: {
    hasGallery() {
      if (!this.data.gallery) {
        return false;
      }
      if (this.data.gallery.length < 1) {
        return false;
      }
      if (!this.data.gallery[0]?.url) {
        return false;
      }
      return true;
    },
    hasFeatured() {
      if (!this.data.featuredImg) {
        return false;
      }
      if (!this.data.featuredImg.url) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss">
.wedding-page {
  @include headerMargin;
  padding: 33px 0;
  .pagination {
    position: fixed;
    @media (min-width: $collapse-bp) {
      right: 0;
      top: calc(50vh - 38px);
    }

    @media (max-width: $collapse-bp) {
      right: 5px;
      bottom: 5px;
    }
  }

  .wedding-page-wrapper {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    > * {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }
  }

  .grid-wrapper-text {
    width: 100%;
  }
  .grid-wrapper {
    @media (max-width: $collapse-bp) {
      grid-row-gap: 30px;
    }
    .text-wrapper {
      @media (min-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 1 / 3;
        padding-top: 25vh;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 2 / 3;
      }
    }
    .image-wrapper {
      @media (min-width: $collapse-bp) {
        grid-row: 1 / 2;
        grid-column: 5 / span 3;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 1 / 2;
        place-self: center;
      }
    }
    .gallery-wrapper {
      @media (min-width: $collapse-bp) {
        grid-column: 5 / span 3;
        grid-row: 2 / 3;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 3 / 4;
        place-self: center;
      }
    }
  }

  .text-wrapper {
    text-align: center;

    h1 {
      @include displaySmStyle;
    }
    ul {
      list-style: none;
      padding: 0;
    }
  }

  .gallery-wrapper {
    margin-top: 36px;
    figure {
      width: 100%;
      padding-bottom: 36px;
      img {
        @media (min-width: $collapse-bp) {
          min-width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>