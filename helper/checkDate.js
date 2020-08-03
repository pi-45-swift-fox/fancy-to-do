function dateCompare(date) {
    let afterOrOnThisYear
    let afterOrOnThisMonth
    let afterOrOnThisDate
    let dateNow = new Date()
    let todoDate = new Date(date)

    if (dateNow.getFullYear() <= todoDate.getFullYear()) {
        afterOrOnThisYear = true
    } else {
        afterOrOnThisYear = false
    }
    if (dateNow.getMonth() <= todoDate.getMonth()) {
        afterOrOnThisMonth = true
    } else {
        afterOrOnThisMonth = false
    }
    if (dateNow.getDate() < todoDate.getDate()) {
        afterOrOnThisDate = true
    } else {
        afterOrOnThisDate = false
    }

    if (afterOrOnThisYear == true && afterOrOnThisMonth == true && afterOrOnThisDate == true) {
        return true
    } else {
        return false
    }

}

module.exports = dateCompare