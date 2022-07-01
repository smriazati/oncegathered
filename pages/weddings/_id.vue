<template>
  <div class="wedding-page">
    <div class="wedding-page-wrapper grid-wrapper" v-if="data">
      <div v-if="nextSlug" class="pagination">
        <nuxt-link :to="`/weddings/${nextSlug}`" class="btn btn-round"
          ><span>Next</span></nuxt-link
        >
      </div>
      <div class="text-wrapper">
        <h1 v-if="data.names">{{ data.names }}</h1>
        <ul>
          <li v-if="data.location">
            <span v-if="data.location.url">
              <a :href="data.location.url" target="_blank">{{
                data.location.name
              }}</a>
            </span>
            <span v-else>
              {{ data.location.name }}
            </span>
          </li>
          <li v-if="data.photographer">
            <span v-if="data.photographer.url">
              <a :href="data.photographer.url" target="_blank">{{
                data.photographer.name
              }}</a>
            </span>
            <span v-else>
              {{ data.photographer.name }}
            </span>
          </li>
          <li v-if="data.planner">
            <span v-if="data.planner.url">
              <a :href="data.planner.url" target="_blank">{{
                data.planner.name
              }}</a>
            </span>
            <span v-else>
              {{ data.planner.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="image-wrapper" v-if="hasFeatured">
        <figure>
          <img
            :src="$urlFor(data.featuredImg.url).width(480).url()"
            :alt="data.featuredImg.alt"
            width="480"
          />
        </figure>
      </div>
      <div ref="gallery" class="gallery-wrapper" v-if="data.gallery">
        <figure v-for="item in data.gallery" :key="item._key">
          <img
            :src="$urlFor(item.url).width(480).url()"
            :alt="item.alt"
            width="480"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

export default {
  async asyncData({ params, $sanity }) {
    const query = groq`*[_type == "weddings" && slug.current == "${params.id}"]{
        names,
        _id,
        photographer,
        planner,
        "location": {
            "name": location->name,
            "url": location->url
        },
        "featuredImg": {
            "url": featuredImg.image.asset->url,
            "alt": featuredImg.image.asset->altText
        },
        "gallery": gallery[]{
            _key,
            "url": image.asset->url,
            "alt": image.asset->altText
        }
    }[0]`;
    const data = await $sanity.fetch(query).then((res) => res);
    return { data };
  },
  head() {
    return {
      title: `${
        this.data.location.name
          ? ` ${this.data?.names} at ${this.data?.location.name}`
          : ` ${this.data?.names}`
      }`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${
            this.data.location.name
              ? ` ${this.data?.names} wedding at ${this.data?.location.name}`
              : ` ${this.data?.names} wedding`
          } with flowers by Once Gathered.`,
        },
      ],
    };
  },
  data() {
    return {
      nextSlug: undefined,
    };
  },
  mounted() {
    this.setNextBtn();
    this.$nextTick(() => {
      this.setAnimation();
    });
  },
  methods: {
    setAnimation() {
      if (!gsap) {
        return;
      }
      const gallery = this.$refs.gallery;
      if (!gallery) {
        return;
      }
      const pics = Array.from(gallery.querySelectorAll("figure"));
      pics.forEach((pic) => {
        gsap.set(pic, {
          opacity: 0,
        });
        // console.log(pic.prevSibling);
        gsap.to(pic, {
          opacity: 1,
          scrollTrigger: {
            trigger: pic,
            // markers: true,
            start: "top bottom",
            end: `+=${pic.offsetHeight}px`,
            scrub: true,
          },
        });
      });
    },
    async setNextBtn() {
      const allWeddingsQuery = groq`*[_type == "weddings"]|order(_createdAt asc)`;
      const allWeddings = await this.$sanity
        .fetch(allWeddingsQuery)
        .then((res) => res);

      let thisIndex;
      for (var i = 0; i < allWeddings.length; i++) {
        if (allWeddings[i]._id === this.data._id) {
          thisIndex = i;
        }
      }

      let nextIndex;
      if (thisIndex === allWeddings.length - 1) {
        nextIndex = 0;
      } else {
        nextIndex = thisIndex + 1;
      }

      this.nextSlug = allWeddings[nextIndex].slug.current;
    },
  },
  computed: {
    hasGallery() {
      if (!this.data.gallery) {
        return false;
      }
      if (this.data.gallery.length < 1) {
        return false;
      }
      if (!this.data.gallery[0]?.url) {
        return false;
      }
      return true;
    },
    hasFeatured() {
      if (!this.data.featuredImg) {
        return false;
      }
      if (!this.data.featuredImg.url) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss">
.wedding-page {
  @include headerMargin;
  padding: 33px 0;
  .pagination {
    position: fixed;
    @media (min-width: $collapse-bp) {
      right: 0;
      top: calc(50vh - 38px);
    }

    @media (max-width: $collapse-bp) {
      right: 5px;
      bottom: 5px;
    }
  }
  .grid-wrapper {
    @media (max-width: $collapse-bp) {
      grid-row-gap: 30px;
    }
    .text-wrapper {
      @media (min-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 1 / 3;
        &:not(:last-child) {
          padding-top: 25vh;
        }
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 2 / 3;
      }
    }
    .image-wrapper {
      @media (min-width: $collapse-bp) {
        grid-row: 1 / 2;
        grid-column: 5 / span 3;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 1 / 2;
        place-self: center;
      }
    }
    .gallery-wrapper {
      @media (min-width: $collapse-bp) {
        grid-column: 5 / span 3;
        grid-row: 2 / 3;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 3 / 4;
        place-self: center;
      }
    }
  }

  .text-wrapper {
    text-align: center;

    h1 {
      @include displaySmStyle;
    }
    ul {
      list-style: none;
      padding: 0;
    }
  }

  .gallery-wrapper {
    figure {
      width: 100%;
      img {
        @media (min-width: $collapse-bp) {
          min-width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>