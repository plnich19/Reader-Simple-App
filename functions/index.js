const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.getBook = functions.https.onRequest(async (req, res) => {
    return admin.database().ref('books/').once('value', (snapshot) => {
        return snapshot.val();
    })
})

exports.findBook = functions.https.onRequest(async (req, res) => {
    return admin.database().ref('books/').once('value', (snapshot) => {
        var books = snapshot.val()

        let bookName = req.query.nameth;
        let bookNameLow = bookName.toLocaleLowerCase();

        var booksObj = [];
        Object.keys(books).map((key) => {
            console.log("key = ", key);
            var obj = {

                [key]: {
                    nameth: books[key].nameth,
                    nameen: books[key].nameen,
                    author: books[key].author,
                    isbn: books[key].bookisbn,
                    cover: books[key].cover
                }
            }
            console.log("")
            let booknameth = books[key].nameth.toLocaleLowerCase();
            let booknameen = books[key].nameen.toLocaleLowerCase();
            let bookauthor = books[key].author.toLocaleLowerCase();
            let bookisbn = books[key].isbn;
            if (booknameth.includes(bookNameLow) || booknameen.includes(bookNameLow) || bookauthor.includes(bookNameLow) || bookisbn === bookName) {
                booksObj.push(obj);
            }

            // test(bookName, books, res, key)
        })

        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.set(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
        );

        return res.json(JSON.stringify(booksObj));
    })
})