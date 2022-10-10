let objFetch = {}

export default function callAPI( method, path, data) {
    if(method === 'GET' || method === 'DELETE'){
        objFetch = {
            method
        }
    } else {
        objFetch = {
            method,
            body: data
        }
    }
    return new Promise(function(resolve, reject)  {
        const url = 'http://localhost:3001/item' + path;
        fetch(url, objFetch)
        .then((res) => resolve(res.json()))
        .catch((err) => reject(err))
    })
}