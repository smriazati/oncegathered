<template>
  <div class="page-intro" :class="schemaType">
    <div class="page-intro-wrapper">
      <div class="image-wrapper">
        <figure v-if="content">
          <img :src="content.img.url" :alt="content.img.alt" />
        </figure>
      </div>
      <div v-if="schemaType == 'alaCartePage'" class="flex-col text-wrapper">
        <h1>A La Carte Orders</h1>
        <ol>
          <li>Answer questions below.</li>
          <li>List which items you would like to order.</li>
          <li>Upload 2-3 photos of inspiration.</li>
          <li>
            Please list if you ever need any extra greenery or other items if
            you are a planner.
          </li>
          <li>Click Submit.</li>
          <li>We will send you a custom invoice.</li>
          <li>Pick up your flowers!</li>
        </ol>
        <p class="small">
          Please note, floral varieties and availability depend on seasonality
          and we will do the best to source what we can within your inspiration.
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async fetch() {
    const query = groq`*[_type == "${this.schemaType}"]{
        "img": {
            "url": pageIntro.introImg.image.asset->url,
            "alt": pageIntro.introImg.image.asset->altText
        } 
        }[0]`;
    this.content = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  props: {
    schemaType: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    content: null,
  }),
};
</script>

<style lang="scss">
.page-intro {
  background: $buttercream;
  .page-intro-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;

    .image-wrapper {
      overflow: hidden;
      figure {
        width: 100%;
        height: 100%;
        img {
          min-width: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }
      }
    }
  }

  &.alaCartePage {
    .text-wrapper {
      padding: 0 60px;
      justify-content: center;
      > *:not(:last-child) {
        padding-bottom: 60px;
      }
      h1 {
        @include bodyTypeface;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 25px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      ol {
        padding-left: 20px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        li:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      p.small {
        font-size: 12px;
        font-style: italic;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0.02em;
      }
    }
  }
}
</style>