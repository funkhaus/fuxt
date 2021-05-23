const kPopulated = Symbol("kPopulated")
const inMemory = {}

export default async (context) => {
    const { payload: isGenerate, store } = context
    // If isGenerate, populate once per server boot
    if (isGenerate && inMemory[kPopulated]) {
        return
    }
    if (store._actions.nuxtGenerateInit) {
        await store.dispatch("nuxtGenerateInit", context)
    }
    if (isGenerate) {
        inMemory[kPopulated] = true
    }
}
