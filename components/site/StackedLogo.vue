<template>
  <span v-if="content">
    <figure>
      <img
        :src="$urlFor(content.logo.url)"
        :alt="content.logo.alt"
        :width="width"
      />
    </figure>
  </span>
</template>


<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "brand"]{
    "logo": {
     "url": siteSecondaryLogo.image.asset->url,
     "alt": siteSecondaryLogo.image.asset->altText
   } 
}[0]`;
export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
  },
  async fetch() {
    this.content = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  data: () => ({
    content: null,
  }),
};
</script>
