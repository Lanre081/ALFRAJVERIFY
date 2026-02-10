const TOKEN_KEY = 'token'

export function getToken(){
    return localStorage.getItem(TOKEN_KEY)
}