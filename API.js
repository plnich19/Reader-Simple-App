let URL = 'https://us-central1-reader-simple-app.cloudfunctions.net/findBook'

export default (nameth) => {
    return fetch(URL + '?nameth=' + nameth).then((res) => {
        console.log(res);
        return res.json()
    })
}