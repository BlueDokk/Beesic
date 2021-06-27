import firebase from '../utils/firebase';
import { toast } from 'react-toastify';
import 'firebase/firestore';

const db = firebase.firestore();

const firestoreService = {

    sendData(data, id) {

        delete data['password'];
        db.collection("users").doc(id).set({ ...data })
            .then(() => {
                console.log("User added successfully");
            })
            .catch((error) => {
                toast.error("Error adding user: ", error);
            });
    },

    getDataUser(userId){

        return db.collection("users").doc(userId)
        .get().catch((error) => {
            console.log("Error getting document:", error);
        });;
        
    },

    deleteUser(userId){
        db.collection("users").doc(userId).delete().then(() => {
            toast("Your account has been successfully deleted");
        }).catch((error) => {
            toast.error("Error deleting account: ", error);
        });
    }


}

export default firestoreService;