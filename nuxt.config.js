import { groq } from "@nuxtjs/sanity";
import { sanity } from './plugins/sanity'
const query = groq`*[_type == "siteSettings"][0]{
  "favicon": favicon.asset->url,
  siteDesc,
  "ogImg": {
       "url": ogImg.asset->url,
       "alt": ogImg.asset->altText
   }
}`;

export default async() => {
  const siteSettings = await sanity.fetch(query)
  return {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s | Once Gathered",
    title: 'Once Gathered',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content:`${siteSettings?.siteDesc}` },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${siteSettings?.ogImg?.url}?h=1200&w=640`
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: `640`
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: `1200`
      },
      { hid: 'og:image:alt', property: 'og:image:alt',  content: `${siteSettings?.ogImg?.alt}`}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${siteSettings?.favicon}?h=1200&w=640` },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/ScrollTrigger.min.js"
      },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/sass/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/sanityImage.js", "~/plugins/sanity.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/sanity/module', '@nuxtjs/google-fonts', '@nuxtjs/style-resources'],
  styleResources: {
      scss: [
          '~/assets/sass/system/_colors.scss',
          '~/assets/sass/system/_typography.scss',
          '~/assets/sass/system/_layout.scss',
          '~/assets/sass/system/_buttons.scss'
      ],
      hoistUseStatements: true  
  },
  googleFonts: {
    families: {
      'Cormorant Garamond': {
        wght: [400],
        ital: [400]
      }
    },
    display: 'swap',
    prefetch: true,
    preconnect: true
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
      extractCSS: true,
      loaders: {
      limit: 0,
    }
  }, 
}
}