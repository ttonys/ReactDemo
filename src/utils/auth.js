export function getToken() {
    return localStorage.getItem('token')
}

export function setToken(token) {
    return localStorage.setItem('token', token)
}

export function isLogin() {
    return !!localStorage.getItem('token');
}

export function removeToken() {
    localStorage.removeItem('token')
}

