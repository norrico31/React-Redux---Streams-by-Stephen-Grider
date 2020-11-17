import { omit, mapKeys } from 'lodash'
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types'

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_STREAMS:
            return { 
                ...state, 
                ...mapKeys(action.payload, 'id')}
        case CREATE_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case FETCH_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case EDIT_STREAM:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case DELETE_STREAM:
            return omit(state, action.payload)
        default:
            return state
    }
}

// mapKeys from lodash is making array to objects or changing the array to object