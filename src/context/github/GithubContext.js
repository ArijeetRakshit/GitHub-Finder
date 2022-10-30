import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import {
    SET_LOADING,
    GET_USERS,
    GET_USER_REPOS,
    CLEAR_LOADING,
} from "./GithubActionTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GITHUB_URL = "https://api.github.com";
const github = axios.create({
    baseURL: GITHUB_URL,
});

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);
    const navigate = useNavigate();

    const searchUsers = async (text) => {
        try{
            dispatch({ type: SET_LOADING })
            const params = new URLSearchParams({
                q: text,
            });
            const response = await github.get(`/search/users?${params}`);
            const { items } = response.data;
            dispatch({ type: GET_USERS, payload: items});
        }catch(err){
            dispatch({ type: CLEAR_LOADING });
        }
    };

    const getUserAndRepos = async (userName) => {
        try{
            dispatch({ type: SET_LOADING});
            const params = new URLSearchParams({
                sort: "created"
            });
            const [user, repos] = await Promise.all([
                github.get(`/users/${userName}`),
                github.get(`/users/${userName}/repos?${params}`),
            ]);
            dispatch({
                type: GET_USER_REPOS,
                payload: {
                    user: user.data,
                    repos: repos.data,
                },
            });
        }catch(err){
            dispatch({ type: CLEAR_LOADING });
            navigate("/notfound");
        }
    };

    return (
        <GithubContext.Provider
            value = {{
                ...state,
                searchUsers,
                getUserAndRepos,
                dispatch,
            }}
        >
            { children }
        </GithubContext.Provider>
    );
};

export default GithubContext;