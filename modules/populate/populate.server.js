const kPopulated = Symbol("kPopulated")
const inMemory = {}

export default async (context) => {
    const { payload: isGenerate, store } = context

    // If isGenerate, populate once per server boot
    if (isGenerate && inMemory[kPopulated]) {
        await store.dispatch("nuxtGenerateInit", {
            generatePayload: inMemory[kPopulated],
        })
        return
    }
    if (store._actions.nuxtGenerateInit) {
        const [data] = await store.dispatch("nuxtGenerateInit", context)
        if (isGenerate) {
            inMemory[kPopulated] = data
        }
    }
}
