<template>
  <div class="weddings-page">
    <h1 class="visually-hidden">Weddings</h1>

    <div v-if="data" class="weddings-slider base-container">
      <p class="scroll-hint btn-round">
        <span>Scroll</span>
      </p>
      <div class="slider-wrapper">
        <div class="wedding-slider-items" ref="slider">
          <nuxt-link
            v-for="(item, index) in data"
            :key="`${item._id}${index}`"
            class="wedding-slider-item"
            :ref="index === data.length - 1 ? 'lastSlide' : ''"
            :to="`/weddings/${item.slug.current}`"
          >
            <figure>
              <img
                :src="$urlFor(item.img.url).width(480).height(433).url()"
                :alt="item.img.alt"
                width="480"
                height="433"
              />
              <figcaption>
                <p v-if="item.names">{{ item.names }}</p>
                <p v-if="item.location">{{ item.location }}</p>
              </figcaption>
            </figure>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

export default {
  head() {
    return {
      title: "Weddings",
    };
  },
  data() {
    return {
      data: [],
      queryString: `"weddings": slider[]->{_id, names, "location": location->name, slug,
            "img": {
              "url": featuredImg.image.asset->url,
              "alt": featuredImg.image.asset->altText
            }`,
      lastIndexFetched: undefined,
      itemsToFetch: 20,
      endOfContent: false,
      isFetching: false,
    };
  },
  beforeMount() {
    this.getInitialContent();
  },
  mounted() {
    var element = document.scrollingElement || document.documentElement;
    element.addEventListener("wheel", (e) => this.transformScroll(e), {
      passive: false,
    });
  },
  methods: {
    transformScroll(event) {
      if (!event.deltaY) {
        return;
      }
      const slider = this.$refs.slider;
      slider.scrollLeft += event.deltaY + event.deltaX;

      // this should change depending on content of slider...
      // console.log(slider.offsetWidth, slider.scrollLeft);
      let sliderEnd = this.data.length * 100;
      if (slider.scrollLeft < sliderEnd) {
        event.preventDefault();
      }
    },
    async getInitialContent() {
      const query = groq`*[_type == "weddingPage"]{${
        this.queryString
      }}[${0}...${this.itemsToFetch}]}[0]`;
      const data = await this.$sanity.fetch(query).then((res) => res.weddings);
      this.lastIndexFetched = this.itemsToFetch - 1;
      this.data = data;
    },

    async loadMore() {
      console.log("loading more");
      if (this.endOfContent) {
        return;
      }
      const newIndex = this.lastIndexFetched + 1;
      const query = groq`*[_type == "weddingPage"]{${
        this.queryString
      }}[${newIndex}...${newIndex + this.itemsToFetch}]}[0]`;
      this.lastIndexFetched = newIndex + this.itemsToFetch;
      const data = await this.$sanity.fetch(query).then((res) => res.weddings);
      if (data.length < 1) {
        this.endOfContent = true;
      }
      this.isFetching = false;
      //   const slider = this.$refs.slider;
      //   slider.scrollBy(slider.scrollLeft + 120, 0);
      console.log("i fetched this", data);
      this.data.push(...data);
    },
  },
};
</script>

<style lang="scss">
.weddings-page {
  .weddings-slider {
    padding: 127px 0;
    overflow: hidden;
    position: relative;
    .scroll-hint {
      position: absolute;
      right: 0;
      top: calc(50% - 37px - 16px);
    }
  }

  .wedding-slider-items {
    display: flex;
    overflow-x: scroll;

    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    &::-webkit-scrollbar {
      /* WebKit */
      width: 0;
      height: 0;
    }
    .wedding-slider-item {
      margin-right: 24px;
      @media (min-width: $collapse-bp) {
        flex: 0 0 240px;
        min-height: 430px;
        transition: 0.8s cubic-bezier(0.53, 0.21, 0.6, 0.45) all;
      }
      figure {
        width: 100%;
        overflow: hidden;
        img {
          max-width: 100%;
          min-height: 100%;
          object-fit: cover;
          object-position: 50% 50%;
          transition: 0.7s cubic-bezier(0.53, 0.21, 0.6, 0.45) all;
        }
        figcaption {
          display: flex;
          justify-content: space-between;
          opacity: 0;
          transition: 0.8s ease all;
        }
      }
      &:hover {
        @media (min-width: $collapse-bp) {
          flex: 0 0 480px;
        }
        figure {
          img {
            object-position: 0% 100%;
          }
        }
        figcaption {
          opacity: 1;
        }
      }
    }
  }
}
</style>