// import type { SiteSettingsQuery } from '#gql'

export const useSiteSettingStore = defineStore('site_settings', () => {
  const settings = ref({})


  // const GqlInstance = useGql()

  const init = async () => {
    // const res = await GqlInstance({ operation: 'SiteSettings' })

    // if (res) {
    //   settings.value = res
    // }
  }

  return {

    settings,


    init
  }
})
