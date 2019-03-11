const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// check that user alias is unique.  onCall makes it referenceable from browser
exports.checkAliasIsUnique = functions.https.onCall((data, context) => {
  const ref = admin
    .firestore()
    .collection('users')
    .doc(data.slug)

  return ref
    .get()
    .then(doc => ({
      unique: !doc.exists, // if doc doesn't exist, alias doesn't exist
    }))
    .catch(err => {
      throw new functions.https.HttpsError('failed to connect')
    })
})
