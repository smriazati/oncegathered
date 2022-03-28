export default {
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
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/ogImg.png'
      }
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
    "~/plugins/sanityImage.js"
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
