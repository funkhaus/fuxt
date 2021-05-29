/*
 * This module will run a store action called nuxtGenerateInit
 * and store the returned result and pass it as context.generatePayload
 * in subsequent calls to nuxtGenerateInit.
 */

const kPopulated = Symbol("kPopulated")
const inMemory = {}

export default async (context) => {
    const { payload: isGenerate, store } = context

    // If isGenerate and we have the data from previous request, then populate payload once per server boot
    if (isGenerate && inMemory[kPopulated]) {
        context.generatePayload = inMemory[kPopulated]
        await store.dispatch("nuxtGenerateInit", context)
        return
    }

    // We don't have previous data, so run nuxtGenerateInit with no payload added, and save result
    if (store._actions.nuxtGenerateInit) {
        const data = await store.dispatch("nuxtGenerateInit", context)
        if (isGenerate) {
            inMemory[kPopulated] = data
        }
    }
}
