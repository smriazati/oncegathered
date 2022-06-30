<template>
  <div class="contact-page">
    <div class="contact-page-wrapper">
      <div class="page-intro-2">
        <div v-if="data.page && data.contactInfo" class="page-intro-wrapper">
          <div class="image-wrapper">
            <figure v-if="data.page.img.url">
              <img
                :src="$urlFor(data.page.img.url).width(750).url()"
                :alt="data.page.img.alt"
              />
            </figure>
          </div>
          <div class="text-wrapper">
            <div class="email">
              <p class="display-sm-style">
                For inquiries, please get in touch via the email below.
              </p>
              <p v-if="data.contactInfo.siteEmail" class="display-sm-style">
                <a
                  :href="`mailto:${data.contactInfo.siteEmail}`"
                  class="link-inherit link-underline"
                  >{{ data.contactInfo.siteEmail }}</a
                >
              </p>
            </div>
            <div class="flex-row">
              <div v-if="data.contactInfo.address" class="address">
                <h3 class="title-style">Studio Address</h3>
                <div class="address-wrapper">
                  <p v-if="data.contactInfo.address.line1">
                    {{ data.contactInfo.address.line1 }}
                  </p>
                  <p v-if="data.contactInfo.address.line2">
                    {{ data.contactInfo.address.line2 }}
                  </p>
                </div>
                <p class="muted">By appointment only</p>
              </div>
              <div class="socials">
                <h3 class="title-style">Social Media</h3>
                <nav>
                  <ul class="flex-col">
                    <li v-if="data.contactInfo.instagram">
                      <a
                        :href="`https://www.instagram.com/${data.contactInfo.instagram}`"
                        target="_blank"
                        ><span>Instagram</span></a
                      >
                    </li>
                    <li v-if="data.contactInfo.pinterest">
                      <a
                        :href="`https://www.pinterest.com/${data.contactInfo.pinterest}`"
                        target="_blank"
                        ><span>Pinterest</span></a
                      >
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { groq } from "@nuxtjs/sanity";

const query1 = groq`*[_type in ["contactPage", "contactInfo"]]{
  'page': *[_type=='contactPage']{
    "img": {
        "url": img.image.asset->url,
        "alt": img.image.asset->altText
      }
  }[0],
  'contactInfo': *[_type=='contactInfo']{
    address, instagram, pinterest, siteEmail
  }[0]
}[0]`;

export default {
  head() {
    return {
      title: "Contact",
    };
  },
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(query1).then((res) => res);
    return { data };
  },
  computed: {},
};
</script>

<style lang="scss">
.contact-page {
  .contact-page-wrapper {
    .page-intro-2 {
      .image-wrapper {
        @media (max-width: $collapse-bp) {
          @include baseContainer;
        }
      }
      .text-wrapper {
        padding-bottom: 80px;
        @media (min-width: $collapse-bp) {
          align-self: end;
          padding-left: 25%;
          max-width: $half-container-width;
        }
        @media (max-width: $collapse-bp) {
          @include baseContainer;
          > *:not(:last-child) {
            margin-top: 80px;
          }
        }
        .email {
          > *:not(:last-child) {
            @media (min-width: $collapse-bp) {
              margin-bottom: 32px;
            }
            @media (max-width: $collapse-bp) {
              margin-bottom: 16px;
            }
          }
        }
        .flex-row {
          @media (min-width: $collapse-bp) {
            margin-top: 44px;
            > *:not(:last-child) {
              margin-right: 44px;
            }
          }
          @media (max-width: $collapse-bp) {
            flex-direction: column;
            > * {
              margin-top: 80px;
            }
          }
        }
      }

      h3 {
        margin-bottom: 22px;
      }
      nav ul li:not(:last-child) {
        margin-bottom: 11px;
      }
    }
  }
}
.muted {
  @include bodyTypeface();
  font-size: 15px;
  font-weight: 400;
  line-height: 25px;
  font-style: italic;
  letter-spacing: 0.04em;
}
</style>