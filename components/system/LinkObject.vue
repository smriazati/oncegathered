<template>
  <div class="link-object">
    <div v-if="data.type === 'internal' && data.destination">
      <nuxt-link :to="`/${data.destination}`" class="btn btn-round"
        ><span>{{ linkText }}</span></nuxt-link
      >
    </div>
    <div v-if="data.type === 'external' && data.url">
      <a :href="`/${data.url}`" target="_blank" class="btn btn-round"
        ><span>{{ linkText }}</span></a
      >
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
  computed: {
    linkText() {
      if (this.data.linkText) {
        return this.data.linkText;
      } else {
        return "Learn More";
      }
    },
  },
};
</script>