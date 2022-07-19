<template>
  <div class="alaCarte-page">
    <div class="alaCarte-page-wrapper">
      <div class="page-intro-2">
        <div v-if="data" class="page-intro-wrapper">
          <div class="image-wrapper">
            <div v-if="data.img" class="image-wrapper-wrapper">
              <figure v-if="data.img.url">
                <img
                  :src="$urlFor(data.img.url).width(1500).auto('format').url()"
                  :alt="data.img.alt"
                />
              </figure>
            </div>
          </div>
          <div class="text-wrapper">
            <div class="flex-col text-wrapper-wrapper">
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
              <p class="small note">
                Please note, floral varieties and availability depend on
                seasonality and we will do the best to source what we can within
                your inspiration.
              </p>
            </div>
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
  // layout: "alacarte",
};
</script>

<style lang="scss">
.alaCarte-page {
  .page-intro-2 {
    background: $buttercream;
    h1 {
      margin-bottom: 31px;
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
      margin-top: 80px;
      @include sansSerifTypeface;
      font-size: 12px;
      font-style: italic;
      font-weight: 300;
      line-height: 16px;
      letter-spacing: 0.02em;
    }
  }
}
</style>
