import { FETCH_ASSINMENTS } from '../actions/types';

const initialState = {
    items: [],//get
    item: {}//add
};

export default function(state = initialState, action){
    switch (action.type){
        case FETCH_ASSINMENTS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}