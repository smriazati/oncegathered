<template>
  <div class="about-page">
    <div class="about-page-wrapper">
      <h1 class="visually-hidden">About</h1>
      <div v-if="data.centeredText" class="base-container">
        <CompCenteredText :data="data.centeredText" theme="transparent" />
      </div>

      <div v-if="data.featuredTeam">
        <CompBio :data="data.featuredTeam" />
      </div>
      <div v-if="data.team">
        <h2 class="yellow-banner-title">Team</h2>
        <CompBio v-for="item in data.team" :key="item._id" :data="item" />
      </div>
    </div>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type == "aboutPage"]{
  centeredText,
  "featuredTeam": {
    "name": featuredTeam->name,
    "position": featuredTeam->position,
    "bio": featuredTeam->bio,
    "img": {
      "url": featuredTeam->img.image.asset->url,
      "alt": featuredTeam->img.image.asset->altText,
    }
  },
  "team": team[]->{
    name, position, bio, _id,
    "img": {
      "url": img.image.asset->url,
      "alt": img.image.asset->altText,
    }
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
    .comp-bio-wrapper {
      @include imageTextCols();
    }
  }
}
</style>