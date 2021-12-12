const notices = (state={isRead: false, count: 4}, action) => {
    switch (action.type){
        case "READ_ALL":
            return {...state, isRead: true, count: 0}
        case "READ_ONE":
            return {...state, count: state.count-1}
        default:
            return state
    }
}

export default notices