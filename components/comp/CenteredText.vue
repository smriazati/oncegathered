<template>
  <div class="comp-centered-text" :class="theme ? theme : ''">
    <div class="comp-centered-text-wrapper base-container flex-col">
      <h2 v-if="data.headline">{{ data.headline }}</h2>
      <p v-if="data.body">{{ data.body }}</p>
      <SystemLinkObject v-if="data.hasLink" :data="data.link" />
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
    theme: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.comp-centered-text {
  text-align: center;
  padding: 100px 0;
  &.deep-green {
    background: $deep-green;
    color: $buttercream;
  }

  h2 {
    @include displayStyle;
  }

  // > .flex-col {
  //   justify-content: center;
  // }
  .comp-centered-text-wrapper {
    > *:not(:last-child) {
      margin-bottom: 23px;
    }

    .btn {
      margin-left: auto;
      margin-right: auto;
    }
  }
  .base-container {
    @media (min-width: $collapse-bp) {
      padding: 0 12%;
    }
  }
}
</style>