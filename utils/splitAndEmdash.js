import emdashed from "~/utils/emdashed"

/*
 * Split by newline and run each line through emdashed.
 * Used mostly for credit loops.
 */
function splitAndEmdash(value = "") {
    // Abort if nothing passed in
    if (!value) {
        return []
    }

    let output = emdashed(value)

    // Now split and remove anything empty
    return output.split(/(?:\r\n|\r|\n)/g).filter((item) => item)
}

export default splitAndEmdash
