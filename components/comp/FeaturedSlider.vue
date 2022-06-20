<template>
  <div class="featured-slider">
    <div class="featured-slider-wrapper grid-wrapper">
      <h2>Weddings</h2>
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
                  :src="$urlFor(item.img.url).width(358).height(504).url()"
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
  .grid-wrapper {
    h2 {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }
    .slider-wrapper {
      grid-row: 1 / 2;
      grid-column: 2 / 9;
      width: 100%;
      overflow: hidden;
    }
    .caption {
      grid-row: 2 / 3;
      grid-column: 2 / 9;
      margin-top: 24px;
    }
  }
  h2 {
    @include titleStyle;
    text-transform: uppercase;
  }
  .wedding-slider-items {
    display: flex;
    .wedding-slider-item {
      margin-right: 10px;
    }
  }
}
</style>