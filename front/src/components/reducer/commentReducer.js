const INITIAL_STATE = {
    commentsArray: []
}

function commentReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'GETCMT': {
            return {
                ...state,
                commentsArray: action.payload
            }
        }
        case 'POSTCMT': {
          const newArr = [...state.commentsArray]
          newArr.unshift(action.payload)
            return {
                ...state,
                commentsArray: newArr
            }
        }
        case 'DELCMT': {
            const commentsArr = [...state.commentsArray]
            let newArr = commentsArr.filter(comment => {
                return comment.id !== action.payload
            })
            return {
                ...state,
                commentsArray: newArr
            }
        }

        case 'EDITCMT': {
            let newArr = [...state.commentsArray]
            const findIndex = newArr.findIndex(comment => comment.id === action.payload.id)
            newArr[findIndex].msg = action.payload.msg
            return {
                ...state,
                commentsArr: newArr
            }
        }

    }

    return state
}

export default commentReducer