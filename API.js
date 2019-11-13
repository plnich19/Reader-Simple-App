let URL = 'https://us-central1-reader-simple-app.cloudfunctions.net/findBook'

export default (nameth) => {
    return fetch(URL + '?nameth=' + nameth).then((res) => {
        return res.json()
    })
}