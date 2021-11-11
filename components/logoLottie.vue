<template>
  <div>
    <div ref="anim"></div>
  </div>
</template>
<script>
// import lottie from "lottie-web";
import lottie from "lottie-web/build/player/lottie";

export default {
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      direction: 1,
      anim: undefined,
      frameCount: 30,
      forwardSpeed: 0.3,
      reverseSpeed: 1,
      endHold: 5, // seconds
    };
  },
  watch: {
    direction() {
      if (this.direction === 1) {
        // forward playback
        this.anim.setSpeed(this.forwardSpeed);
        this.anim.goToAndPlay(0, true);
      }
      if (this.direction === -1) {
        // reverse playback
        this.anim.setSpeed(this.reverseSpeed);
        setTimeout(
          () => this.anim.goToAndPlay(this.frameCount, true),
          this.endHold * 1000
        );
      }
    },
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.anim,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: this.path,
    });
    this.anim.setSpeed(0.5);
    // this.anim.addEventListener("loopComplete", () => {
    //   this.onAnimLoop();
    // });
    this.anim.addEventListener("enterFrame", (animation) => {
      if (animation.currentTime > this.anim.totalFrames - 1) {
        this.anim.pause();
        this.switchDirection();
      }
    });

    this.anim.play();
  },
  methods: {
    onAnimLoop() {
      //   console.log("hi");
      this.anim.pause();
      this.switchDirection();
    },
    switchDirection() {
      //   console.log("direction is ", this.direction);
      this.direction = this.direction * -1;
      this.anim.setDirection(this.direction);
      //   console.log("direction is ", this.direction);
    },
  },
};
</script>
