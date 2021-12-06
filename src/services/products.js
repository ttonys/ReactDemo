import {get, post, put, del} from '../utils/request'

export function listApi(pageIndex=1, pageNumber=8){
    return get("/api/v1/admin/products", {pageIndex, pageNumber})
}

export function getOneByIdApi(id){
    return get(`/api/v1/admin/products/${id}`)
}

export function createApi(data){
    return post("/api/v1/admin/products", data)
}

export function modifyOneApi(id, data){
    return put(`/api/v1/admin/products/${id}`, data)
}

export function delOneApi(id, data){
    return del(`/api/v1/admin/products/${id}`, data)
}