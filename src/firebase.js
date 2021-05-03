import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBb9eDxertD0lV-gxR0x7wbdK58bWcN28Y',
    authDomain: 'clone-65d7e.firebaseapp.com',
    projectId: 'clone-65d7e',
    storageBucket: 'clone-65d7e.appspot.com',
    messagingSenderId: '191125610326',
    appId: '1:191125610326:web:fd7322ce9f473dde8980f7',
    measurementId: 'G-BJSGTHBFPF',
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
