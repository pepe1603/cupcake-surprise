// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/google-fonts',
    'nuxt-aos',
    'nuxt-lucide-icons',
    '@nuxtjs/tailwindcss'
  ],

  googleFonts: {
    families: {
      Knewave: [400],
      'Sour Gummy': [400, 700]
    },
    display: 'swap'
  },

  vite: {
    optimizeDeps: {
      include: ['gsap']
    }
  },

  css: ['~/assets/css/main.css'],
  //nuxtLucideIcons: {
   // name: 'LucideIcon'
  //},

  app: {
    head: {
      title: 'Cupcake Surprise',
      meta: [
        { name: 'description', content: 'Una sorpresa dulce solo para ti' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Knewave&family=Sour+Gummy:wght@400;700&display=swap' }
      ]
    },

  }
})