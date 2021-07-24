/* SEE: https://gist.github.com/walsh9/c4722c5f3c90e1cc0a5b */

import _uniqueId from "lodash/uniqueId"
const callbackName = _uniqueId("submitMailchimp")
let script = ""
let timerId = null

/**
 * Submit an email to the given Mailchimp account.
 * It does this by adding a JSONP script tag to the head, with a temp callback created
 *
 * @param {Object} options A config object
 * @param {String} options.email The users email address to add to the Mailchimp list
 * @param {String} options.actionUrl The Mailchimp form's "action-url"
 * @param {Number} options.timeout How long in ms to wait before throwing network error. Default is 10000ms.
 * @returns {Promise} Promise contains string with success or error message
 */
const submitMailchimp = ({ email, actionUrl, timeout = 10000 }) => {
    return new Promise((resolve, reject) => {
        // This builds the JSONP script
        script = document.createElement("script")
        script.setAttribute("class", `submit-mailchimp-${callbackName}`)
        script.setAttribute("src", parsedActionUrl({ email, actionUrl }))
        script.setAttribute("async", true)

        // Make a temp callback function that resolves or rejects
        window[callbackName] = (data) => {
            if (data.result == "success") {
                removeScript()
                resolve(data.msg)
            } else {
                removeScript()
                reject(new Error(data.msg))
            }
        }

        // Handle a script error
        script.onerror = () => {
            removeScript()
            reject(Error("Mailchimp network error"))
        }

        // Make a network timeout that rejects
        timerId = setTimeout(() => {
            removeScript()
            reject(Error("Mailchimp network timeout error"))
        }, timeout)

        // Add the script to page, this submits the email
        document.head.appendChild(script)
    })
}

/*
 * Build out the Mailchimp URL to hack their API
 */
const parsedActionUrl = ({ email, actionUrl }) => {
    let newUrl = actionUrl.replace("subscribe/post?", "subscribe/post-json?")
    return `${newUrl}&EMAIL=${email}&c=${callbackName}`
}

/*
 * Remove the global callback and script from document
 */
const removeScript = () => {
    clearTimeout(timerId)
    delete window[callbackName]
    if (script) {
        script.remove()
        script = null
    }
}

export default submitMailchimp
