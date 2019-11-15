let URL = 'https://us-central1-reader-simple-app.cloudfunctions.net/'

export default (action, email, key, nameth, nameen, author, price, cover, amount) => {
    if (action == 'addtoCart') {
        console.log('kyyyyy = ', key)
        return fetch(URL + action + '?email' + email + '?key=' + key + '?nameth=' + nameth + '?nameen=' + nameen + '?author=' + author + '?price=' + price + '?cover=' + cover + '?amount=' + amount).then((res) => {
            console.log(res);
            return res.json()
        })
    }
    else {
        return fetch(URL + action + '?nameth=' + nameth).then((res) => {
            console.log(res);
            return res.json()
        })
    }
}