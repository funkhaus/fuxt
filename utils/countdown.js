/*
 * This function returns an object of time remaining between start and end
 * Must pass in a date() object for start and end params.
 *
 * @RETURNS {'years': 1, 'months': 12, 'days': 59, 'hours': 23, 'seconds': 59}
 * @SEE https://stackoverflow.com/a/56159578/503546
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
