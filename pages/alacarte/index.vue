<template>
  <div class="alaCarte-page">
    <div class="alaCarte-page-wrapper">
      <div class="page-intro">
        <div class="page-intro-wrapper">
          <div class="image-wrapper">
            <figure v-if="data">
              <img :src="data.img.url" :alt="data.img.alt" />
            </figure>
          </div>
          <div class="flex-col text-wrapper">
            <h1>A La Carte Orders</h1>
            <ol>
              <li>Answer questions below.</li>
              <li>List which items you would like to order.</li>
              <li>
                Please list if you ever need any extra greenery or other items
                if you are a planner.
              </li>
              <li>Click Submit.</li>
              <li>We will send you a custom invoice.</li>
              <li>Pick up your flowers!</li>
            </ol>
            <p class="small">
              Please note, floral varieties and availability depend on
              seasonality and we will do the best to source what we can within
              your inspiration.
            </p>
          </div>
        </div>
      </div>
      <!-- <pageIntro :schemaType="schemaType" /> -->
      <section>
        <h2 class="purple-banner-title">Items We Offer</h2>
        <alacarteOfferings />
      </section>
      <section>
        <h2 class="purple-banner-title">A La Carte Order Form</h2>
        <alacarteForm successRoute="alacarte/success" />
      </section>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == 'alaCartePage']{
          "img": {
            "url": img.image.asset->url,
            "alt": img.image.asset->altText
        } 
}[0]`;

export default {
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(query).then((res) => res);
    return { data };
  },
  data() {
    return {
      title: "A La Carte",
      schemaType: "alaCartePage",
    };
  },
  layout: "alacarte",
};
</script>

<style lang="scss">
.alaCarte-page {
  .page-intro {
    background: $buttercream;
    .page-intro-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;

      @media (max-width: $collapse-bp) {
        display: flex;
        flex-direction: column;
      }
      .image-wrapper {
        overflow: hidden;
        @media (max-width: $collapse-bp) {
          min-height: 100vw;
        }
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
      .text-wrapper {
        padding: 120px 60px;
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
}
</style>
