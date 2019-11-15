let URL = 'https://us-central1-reader-simple-app.cloudfunctions.net/'

export default (action, nameth) => {
    // if (action == 'addtoCart') {
    //     return fetch(URL + action + '?key=' + key + '?email=' + email + '?amount=' + amount).then((res) => {
    //     })
    // }

    return fetch(URL + action + '?nameth=' + nameth).then((res) => {
        console.log(res);
        return res.json()
    })
}