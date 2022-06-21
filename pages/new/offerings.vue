<template>
  <div class="offerings-page">
    <h1 class="visually-hidden">Offerings</h1>
    <div class="offerings-page-wrapper">
      <div v-if="data && offeringsList" class="page-intro-2">
        <div class="page-intro-wrapper">
          <div class="image-wrapper">
            <figure v-if="data">
              <img
                :src="$urlFor(data.img.url).width(750).url()"
                :alt="data.img.alt"
              />
            </figure>
          </div>
          <div class="text-wrapper">
            <div v-if="offeringsList">
              <h1 class="title-style">Offerings</h1>
              <ul>
                <li v-for="(item, index) in offeringsList" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="offerings" class="offerings-list">
        <section
          v-for="item in offerings"
          :key="item._id"
          class="offerings-list-item"
        >
          <div class="text-wrapper">
            <h2 v-if="item.name">{{ item.name }}</h2>
            <p v-if="item.description">{{ item.description }}</p>

            <div v-if="item.name === 'A La Carte'" class="cta-button-wrapper">
              <nuxt-link to="/alacarte" class="btn"
                ><span class="title-style"
                  >A La Carte Order Form</span
                ></nuxt-link
              >
            </div>
          </div>
          <div class="image-wrapper">
            <figure v-if="item.img.url">
              <img
                :src="$urlFor(item.img.url).width(354).height(498).url()"
                :alt="data.img.alt"
                width="354"
                height="498"
              />
            </figure>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>



<script>
import { groq } from "@nuxtjs/sanity";

const query1 = groq`*[_type == "offeringsPage"]{
  "img": {
    "url": img.image.asset->url,
    "alt": img.image.asset->altText
  }
}[0]`;

const query2 = groq`*[_type == "services"]{
  name,
  description,
  _id,
    "img": {
    "url": img.image.asset->url,
    "alt": img.image.asset->altText
  }
}|order(orderRank)`;

export default {
  head() {
    return {
      title: "Offerings",
    };
  },
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(query1).then((res) => res);
    const offerings = await $sanity.fetch(query2).then((res) => res);
    return { data, offerings };
  },
  computed: {
    offeringsList() {
      if (!this.offerings) {
        return undefined;
      }
      let list = [];
      this.offerings.forEach((item) => {
        list.push(item.name);
      });
      return list;
    },
  },
};
</script>


<style lang="scss">
.offerings-page {
  .offerings-page-wrapper {
    .offerings-list {
      .offerings-list-item {
        @include imageTextCols();
        .cta-button-wrapper {
          margin-top: 48px;
        }
      }
    }
  }
}
</style>