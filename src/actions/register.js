import Axios from 'axios'
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export const register = newUser => dispatch => {
    console.log(newUser)
    dispatch({
        type: REGISTER_START
    });
    return Axios
    .post('https://coordinated-stories.herokuapp.com/api/auth/register', newUser)
    .then(res => {
        console.dir(res)
        dispatch({
            type: REGISTER_SUCCESS,
            message: res.data.message,
            status: res.status,
            token: res.data.token,
            currentUser: newUser.username
        })
        return true
    })
    .catch(err => {
        console.dir(err)
        dispatch({
            type: REGISTER_FAILURE,
            message: err.message,
            error: err.response ? err.response.data.error : 'unknown error, please try again',
            status: err.response ? err.response.status : 'unknown status',
            currentUser: null
        })
    })
} 