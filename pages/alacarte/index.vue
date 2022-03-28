<template>
  <div class="alaCartePage">
    <FixedHeader />
    <PageIntro :schemaType="schemaType" />
    <section>
      <h2 class="purple-banner-title">Items We Offer</h2>
      <Offerings />
    </section>
    <section>
      <h2 class="purple-banner-title">A La Carte Order Form</h2>
      <alacarteForm successRoute="alacarte/success" />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "A La Carte",
      schemaType: "alaCartePage",
    };
  },
};
</script>
