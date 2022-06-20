<!-- <template>
  <div v-if="data" class="slider">
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
  async mounted() {
    if (!process.client) {
      return;
    }
    const { tns } = await import("~/node_modules/tiny-slider/src/tiny-slider");
    // https://github.com/ganlanyuan/tiny-slider#options
    // init slider
    const slider = tns({
      container: this.$refs.slider,
      items: 3,
      loop: true,
      controls: true,
      arrowKeys: true,
      nav: false,
    });
  },
};
</script>

<style lang="scss">
.tns-liveregion {
  display: none;
}
</style> -->