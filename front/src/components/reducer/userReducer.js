const INITIAL_STATE = {
    userInfo: []
}

function userReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'GETUSER': {
            return {
                ...state,
                userInfo: action.payload
            }
        }

        case 'EDITUSER' : {
            return {
                ...state,
                userInfo: action.payload
            }
        }
    }

    return state
}

export default userReducer