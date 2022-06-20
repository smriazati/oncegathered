<template>
  <header class="fixed-header">
    <nuxt-link to="/"><SiteLogo :width="300" /></nuxt-link>
  </header>
</template>

<style lang="scss">
header.fixed-header {
  @media (min-width: $collapse-bp) {
    position: absolute;
    top: 22px;
  }
  @media (max-width: $collapse-bp) {
    position: relative;
    background: $buttercream;
    padding: 20px;
  }
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>