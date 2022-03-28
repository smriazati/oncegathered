<template>
  <div class="offerings">
    <div v-if="content" class="content-wrapper">
      <div v-for="item in content" :key="item._id" class="content-item">
        <div class="image-wrapper" v-if="item.img">
          <figure>
            <img :src="item.img.url" :alt="item.img.alt" width="300" />
          </figure>
        </div>
        <div class="text-wrapper flex-col">
          <p v-if="item.title" class="title">{{ item.title }}</p>
          <p v-if="item.price" class="price">${{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
const query = groq`*[_type == "offerings" && isHidden != true]|order(orderRank){
  _id,
  title,
  price,
 "img": {
     "url": img.image.asset->url,
     "alt": img.image.asset->altText
   }
    }`;
export default {
  async fetch() {
    this.content = await this.$sanity.fetch(query);
  },
  fetchOnServer: false,
  data: () => ({
    content: null,
  }),
};
</script>

<style lang="scss">
.offerings {
  .content-wrapper {
    padding: 80px 0;
    @include baseContainer;
  }
  .content-item {
    display: grid;
    grid-template: 1fr / 1fr;
    justify-items: center;
    margin: 80px 0;
    > * {
      grid-column: 1 / 1;
      grid-row: 1 / 1;
    }
    .image-wrapper {
      margin-top: -5%;
      opacity: 0;
      transition: 0.3s ease opacity;
      figure {
        height: 0;
      }
    }

    &:nth-child(even) {
      .image-wrapper {
        justify-self: end;
      }
    }

    &:nth-child(odd) {
      .image-wrapper {
        justify-self: start;
      }
    }

    &:hover {
      .image-wrapper {
        opacity: 1;
      }
    }

    .text-wrapper {
      text-align: center;
      .title {
        font-family: Queens Trial;
        font-size: 48px;
        font-style: italic;
        font-weight: 300;
        line-height: 42px;
        letter-spacing: 0em;
        text-align: center;
      }
      .price {
        //styleName: Body;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0em;
        text-align: center;
      }
    }
  }
}
</style>