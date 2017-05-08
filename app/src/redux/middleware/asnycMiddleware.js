import axios from 'axios';

export default () => {
    return  next => action => {
        console.log('dispatching', action);
        const { promise, type, ...rest } = action;
        if (type != '@@router/LOCATION_CHANGE' && type != 'INITIALIZE_BOARD_CATEGORY')  {
            next({...rest, type: `${type}_REQUEST`});
            return axios({
                method: promise.method,
                url: promise.url,
                data: promise.data
            })
                .then(result => {
                    next({...rest, result, type: `${type}_SUCCESS`});
                })
                .catch(error => {
                    next({...rest, error, type: `${type}_FAILURE`});
                });
        }else{
            next({...rest,  type: type});
        }
        ;
    }
};