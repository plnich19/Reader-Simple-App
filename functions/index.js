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


// let test = async function (bookName, books, res, key) {
//     let bookNameLow = bookName.toLocaleLowerCase();
//     let booksObj = [];
//     let nameth = 'Unfortunately, we dont have that book yet :('
//     // await books.forEach(book => {
//     let booknameth = books.nameth.toLocaleLowerCase();
//     let booknameen = books.nameen.toLocaleLowerCase();
//     let bookauthor = books.author.toLocaleLowerCase();
//     let bookisbn = books.isbn;
//     console.log(books.isbn);
//     var obj = {
//         key: {
//             booknameth: book.nameth,
//             booknameen: book.nameen,
//             author: book.author,
//             cover: book.cover,
//             isbn: book.isbn,
//         }
//     }
//     console.log('bookNameLow', bookNameLow);
//     if (booknameth.includes(bookNameLow) || booknameen.includes(bookNameLow) || bookauthor.includes(bookNameLow) || bookisbn === bookName) {
//         booksObj.push(obj);
//         // booksObj.push(bookisbn);
//     }



//     await res.json(JSON.stringify(booksObj));
// }
