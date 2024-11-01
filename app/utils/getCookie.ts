/**
 * Get a cookie. Used by custom video player.
 * SEE https://stackoverflow.com/a/24103596/503546
 */
function getCookie(name: string): string | null {
    const nameEQ = `${name}=`
    const cookiesArray = document.cookie.split(";")
    
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim()
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length)
        }
    }
    
    return null
}

export default getCookie
