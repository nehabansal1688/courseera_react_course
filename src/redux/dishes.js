import * as ActionTypes from './actionTypes';


export const Dishes = (state = {
	isLoading:true,
	errMsg:null,
	dishes:[]
}, action)  => {
	switch(action.type) {
		case ActionTypes.ADD_DISHES:
			return {...state, dishes:action.payload, isLoading : false, errMsg: null};
		case ActionTypes.DISHES_LOADING:
			return {...state, isLoading:true, errMsg : null, dishes : []};
		case ActionTypes.DISHES_FAILED:
			return {...state, errMsg:action.payload, isLoading: false, dishes:[]};
		default:
			return state;
	}
}