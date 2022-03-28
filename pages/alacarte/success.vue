<template>
  <div class="alacarte success">
    <header>
      <h1 class="purple-banner-title">A La Carte Order Form</h1>
    </header>
    <main>
      <div class="text-wrapper">
        <p>
          Thank you for your message! You’ll receive an email with next steps
          shortly.
        </p>
        <p class="small">
          In the meantime, follow along
          <a href="https://www.instagram.com/oncegathered/" target="_blank"
            >@OnceGathered</a
          >!
        </p>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data: () => ({
    content: null,
  }),
};
</script>




<style lang="scss">
.alacarte.success {
  background: $buttercream;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .text-wrapper {
      @include baseContainer;
    }
  }
  p {
    //styleName: Display;
    @include displayTypeface;
    font-size: 48px;
    font-style: italic;
    font-weight: 300;
    line-height: 60px;
    letter-spacing: 0em;
    text-align: center;
    margin-bottom: 2rem;
  }
  p.small {
    @include bodyTypeface;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: center;
  }
}
</style>