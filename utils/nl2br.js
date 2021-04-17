/*
 * Mimics PHP's nl2br
 * SEE https://www.php.net/manual/en/function.nl2br.php
 */
function nl2br(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, "<br>")
}

export default nl2br
