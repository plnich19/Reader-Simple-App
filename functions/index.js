const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.getBook = functions.https.onRequest(async (req, res) => {
    return admin.database().ref('books/').once('value', (snapshot) => {
        res = snapshot.val()

        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.set(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
        );
        return res;
    }
    )
})

exports.findBook = functions.https.onRequest(async (req, res) => {
    return admin.database().ref('books/').once('value', (snapshot) => {
        let books = snapshot.val()

        let bookName = req.query.nameth;

        test(bookName, books, res, snapshot)

        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.set(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
        );
    })
})


let test = async function (bookName, books, res, snapshot) {
    let bookNameLow = bookName.toLocaleLowerCase();
    let booksObj = [];
    let nameth = 'Unfortunately, we dont have that book yet :('
    await books.forEach(book => {
        let booknameth = book.nameth.toLocaleLowerCase();
        let booknameen = book.nameen.toLocaleLowerCase();
        let bookauthor = book.author.toLocaleLowerCase();
        let bookisbn = book.isbn;
        let key = snapshot.getKey();
        console.log(book.isbn);
        var obj = {
            key: {
                booknameth: booknameth,
                booknameen: booknameen,
                author: bookauthor,
                isbn: bookisbn
            }
        }
        // let bookkey = books.getKey();
        console.log('bookNameLow', bookNameLow);
        if (booknameth.includes(bookNameLow) || booknameen.includes(bookNameLow) || bookauthor.includes(bookNameLow) || bookisbn === bookName) {
            booksObj.push(obj);
        }
    })

    await res.json(JSON.stringify(booksObj));
}
