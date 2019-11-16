let URL = 'https://us-central1-reader-simple-app.cloudfunctions.net/'

export default (action, nameth) => {
    return fetch(URL + action + '?nameth=' + nameth).then((res) => {
        console.log(res);
        return res.json()
    })
}