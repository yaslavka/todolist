
export const getAccessToken = () => {
    try {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken === null) {
            return undefined
        }
        return accessToken
    } catch (error) {
        return undefined
    }
}


export const setAccessToken = (access_token) => {
    localStorage.setItem('access_token', access_token)
}


export const declOfNum = (number, titles) => {
    number = Math.abs(number)
    if (Number.isInteger(number)) {
        const cases = [2, 0, 1, 1, 1, 2]
        return titles[
            number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
            ]
    }
    return titles[1]
}
export const isValidEmail = email => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
export const isValidPassword = password => {
    const passwordValidation =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    return passwordValidation.test(password);
};
export const isValidPhone = phone => {
    const numberValidation =
        /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
    return numberValidation.test(phone);
};
export const isValidUsername = (username) => {
    const usernameValidation = /^[A-Za-z0-9]+$/
    return usernameValidation.test(username)
}