// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/config.scss";'
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: import.meta.env.VITE_API_URL,
      clientUrl: import.meta.env.VITE_CLIENT_URL
    }
  },
  plugins: [ '@/plugins/v-click-outside.client.ts' ]
})
