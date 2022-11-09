const INITIAL_STATE = {
    userForm: [],
    msgState: 0,
    msgForm : ''
}

function formReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'REGISTER': {
            return {
                ...state,
                userForm: action.payload,
                msgState: 1,
                msgForm: 'Vous êtes bien enregistré'
            }
        }
        case 'ERRLOGIN': {
            return {
                ...state,
                userForm: action.payload,
                msgState: 0,
                msgForm: 'Email/Password invalide'
            }
        }

        case 'ERRASE': {
            return {
                ...state,
                msgState:0,
                msgForm: ''
            }
        }
    }

    return state
}

export default formReducer