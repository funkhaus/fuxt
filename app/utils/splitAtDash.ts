/*
 * Splits a string by the separator and optionally keeps the separator in the result.
 * Used primarily for separating text at an emdash (—).
 */
// TODO: refactor this function to use a regular expression instead of a string for separator
function splitAtDash(text: string = "", separator: string = " — ", keepSeparator: boolean = false): string[] {
    let output = text.split(separator);

    // Add separator back into the array
    // This is useful if separating by an opening quote
    if (keepSeparator) {
        output = output.map((element, index) => {
            if (index > 0) {
                return ` ${separator} ` + element;
            }
            return element;
        });
    }

    return output;
}

export default splitAtDash;
