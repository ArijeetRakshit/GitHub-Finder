import {
    GET_USERS,
    GET_USER_REPOS,
    CLEAR_USERS,
    SET_LOADING,
    CLEAR_LOADING,
} from "./GithubActionTypes";

const githubReducer = (state, action) => {
    switch (action.type){
        case GET_USERS :
            return { ...state, users: action.payload, loading: false }
        case GET_USER_REPOS :
            return {
                ...state,
                user: action.payload.user,
                repos: action.payload.repos,
                loading: false,
            }
        case CLEAR_USERS :
            return { ...state, users: [] }
        case SET_LOADING :
            return { ...state, loading: true }
        case CLEAR_LOADING :
            return { ...state, loading: false}
        default :
            return state
    }
};

export default githubReducer;

