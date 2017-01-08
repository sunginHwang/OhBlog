import 'whatwg-fetch';


export function doFunction(url,mode){
    // doFunction 에서 실행 될 내용들
    var _promise = function (url,mode) {

        return new Promise(function (resolve, reject) {

            fetch(url,{
                method: mode
            }).then((response) => {
                    if(response.ok){
                        return response.json();
                    } else {
                        throw new Error("Server response wasn't OK");
                    }
                })
                .then((responseData) => {
                    resolve(responseData);
                })
                .catch((error) => {
                    reject(Error("실패!!"));
                });
        });
    };

//Promise 실행
    _promise(url,mode)
        .then(function (text) {
            // 성공시
            console.log(text);
            return text;
        }, function (error) {
            // 실패시
            console.error(error);
        });

}


export function h_feach(url,mode){
    let result = '';

        fetch(url,{
            method: mode
        }).then((response) => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                console.log(responseData);
                result = responseData;
            })
            .catch((error) => {
                alert('서버와의 통신중 문제가 발생하였습니다');
                console.log(error);
            });

    return result;
}

export function h_feach_param(url,mode,param){
    fetch(url,{
        method: mode,
        body : param
    })
        .then((response) => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("Server response wasn't OK");
            }
        })
        .then((responseData) => {
            console.log(responseData);
            return responseData;
        })
        .catch((error) => {
            alert('서버와의 통신중 문제가 발생하였습니다')
            console.log(error);
        });
}