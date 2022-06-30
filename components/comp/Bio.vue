<template>
  <div class="comp-bio">
    <div class="comp-bio-wrapper">
      <div class="text-wrapper">
        <h3 v-if="data.name">
          <span v-if="data.position">{{ data.position }}, </span>
          {{ data.name }}
        </h3>
        <p v-if="data.bio">{{ data.bio }}</p>
      </div>
      <!-- <div class="image-wrapper">
        <figure v-if="data.img.url">
          <img
            :src="$urlFor(data.img.url).width(354).height(498).url()"
            :alt="data.img.alt"
            width="354"
            height="498"
          />
        </figure>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.comp-bio {
  // @include imageTextCols();
  @include baseGrid;

  .comp-bio-wrapper {
    @media (min-width: $collapse-bp) {
      grid-column: 2 / span 6;
      padding: 90px 0;
    }

    @media (max-width: $collapse-bp) {
      grid-column: 1 / 5;
      padding: 45px 0;
    }

    text-align: center;
    h2,
    h3 {
      margin-bottom: 44px;
    }
  }
}
</style>