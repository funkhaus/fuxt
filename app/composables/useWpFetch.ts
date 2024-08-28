// import { callWithNuxt } from '#app'

type MenuList = {
  id: number
  title: { rendered: string }
  link: string
}[]

export async function useWpFetch(url: string) {
  const baseURL = useRuntimeConfig().public.api.url

  // example of accessing pinia store within a composable
  // const counterState = useCounterStore()
  // counterState.increment()

  // const nuxt = useNuxtApp()

  return await useFetch<MenuList>(url, { baseURL })

  // required when making multiple async calls
  // return callWithNuxt(nuxt, () => {
  //   return useFetch<MenuList>(url, { baseURL })
  // })
}
