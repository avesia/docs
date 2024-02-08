// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@nuxtjs/google-fonts'
    ],
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },
    i18n: {
        vueI18n: './i18n.config.ts',
        locales: ['en', 'ja'],
        defaultLocale: 'en',
    },
    googleFonts: {
        families: {
            Inter: [400, 700],
        }
    }
})
