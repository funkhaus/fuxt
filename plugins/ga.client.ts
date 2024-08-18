export default defineNuxtPlugin(() => {
  const settingStore = useSiteSettingStore()

  const googleAnalytics = settingStore.settings.acfSettings?.siteOptionsMeta?.googleAnalytics || []

  if (!googleAnalytics?.length) {
    return
  }

  const router = useRouter()

  useHead({
    script: [
      {
        src: '//www.googletagmanager.com/gtag/js',
        async: true
      }
    ]
  })

  const gtag = () => {
    // @ts-expect-error dataLayer is a global variable
    window.dataLayer = window.dataLayer || []

    // dataLayer.push(arguments)
  }

  router.afterEach((to) => {
    //
  })

  return {
    provide: {
      gtag
    }
  }
})
