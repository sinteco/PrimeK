import { FETCH_ASSINMENTS } from './types';
import axios from 'axios';

export const fetchAssignment = assignmentsurl => dispatch => {
    axios.get(assignmentsurl)
            .then((response)=>dispatch({
                    //assignments: response.data.Data,
                    //assignmentsTotal: response.data.Paging.totalCount,
                    type: FETCH_ASSINMENTS,
                    payload: response.data.Data
                    //isLoading : false
                }))
            .catch((error)=>console.log(error));
};