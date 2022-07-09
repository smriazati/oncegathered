<template>
  <div class="home-page">
    <h1 class="visually-hidden">Home</h1>
    <div class="home-page-wrapper" ref="wrapper" v-if="data.content">
      <CompBanner
        :data="data.content.banner"
        @on-image-load="onBannerImageLoad"
      />
      <CompCenteredText
        :data="data.content.centeredText1"
        theme="deep-green"
        class="gsap-scale-in scroll-hint-trigger-wrapper"
      />
      <CompFeaturedSlider :data="data.content.featuredSlider" />
      <div class="featured-testimonial gsap-scale-in">
        <div
          v-if="data.content.quote"
          class="featured-testimonial-wrapper grid-wrapper"
        >
          <div class="text-wrapper">
            <figure>
              <blockquote v-if="data.content.quote.quote">
                &ldquo;{{ data.content.quote.quote }}&rdquo;
              </blockquote>
              <figcaption v-if="data.content.quote.attribution">
                &mdash;{{ data.content.quote.attribution }}
              </figcaption>
            </figure>
          </div>
          <div class="image-wrapper">
            <figure v-if="data.content.quote.img.url">
              <img
                :src="$urlFor(data.content.quote.img.url).width(984).url()"
                :alt="data.content.quote.img"
                width="984"
              />
            </figure>
          </div>
        </div>
      </div>
      <div class="call-to-action gsap-scale-in">
        <div
          class="call-to-action-wrapper base-container flex-col flex-col-center"
        >
          <p v-if="data.content.ctaText" class="display-sm-style">
            {{ data.content.ctaText }}
          </p>
          <p v-if="data.siteEmail" class="display-sm-style">
            <a :href="`mailto:${data.siteEmail}`">{{ data.siteEmail }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { groq } from "@nuxtjs/sanity";

const query = groq`*[_type in ["homePage", "contactInfo"]]{
  'content': *[_type=='homePage']{
    "banner": {
     "img": {
       "url": banner.img.image.asset->url,
       "alt": banner.img.image.asset->altText
     }
  },
  "quote": {
    "quote": quote.quote, 
    "attribution": quote.attribution,
    "img": {
      "url": quote.image.image.asset->url,
       "alt":  quote.image.image.asset->altText,
      }
   
  },
  ctaText,
  centeredText1,
   "featuredSlider": slider[]->{
     _id, names, slug, "location": location->name, 
     "img": {
       "url": featuredImg.image.asset->url,
       "alt": featuredImg.image.asset->altText
     }
    }
  }[0],
  siteEmail
}[0]`;

export default {
  head() {
    return {
      title: "Home",
    };
  },
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(query).then((res) => res);
    return { data };
  },
  mounted() {
    this.setAnimation();
  },
  methods: {
    onBannerImageLoad(payload) {
      if (payload) {
        console.log("image loaded");
        this.setBannerBtnAnimation();
      }
    },
    setAnimation() {
      gsap.registerPlugin(ScrollTrigger);
      this.setSectionAnimation();
      // this.setBannerBtnAnimation();
    },
    setBannerBtnAnimation() {
      const wrapper = this.$refs.wrapper;
      if (!wrapper) {
        return;
      }

      const btn = document.getElementById("scroll-hint");
      const trigger = wrapper.querySelector(
        ".scroll-hint-trigger-wrapper .link-object a"
      );
      console.log(btn.clientTop, trigger.clientTop);
      if (!btn || !trigger) {
        return;
      }
      const btnContainerPadding = 164; // fixed padding
      const btnHeight = 55;
      const triggerOffset = trigger.offsetTop;
      gsap.set(btn, {
        scale: 1,
        y: 50,
      });
      gsap.to(btn, {
        y: btnContainerPadding + btnHeight + triggerOffset,
        scale: 0,
        scrollTrigger: {
          // markers: true,
          start: "top top",
          end: () => {
            return `"+=${trigger.offsetTop}"`;
          },
          scrub: 1.1,
        },
      });
    },
    setSectionAnimation() {
      const wrapper = this.$refs.wrapper;
      if (!wrapper) {
        return;
      }
      const sections = Array.from(wrapper.children);
      sections.forEach((section) => {
        gsap.set(section, {
          // opacity: 0,
          y: 100,
        });
        gsap.to(section, {
          // opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            // markers: true,
            start: () => {
              return `top-=${
                window.innerHeight / 2 + window.innerHeight / 3
              }px top`;
            },
            end: () => {
              return `+=${window.innerHeight / 3}px`;
            },
            scrub: 0.8,
          },
        });

        const sectionWrapper = Array.from(
          section.querySelectorAll(".gsap-scale-in")
        )[0];
        gsap.set(sectionWrapper, {
          scale: 0.9,
        });
        gsap.to(sectionWrapper, {
          scale: 1,
          scrollTrigger: {
            trigger: section,
            // markers: true,
            start: () => {
              return `top-=${
                window.innerHeight / 2 + window.innerHeight / 4
              }px top`;
            },
            end: () => {
              return `+=${window.innerHeight / 2}px`;
            },
            scrub: 2,
          },
        });
      });
    },
  },
};
</script>

<style lang="scss">
.home-page {
  @include headerMargin();
}
.featured-testimonial {
  .grid-wrapper {
    .text-wrapper {
      @media (min-width: $collapse-bp) {
        grid-column: 2 / span 4;
        grid-row: 1 / 2;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 1 / 2;
        text-align: center;
      }
    }
    .image-wrapper {
      @media (min-width: $collapse-bp) {
        grid-column: 6 / span 3;
        grid-row: 1 / 2;
        padding-top: 80px;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
        grid-row: 2 / 3;
        place-self: center;
        padding-top: 24px;
      }
    }
  }

  .featured-testimonial-wrapper {
    .text-wrapper {
      figure {
        figcaption {
          margin-top: 23px;
          text-align: center;
        }
      }
    }
  }
}

figure {
  blockquote {
    @include displayStyle;
  }
  blockquote + figcaption {
    @include titleStyle;
  }
}
.call-to-action {
  padding: 150px 0;
  .call-to-action-wrapper {
    > *:not(:last-child) {
      margin-bottom: 33px;
    }
  }
}
</style>