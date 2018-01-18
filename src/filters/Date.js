import _ from 'lodash'

export default function(strDate) {
    //  Safari & IE browsers do not support the date format “yyyy-mm-dd”
    strDate = strDate.replace(/-/g, '/')
    let date = new Date(strDate)
    let year = date.getFullYear()
    let month = _.padStart(date.getMonth()+1, 2, '0')
    let day = _.padStart(date.getDate(), 2, '0')
    return `${day}.${month}.${year}`;
}
