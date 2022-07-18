<template>
  <div class="featured-slider">
    <div class="featured-slider-wrapper grid-wrapper">
      <h2>Featured Weddings</h2>
      <p class="caption caption-uppercase">
        Click an image above to explore full gallery
      </p>
      <div class="slider-wrapper">
        <div class="wedding-slider-items" ref="slider">
          <div
            v-for="(item, index) in data"
            :key="`${item._id}${index}`"
            class="wedding-slider-item"
          >
            <nuxt-link :to="`/weddings/${item.slug.current}`">
              <figure>
                <img
                  :src="
                    $urlFor(item.img.url)
                      .width(716)
                      .height(1008)
                      .auto('format')
                      .url()
                  "
                  :alt="item.img.alt"
                  width="358"
                  height="504"
                />
              </figure>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { tns } from "~/node_modules/tiny-slider/src/tiny-slider";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.featured-slider {
  padding: 210px 0;
  text-align: left;
  overflow: hidden;
  .grid-wrapper {
    h2 {
      @media (min-width: $collapse-bp) {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
      }
      @media (max-width: $collapse-bp) {
        grid-row: 1 / 2;
        grid-column: 2 / 4;
        text-align: center;
        // overflow-wrap: break-word;
        width: 50%;
        margin: 0 auto;
      }
    }
    .slider-wrapper {
      @media (min-width: $collapse-bp) {
        grid-row: 1 / 2;
        grid-column: 2 / 9;
      }
      @media (max-width: $collapse-bp) {
        grid-row: 2 / 3;
        grid-column: 2 / 4;
      }

      width: 100%;
      overflow: hidden;
    }
    .caption {
      @media (min-width: $collapse-bp) {
        grid-row: 2 / 3;
        grid-column: 2 / 9;
      }
      @media (max-width: $collapse-bp) {
        grid-row: 3 / 4;
        grid-column: 2 / 4;
        text-align: center;
      }
      margin-top: 24px;
    }
  }
  h2 {
    @include titleStyle;
    text-transform: uppercase;
  }
  .wedding-slider-items {
    display: flex;
    @media (max-width: $collapse-bp) {
      margin-top: 35px;
      flex-direction: column;
    }
    .wedding-slider-item {
      margin-right: 10px;
      @include imageZoom;
      @media (max-width: $collapse-bp) {
        &:not(:last-child) {
          margin-bottom: 14px;
        }
      }
    }
  }
}
</style>