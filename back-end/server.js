const express = require('express')  
const cors = require('cors')    
const bodyParser = require('body-parser')

var admin = require("firebase-admin");

var serviceAccount = require("./oop-chatbot-firebase-adminsdk-w0mjd-cd80e79035.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://oop-chatbot-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

const app = express()
app.use(express.json()); // This is enough for JSON parsing
app.use(cors());
// app.use(express.json())
// app.use(bodyParser.json())
// const corsOptions = {   
//   origin: '*',
//   credentials: true,
//   optionSuccessStatus: 200
// }
// app.use(cors(corsOptions))  
const port = 3001
const usersRef = db.collection("Users");
usersRef.onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      console.log("New user: ", change.doc.data());
    }
    if (change.type === "modified") {
      console.log("Modified user: ", change.doc.data());
    }
    if (change.type === "removed") {
      console.log("Removed user: ", change.doc.data());
    }
  });
});

app.get('/verify-email', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required in the request body.' });
      }
  
      const usersRef = db.collection('Users');
      const snapshot = await usersRef.where('Email', '==', email).get();
  
      if (snapshot.empty) {
        return res.status(404).json({ message: 'Email not found in the database.' ,userID: null});
      }
  
      return res.status(200).json({ message: 'Email found in the database.' ,userID: snapshot.docs[0].id});
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });

  app.get('/verify-account', async (req, res) => {
    try {
      const { username,password } = req.body;
      if (!username || !password) { 
        return res.status(400).json({ error: 'Password and Username are required in the request body.' });
      }
  
      const usersRef = db.collection('Users');
      const snapshot = await usersRef.where('Username', '==', username).where('Password', '==', password).get();
  
      if (snapshot.empty) {
        return res.status(404).json({ message: 'Account not found in the database.' ,userID: null});
      }
  
      return res.status(200).json({ message: 'ACcount found in the database.' ,userID: snapshot.docs[0].id});
    } catch (error) {
      console.error('Error verifying account:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });
  app.get('/get-conversations/:userID', async (req, res) => {
    try {
      const { userID } = req.params;
  
      if (!userID) {
        return res.status(400).json({ error: 'UserID is required in the request parameters.' });
      }
  
      const conversationsRef = db.collection('Conversations');
      const snapshot = await conversationsRef.where('UserID', '==', userID).get();
  
      const conversations = [];
      snapshot.forEach((doc) => {
        conversations.push(doc.data());
      });
  
      return res.status(200).json({ conversations });
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  
  const server = app.listen(port, ()=> {
    console.log(port)
})