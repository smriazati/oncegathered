<template>
  <div class="about-page">
    <div class="about-page-wrapper">
      <h1 class="visually-hidden">About</h1>
      <div class="page-intro-2">
        <div v-if="data" class="page-intro-wrapper">
          <div class="image-wrapper">
            <div v-if="data.featuredImg" class="image-wrapper-wrapper">
              <figure v-if="data.featuredImg.url">
                <img
                  :src="$urlFor(data.featuredImg.url).width(750).url()"
                  :alt="data.featuredImg.alt"
                />
              </figure>
            </div>
          </div>
          <div class="text-wrapper">
            <div v-if="data.featuredText" class="text-wrapper-wrapper">
              <h2 v-if="data.featuredText.headline" class="display-sm-style">
                {{ data.featuredText.headline }}
              </h2>
              <h3 v-if="data.featuredText.body" class="text-style">
                {{ data.featuredText.body }}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div v-if="data.centeredText" class="base-container">
        <CompCenteredText :data="data.centeredText" theme="transparent" />
      </div>

      <!-- <div v-if="data.featuredTeam">
        <CompBio :data="data.featuredTeam" />
      </div> -->
      <div class="team-list" v-if="data.team">
        <CompBio v-for="item in data.team" :key="item._id" :data="item" />
      </div>
    </div>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == "aboutPage"]{
  "featuredImg": {
        "url": img.image.asset->url,
        "alt": img.image.asset->altText
      },
  "featuredText": featured_text,
  "team": team[]->{
    name, position, bio, _id
  }
}[0]`;

export default {
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(query).then((res) => res);
    return { data };
  },
  head() {
    return {
      title: "About",
    };
  },
};
</script>

<style lang="scss">
.about-page {
  .about-page-wrapper {
    .team-list {
      padding: 90px 0;
    }

    .page-intro-2 {
      .text-wrapper {
        .text-wrapper-wrapper {
          @media (max-width: $collapse-bp) {
            padding-top: 44px;
          }
          > *:not(:last-child) {
            margin-bottom: 44px;
          }
        }
      }
    }
  }
}
</style>