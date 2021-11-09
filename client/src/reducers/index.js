import { combineReducer } from 'redux'
import authReducer from './authReducer'

export default combineReducers({
    auth: authReducer
})