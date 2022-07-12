<template>
  <div class="weddings-page">
    <h1 class="visually-hidden">Weddings</h1>
    <div v-if="data.weddings" class="weddings-slider base-container">
      <!-- <p class="scroll-hint btn-round">
        <span>Scroll</span>
      </p> -->
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
                  :src="
                    $urlFor(item.img.url)
                      .width(480 * 2)
                      .height(433 * 2)
                      .url()
                  "
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
      <div class="flex-row slider-instructions">
        <div class="text-wrapper">
          <p class="caption-style">
            SCROLL TO EXPLORE OR CLICK AN IMAGE ABOVE FOR THE FULL GALLERY
          </p>
        </div>
        <div class="flex-row slider-controls">
          <button
            @click="scrollLeft"
            :disabled="!canSliderScrollLeft"
            class="no-btn-style icon icon-transparent chevron-left"
          >
            <span>Left</span>
          </button>
          <button
            @click="scrollRight"
            :disabled="!canSliderScrollRight"
            class="no-btn-style icon icon-transparent chevron-right"
          >
            <span>Right</span>
          </button>
        </div>
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
  data() {
    return {
      scrollVal: 0,
      canSliderScrollRight: true,
      canSliderScrollLeft: false,
    };
  },
  mounted() {
    var element = document.scrollingElement || document.documentElement;
    element.addEventListener("wheel", (e) => this.transformScroll(e), {
      passive: false,
    });
  },
  computed: {
    sliderWidth() {
      const sliderWidth =
        this.data.weddings.length * 240 + (this.data.weddings.length - 1 * 22);
      return sliderWidth;
    },
  },
  methods: {
    checkSliderState() {
      const slider = this.$refs.slider;
      if (!slider) {
        return;
      }
      const scrollLeft = slider.scrollLeft;
      const sliderEnd = this.data.weddings.length * 100 + 100;
      if (scrollLeft <= 0) {
        this.canSliderScrollLeft = false;
      } else {
        this.canSliderScrollLeft = true;
      }

      if (scrollLeft >= sliderEnd) {
        this.canSliderScrollRight = false;
      } else {
        this.canSliderScrollRight = true;
      }
    },
    scrollLeft() {
      if (!process.client) {
        return;
      }
      const slider = this.$refs.slider;
      if (!slider) {
        return;
      }

      this.checkSliderState();
      slider.scroll({
        left: slider.scrollLeft - 100,
        behavior: "smooth",
      });
    },
    scrollRight() {
      if (!process.client) {
        return;
      }
      const slider = this.$refs.slider;
      if (!slider) {
        return;
      }
      this.checkSliderState();

      slider.scroll({
        left: slider.scrollLeft + 100,
        behavior: "smooth",
      });
    },
    transformScroll(event) {
      if (!event.deltaY) {
        return;
      }
      const slider = this.$refs.slider;
      if (!slider) {
        return;
      }
      slider.scrollLeft += event.deltaY + event.deltaX;

      const sliderStart = 0;
      const sliderEnd = this.data.weddings.length * 100 + 100;
      if (slider.scrollLeft < sliderEnd && slider.scrollLeft > sliderStart) {
        // console.log("freeze scroll");
        event.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss">
.weddings-page {
  @include headerMargin();
  .slider-instructions {
    margin-top: 24px;
    justify-content: space-between;
    .text-wrapper {
      flex: 0 0 60%;
      display: flex;
      align-items: flex-end;
    }
  }
  .slider-controls {
    align-items: flex-end;
    button {
      padding: 22px;
      padding-bottom: 0;
      &:last-child {
        padding-right: 0;
      }
    }

    button:disabled {
      opacity: 0.25;
    }
    .icon {
      &:after {
        background-color: $charcoal;
        transition: 0.3s ease all;
        width: 16px;
        height: 16px;
      }
      &:hover:after {
        background-color: $coral;
      }
    }
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
      overflow: hidden;
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
            opacity: 0;
            transition: 0.8s ease all;
            p {
              white-space: nowrap;
            }
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