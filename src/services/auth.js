import {post} from '../utils/request'

/**
 * 用户登录函数
 * @param user
 * @returns {Promise<AxiosResponse<any>>}
 */
export function loginApi(user){
    return post("/api/v1/auth/login", user)
}