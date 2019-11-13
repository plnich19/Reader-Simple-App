const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.findBook = functions.https.onRequest(async (req, res) => {
    return admin.database().ref('books').once('value', (snapshot) => {
        let books = snapshot.val()

        let bookName = req.query.nameth;

        test(bookName, books, res)

        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.set(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
        );
    })
})


let test = async function (bookName, books, res) {
    let bookNameLow = bookName.toLocaleLowerCase();
    let booksObj = [];
    let nameth = 'Unfortunately, we dont have that book yet :('
    await books.forEach(book => {
        let booknameth = book.nameth.toLocaleLowerCase();
        let booknameen = book.nameen.toLocaleLowerCase();
        let bookauthor = book.author.toLocaleLowerCase();
        let bookisbn = book.isbn;
        console.log('bookNameLow', bookNameLow);
        if (booknameth.includes(bookNameLow) || booknameen.includes(bookNameLow) || bookauthor.includes(bookNameLow) || bookisbn === bookName) {
            bookkey = books.key;
            nameth = book.nameth;
            nameen = book.nameen;
            author = book.author;
            cover = book.cover;
            booksObj.push(book);
            console.log('push push');
        }
    })

    await res.json(JSON.stringify(booksObj));
}
