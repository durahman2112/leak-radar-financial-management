// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Leak Radar Manajemen Keuangan',
      meta: [
        {
          name: 'description',
          content:
            'Pusat kendali keuangan untuk mendeteksi langganan, biaya tersembunyi, risiko uji coba, dan kebocoran uang berulang.'
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
          defer: true
        }
      ]
    }
  }
})
