export const isEmpty = value => {
    if(!value) return true
    return false
}
export const isEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
export const isLength = password => {
    if(password.length < 3) return true
    return false
}
export const isLength1 = CCV => {
    if(CCV.length === 3) return true
    return false
}
export const isLengthMobile = Mobile => {
    if(Mobile.length === 10) return true
    return false
}
export const isLength2 = cardNo => {
    if(cardNo.length === 16) return true
    return false
}
export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}
export const isMatch1 = expire => {
    if((expire.length === 5) && (expire[2]==="/")) return true
    return false
}

export const isDateYas = enteredDate => {
    if(new Date(enteredDate).getTime() > new Date().getTime()) return true
    return false
}