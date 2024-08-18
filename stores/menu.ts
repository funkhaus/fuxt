// Options Approach
export const useOtherMenuStore = defineStore('menu', {
  state: () => ({
    open: false
  }),

  getters: {
    isOpen: state => state.open
  },

  actions: {
    toggle() {
      this.open = !this.open
    }
  }
})

// Setup Approach
export const useMenuStore = defineStore('menu', () => {
  const open = ref(false)

  const isOpen = computed(() => open.value)

  const toggle = () => {
    open.value = !open.value
  }

  return {
    open,
    toggle,
    isOpen
  }
})
