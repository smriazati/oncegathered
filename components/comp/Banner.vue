<template>
  <div class="comp-banner">
    <div class="comp-banner-wrapper grid-wrapper">
      <figure ref="img">
        <img
          :src="$urlFor(data.img.url).width(984).url()"
          :alt="data.img.alt"
          width="984"
        />
      </figure>
      <div class="scroll-hint" ref="btn">
        <div class="btn btn-round"><span>Scroll</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.setAnimation();
  },
  methods: {
    setAnimation() {
      gsap.registerPlugin(ScrollTrigger);
      this.setImgAnimation();
      this.setBtnAnimation();
    },
    setImgAnimation() {
      const img = this.$refs.img;
      const btn = this.$refs.btn;
      if (!img || !btn) {
        return;
      }
      gsap.set(img, {
        opacity: 0,
        scale: 0.98,
      });
      gsap.to(img, {
        opacity: 1,
        scale: 1,
        duration: 2,
      });

      gsap.set(btn, {
        opacity: 0,
      });
      gsap.to(btn, {
        opacity: 1,
        duration: 1.3,
        delay: 0.7,
      });
    },
    setBtnAnimation() {
      const btn = this.$refs.btn;
      if (!btn) {
        return;
      }
      gsap.set(btn, {
        scale: 1,
        y: 50,
      });
      gsap.to(btn, {
        y: window.innerHeight - window.innerHeight / 4,
        scale: 0,
        scrollTrigger: {
          // markers: true,
          start: "top top",
          end: () => {
            return `"+=${window.innerHeight / 2 + window.innerHeight / 8}"`;
          },
          scrub: 1.1,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.comp-banner {
  position: relative;
  z-index: 150;
  padding-top: 28px;
  padding-bottom: 164px;
  @media (min-width: $collapse-bp) {
    min-height: 478px;
  }

  @media (max-width: $collapse-bp) {
    min-height: 360px;
  }

  .grid-wrapper {
    figure {
      overflow: hidden;
      width: 100%;
      height: 100%;
      @media (min-width: $collapse-bp) {
        grid-column: 2 / span 6;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 1 / span 4;
      }
      grid-row: 1 / 2;
      img {
        min-width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .scroll-hint {
      @media (min-width: $collapse-bp) {
        grid-column: 4 / 6;
      }
      @media (max-width: $collapse-bp) {
        grid-column: 2 / 4;
      }
      align-self: end;
      justify-self: center;
      grid-row: 1 / 2;
    }
  }
}
</style>