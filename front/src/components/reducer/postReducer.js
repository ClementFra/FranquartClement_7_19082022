const INITIAL_STATE = {
    postsArray: []
}

function postReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'GETPOST': {
            return {
                ...state,
                postsArray: action.payload
            }
        }

        case 'NEWPOST' : {
            const newArr = [...state.postsArray]
            newArr.unshift(action.payload)
            return {
                ...state,
                postsArray: newArr
            }
        }

        case 'DELPOST': {
            let newArr = [...state.postsArray].filter(post => {
                return post.postId !== action.payload
              })
            return {
                ...state,
                postsArray: newArr
            }
        }

        case 'EDITPOST': {
            let newArr = [...state.postsArray]
            let findIndex = newArr.findIndex(post => post.postId === action.payload.postId)
            newArr[findIndex].msg = action.payload.content
            return {
                ...state,
                postsArray: newArr
            }
        }

        case 'DELIMG': {
            let newArr = [...state.postsArray]
            let findIndex = newArr.findIndex(post => post.postId === action.payload.postId)
            newArr[findIndex].img = ''
            return {
                ...state,
                postsArray: newArr
            }
        }

        case 'LIKE': {
            const newArr = [...state.postsArray]
            const findIndex = newArr.findIndex(post => post.postId === action.payload.postId)
            let userLikeArr = JSON.parse(newArr[findIndex].userLike)
            userLikeArr.push(action.payload.userId)
            newArr[findIndex].userLike = JSON.stringify(userLikeArr)
            newArr[findIndex].countLike = newArr[findIndex].countLike + 1
            console.log(newArr)
            return {
                ...state,
                postsArray: newArr
            }
        }

        case 'DISLIKE': {
            const newArr = [...state.postsArray]
            const findIndex = newArr.findIndex(post => post.postId === action.payload.postId)
            let userLikeArr = JSON.parse(newArr[findIndex].userLike)
            const filterArr = userLikeArr.filter(p => {
                return p === action.payload.userId
            })
            newArr[findIndex].userLike = JSON.stringify(filterArr)
            newArr[findIndex].countLike = newArr[findIndex].countLike - 1
            console.log(newArr)
            return {
                ...state,
                postsArray: newArr
            }
        }

    }

    return state
}

export default postReducer