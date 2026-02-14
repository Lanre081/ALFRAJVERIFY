const ACCESS_TOKEN_KEY = 'access-token'
const REFRESH_TOKEN_KEY = 'refresh-token'

export function getAccessToken(){
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(){
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function saveAccessToken(data){
   localStorage.setItem(ACCESS_TOKEN_KEY, data)
}

export function saveRefreshToken(data){
   localStorage.setItem(REFRESH_TOKEN_KEY, data)
}