let URL = 'https://us-central1-reader-simple-app.cloudfunctions.net/'

export default (action, nameth) => {
    return fetch(URL + action + '?nameth=' + nameth).then((res) => {
        // res.set("Access-Control-Allow-Origin", "*");
        // res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        // res.set(
        //     "Access-Control-Allow-Headers",
        //     "Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
        // );
        return res.json()
    })
}