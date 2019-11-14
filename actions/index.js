// import firebase from 'firebase';
// //import db from '../firebase/index.js';
// import _ from 'lodash';
// import { FETCH_DATA } from './types.js';

// /*
//  * other constants
//  */
// import { config } from "../firebase/config.js";
// firebase.initializeApp(config);

// //const Posts = new firebase('https://reader-simple-app.firebaseio.com')

// export const fetchData = () => async dispatch => {
//     firebase.database().ref('books/').on("value", snapshot => {
//         dispatch({
//             type: FETCH_DATA,
//             payload: snapshot.val()
//         });
//     });
// };