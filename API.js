let URL = 'https://us-central1-reader-simple-app.cloudfunctions.net/'

export default (action, key, nameth, nameen, author, price, cover, amount, email) => {
    if (action == 'addtoCart') {
        return fetch(URL + action + '?nameth=' + nameth + '?nameen=' + nameen + '?author=' + author + '?price='
            + price + '?cover=' + cover + '?amount=' + amount + '?email=' + email + '?key=' + key).then((res) => {
                console.log(res);
            })
    }
    else {
        return fetch(URL + action + '?nameth=' + nameth).then((res) => {
            console.log(res);
            return res.json()
        })
    }
}