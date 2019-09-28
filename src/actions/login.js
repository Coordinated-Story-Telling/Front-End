import Axios from 'axios'
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

export const login = user => dispatch => {
    // console.log(newUser)
    dispatch({
        type: LOGIN_START
    });
    
    return Axios.post('https://ourstory-api.herokuapp.com/api/auth/login', user)
    .then(res => {
        // console.dir(res)
        localStorage.setItem('token', res.data.token);
        dispatch({
            type: LOGIN_SUCCESS,
            message: res.data.message,
            status: res.status,
            token: res.data.token,
            user: user
        })
    })
    .catch(err => {
        console.dir(err)
        
        dispatch({
            type: LOGIN_FAILURE,
            message: err.message,
            error: err.response ? err.response.data.error : 'unknown error, please try again',
            status: err.response ? err.response.status : 'unknown status'
        })
    })
} 

export const signOut = () => dispatch => {
    // console.log(newUser)
    localStorage.clear();
    dispatch({
        type: LOGOUT
    })
}