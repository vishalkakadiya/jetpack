/**
 * Internal dependencies
 */
import restApi from 'rest-api';
import {
	JETPACK_RECOMMENDATIONS_DATA_FETCH,
	JETPACK_RECOMMENDATIONS_DATA_FETCH_RECEIVE,
	JETPACK_RECOMMENDATIONS_DATA_FETCH_FAIL,
	JETPACK_RECOMMENDATIONS_DATA_UPDATE,
	JETPACK_RECOMMENDATIONS_DATA_SAVE,
	JETPACK_RECOMMENDATIONS_DATA_SAVE_SUCCESS,
	JETPACK_RECOMMENDATIONS_DATA_SAVE_FAIL,
	JETPACK_RECOMMENDATIONS_STEP_UPDATE,
	JETPACK_RECOMMENDATIONS_STEP_UPDATE_SUCCESS,
	JETPACK_RECOMMENDATIONS_STEP_UPDATE_FAIL,
} from 'state/action-types';

export const fetchRecommendationsData = () => {
	return dispatch => {
		dispatch( { type: JETPACK_RECOMMENDATIONS_DATA_FETCH } );
		return restApi
			.fetchRecommendationsData()
			.then( data => {
				dispatch( { type: JETPACK_RECOMMENDATIONS_DATA_FETCH_RECEIVE, data } );
			} )
			.catch( error => {
				dispatch( { type: JETPACK_RECOMMENDATIONS_DATA_FETCH_FAIL, error } );
			} );
	};
};

export const updateRecommendationsData = data => {
	return dispatch => {
		dispatch( { type: JETPACK_RECOMMENDATIONS_DATA_UPDATE, data } );
	};
};

export const saveRecommendationsData = () => {
	return ( dispatch, getState ) => {
		dispatch( { type: JETPACK_RECOMMENDATIONS_DATA_SAVE } );

		const recommendations = getState().jetpack.recommendations;
		return restApi
			.saveRecommendationsData( recommendations.data )
			.then( () => {
				dispatch( { type: JETPACK_RECOMMENDATIONS_DATA_SAVE_SUCCESS } );
			} )
			.catch( error => {
				dispatch( { type: JETPACK_RECOMMENDATIONS_DATA_SAVE_FAIL, error } );
			} );
	};
};

export const updateRecommendationsStep = step => {
	return ( dispatch, getState ) => {
		dispatch( { type: JETPACK_RECOMMENDATIONS_STEP_UPDATE, step } );

		const recommendations = getState().jetpack.recommendations;
		return restApi
			.updateRecommendationsStep( recommendations.step )
			.then( () => {
				dispatch( { type: JETPACK_RECOMMENDATIONS_STEP_UPDATE_SUCCESS } );
			} )
			.catch( error => {
				dispatch( { type: JETPACK_RECOMMENDATIONS_STEP_UPDATE_FAIL, error } );
			} );
	};
};
