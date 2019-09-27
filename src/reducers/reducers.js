import { combineReducers } from 'redux'
import story from './reducer'
import register from './registerReducer'
import login from './loginReducer'
import userStory from './userStoriesReducer'

export default combineReducers({
    story,
    register,
    login,
    userStory
})