/*
 * Set a cookie. Used by custom video player.
 * SEE https://stackoverflow.com/a/24103596/503546
 */
function setCookie(name, value, days) {
    var expires = ""
    if (days) {
        var date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

export default setCookie
