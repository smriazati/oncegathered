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
      <div class="image-wrapper">
        <figure v-if="data.img.url">
          <img
            :src="$urlFor(data.img.url).width(354).height(498).url()"
            :alt="data.img.alt"
            width="354"
            height="498"
          />
        </figure>
      </div>
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