const products = (state={data: [], total: 0}, action) => {
    switch (action.type){
        case 'PRODUCT_LOADED':
            return {...state, data: action.payload.data, total: action.payload.total}
        default:
            return state
    }
}

export default products