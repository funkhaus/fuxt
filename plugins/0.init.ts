import { useSiteSettingStore } from '~/stores/siteSettings'

export default defineNuxtPlugin(async () => {
  // initialize stores
  await useSiteSettingStore().init()
})
