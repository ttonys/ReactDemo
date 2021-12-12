import {listApi} from "../../services/products";


const loadProduct = () => async dispatch => {
    const res = await listApi()
    dispatch({
        type: "PRODUCT_LOADED",
        payload: res
    })
}

export default loadProduct