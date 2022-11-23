const firebaseErrorHelper = (errorCode: string): string => {

  if (errorCode === 'auth/email-already-in-use') {
    return 'The email address is already in use'
  }

  if (errorCode === 'auth/user-not-found') {
    return 'This email is not registered'
  }

  return 'Something went wrong!'
}

export default firebaseErrorHelper