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
    forwardSpeed: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      direction: 1,
      anim: undefined,
      frameCount: 60,
      // forwardSpeed: 0.5,
      reverseSpeed: 1,
      endHold: 5, // seconds
      debug: false,
    };
  },
  watch: {
    direction() {
      if (this.direction === 1) {
        // forward playback
        if (this.debug) {
          console.log("Forward playback");
        }
        this.anim.setSpeed(this.forwardSpeed);
        this.anim.goToAndPlay(0, true);
      }
      if (this.direction === -1) {
        // reverse playback
        if (this.debug) {
          console.log("Reverse playback speed set");
        }
        this.anim.setSpeed(this.reverseSpeed);
        setTimeout(() => {
          if (this.debug) {
            console.log("Reverse playback");
          }
          this.anim.goToAndPlay(this.frameCount - 1, true);
        }, this.endHold * 1000);
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
    this.anim.setSpeed(this.forwardSpeed);
    // this.anim.addEventListener("loopComplete", () => {
    //   this.onAnimLoop();
    // });
    this.anim.addEventListener("enterFrame", (animation) => {
      if (animation.currentTime > this.anim.totalFrames - 1) {
        if (this.debug) {
          console.log("Pausing and switching direction");
        }
        this.anim.pause();
        this.switchDirection();
      }
    });

    this.anim.play();
  },
  methods: {
    onAnimLoop() {
      if (this.debug) {
        console.log("Looped");
      }

      this.anim.pause();
      this.switchDirection();
    },
    switchDirection() {
      //   console.log("direction is ", this.direction);
      this.direction = this.direction * -1;
      this.anim.setDirection(this.direction);
      if (this.debug) {
        console.log("Switched direction to" + this.direction);
      }
      //   console.log("direction is ", this.direction);
    },
  },
};
</script>
