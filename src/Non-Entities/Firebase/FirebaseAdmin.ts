import FBAdmin = require('firebase-admin')
import certificationPath = require('../../../firebase_cred.json')
FBAdmin.initializeApp({ credential: FBAdmin.credential.cert(certificationPath) })
export default FBAdmin
