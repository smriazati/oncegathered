<template>
  <div class="alaCartePage">
    <siteFixedHeader />
    <pageIntro :schemaType="schemaType" />
    <section>
      <h2 class="purple-banner-title">Items We Offer</h2>
      <alacarteOfferings />
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
