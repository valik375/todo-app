import firebase from 'firebase/app'

import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'


const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTO_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = app.auth()

export const registration = (email: string, password: string, name: string):Promise<void> => {
    return auth.createUserWithEmailAndPassword(email, password).then((rules: any) => {
        rules.user.updateProfile({displayName: name}).then(() => {
            localStorage.setItem('userData', JSON.stringify(rules.user))
            localStorage.setItem('uid', JSON.stringify(rules.user.uid))
        })
    })
}

export const login = (email: string, password: string):Promise<void> => {
    return auth.signInWithEmailAndPassword(email, password).then(() => {
        localStorage.setItem('userData', JSON.stringify(auth.currentUser))
        localStorage.setItem('uid', JSON.stringify(auth.currentUser!.uid))
    })
}

export const logout = ():Promise<void> => {
    localStorage.removeItem("userData")
    localStorage.removeItem("uid")
    return auth.signOut()
}

export const setFirebaseData = async (path: string, data: object) => {
    return await firebase.database().ref(path).set(data)
}

export const getFirebaseData = async (path: string) => {
    return (await firebase.database().ref(path).once('value')).val()
}

export const removeFirebaseData = async (path: string) => {
    return await firebase.database().ref(path).remove()
}

export const uid = async ():Promise<any> => {
    const getUidFromStore: string = JSON.parse(localStorage.getItem('uid') || '{}')
    return getUidFromStore ? getUidFromStore : auth.currentUser?.uid
}

export const resetPasswordByEmail = async (email: string):Promise<any> => {
    return auth.sendPasswordResetEmail(email)
}

export const updateUserProfile = async (userData: any):Promise<any> => {
    return auth.currentUser?.updateProfile(userData).then(() => {
        localStorage.setItem('userData', JSON.stringify(auth.currentUser))
    })
}

export const updateUserEmail = async (email: string):Promise<any> => {
    return auth.currentUser?.updateEmail(email)
}

export const uploadImageToStore = async (path: string, imageData: any) => {
    const imagePath = await firebase.storage().ref(path)
    await imagePath.put(imageData)
    return imagePath.getDownloadURL()
}

export default app
