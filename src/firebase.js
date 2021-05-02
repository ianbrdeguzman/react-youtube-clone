import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBFuSfhL9evRDpzb_87elBW04kCUIA9znk',
    authDomain: 'clone-d842e.firebaseapp.com',
    projectId: 'clone-d842e',
    storageBucket: 'clone-d842e.appspot.com',
    messagingSenderId: '803978736273',
    appId: '1:803978736273:web:79bd642904a5732ce48530',
    measurementId: 'G-W8NZWLJR63',
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
