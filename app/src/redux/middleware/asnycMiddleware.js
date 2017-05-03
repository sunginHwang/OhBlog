import axios from 'axios';

export default () => {
    return next => action => {
        const { promise, type, ...rest } = action;

        next({...rest, type: `${type}_REQUEST` });
        return axios({
            method: 'GET',
            url: promise.url == null ? '' : promise.url,
            data: promise.data
        })
            .then(result => {
                console.log(result);
                next({...rest, result, type: `${type}_SUCCESS` });
            })
            .catch(error => {
                next({...rest, error, type: `${type}_FAILURE` });
            });
    };
};