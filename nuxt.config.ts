// https://nuxt.com/docs/api/configuration/nuxt-config

// github pages でホスティングするために サブ Path を設定する
const subPathName = 'irt'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui'
  ],
  app: {
    baseURL: `/${subPathName}`,
    head: {
      title: 'irt',
      meta: [
        { charset: 'utf-8' },
      ],
      link: [
        { rel: "shortcut icon", type: "image/x-icon", href: `/${subPathName}/icon/favicon.ico` },
      ]
    }
  }
})
