<template>
  <span v-if="content">
    <figure>
      <img
        :src="$urlFor(content.submark.url)"
        :alt="content.submark.alt"
        :width="width"
      />
    </figure>
  </span>
</template>


<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "brand"]{
    "submark": {
     "url": siteSubmark.image.asset->url,
     "alt": siteSubmark.image.asset->altText
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
