/**
 * This function returns an object of time remaining between start and end
 * @see https://stackoverflow.com/a/56159578/503546
 *
 * @param {date} start A date object for the starting time
 * @param {date} end A date object for the time to count down to
 * @returns {Object} An object that looks like this {'years': 1, 'months': 12, 'days': 59, 'hours': 23, 'seconds': 59}
 */

import {
    differenceInYears,
    differenceInMonths,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    addYears,
    addMonths,
    addDays,
    addHours,
    addMinutes
} from "date-fns"

function countdown(start, end) {
    let x = start
    let y = end

    let output = {}

    let temp
    temp = differenceInYears(y, x)
    output.years = temp

    x = addYears(x, temp)
    temp = differenceInMonths(y, x)
    output.months = temp

    x = addMonths(x, temp)
    temp = differenceInDays(y, x)
    output.days = temp

    x = addDays(x, temp)
    temp = differenceInHours(y, x)
    output.hours = temp

    x = addHours(x, temp)
    temp = differenceInMinutes(y, x)
    output.minutes = temp

    x = addMinutes(x, temp)
    temp = differenceInSeconds(y, x)
    output.seconds = temp

    return output
}

export default countdown
