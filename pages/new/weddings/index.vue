<template>
  <div class="weddings-page">
    <h1 class="visually-hidden">Weddings</h1>

    <div v-if="data.weddings" class="weddings-slider base-container">
      <p class="scroll-hint btn-round">
        <span>Scroll</span>
      </p>
      <div class="slider-wrapper">
        <div class="wedding-slider-items" ref="slider">
          <nuxt-link
            v-for="(item, index) in data.weddings"
            :key="`${item._id}${index}`"
            class="wedding-slider-item"
            :ref="index === data.length - 1 ? 'lastSlide' : ''"
            :to="`/weddings/${item.slug.current}`"
          >
            <figure>
              <div v-if="item.img.url" class="image-wrapper">
                <img
                  :src="$urlFor(item.img.url).width(480).height(433).url()"
                  :alt="item.img.alt"
                  width="480"
                  height="433"
                />
              </div>

              <div v-else class="placeholder-img"></div>

              <figcaption>
                <p v-if="item.names">{{ item.names }}</p>
                <p v-if="item.location">{{ item.location }}</p>
              </figcaption>
            </figure>
          </nuxt-link>
        </div>
      </div>
      <div class="slider-instructions">
        <p class="caption-style">
          SCROLL TO EXPLORE OR CLICK AN IMAGE ABOVE FOR THE FULL GALLERY
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == 'weddingPage']{
    "weddings": slider[]->{
      _id, names, "location": location->name, slug,
      "img": {
            "url": featuredImg.image.asset->url,
            "alt": featuredImg.image.asset->altText
      }
    }
}[0]`;

export default {
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(query).then((res) => res);
    return { data };
  },
  head() {
    return {
      title: "Weddings",
    };
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
      if (!slider) {
        return;
      }
      slider.scrollLeft += event.deltaY + event.deltaX;

      // this should change depending on content of slider...
      // console.log(slider.offsetWidth, slider.scrollLeft);
      const offset = this.data.weddings.length;
      const sliderStart = slider.offsetTop;
      const sliderEnd = this.data.weddings.length * 100 - offset;
      // console.log(slider.scrollLeft, sliderEnd);
      if (slider.scrollLeft < sliderEnd && slider.scrollLeft > sliderStart) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss">
.weddings-page {
  .slider-instructions {
    margin-top: 24px;
  }
  .weddings-slider {
    padding: 127px 0;
    overflow: hidden;
    @media (min-width: $collapse-bp) {
      position: relative;
    }
    .scroll-hint {
      position: absolute;
      right: 0;
      @media (min-width: $collapse-bp) {
        top: calc(50% - 37px - 16px);
      }
      @media (max-width: $collapse-bp) {
        top: calc(50vh - 38px);
      }
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
        transition: 0.8s cubic-bezier(0.53, 0.21, 0.6, 0.45) all;
      }
      @media (max-width: $collapse-bp) {
        flex: 0 0 50%;
      }

      figure {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .placeholder-img,
        .image-wrapper {
          flex: 2;
          display: flex;
          flex-direction: column;
        }
        img {
          max-width: 100%;
          height: 100%;
          object-fit: cover;
          min-height: 430px;
          height: 430px;
          @media (min-width: $collapse-bp) {
            object-position: 50% 50%;
            transition: 0.7s cubic-bezier(0.53, 0.21, 0.6, 0.45) all;
          }
        }
        figcaption {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          @media (min-width: $collapse-bp) {
            // opacity: 0;
            transition: 0.8s ease all;
          }
          p + p {
            padding-right: 0.5ch; // offset for italic
          }
        }
      }
      &:hover {
        @media (min-width: $collapse-bp) {
          flex: 0 0 480px;
        }
        figure {
          img {
            @media (min-width: $collapse-bp) {
              object-position: 0% 100%;
            }
          }
          figcaption {
            @media (min-width: $collapse-bp) {
              opacity: 1;
            }
          }
        }
      }
    }
  }
}

.placeholder-img {
  background: $lavender;
}
</style>