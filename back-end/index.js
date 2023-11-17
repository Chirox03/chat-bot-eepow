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
app.use(bodyParser.json())
const corsOptions = {   
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))  
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
const checkIfUsernameExists = async (username) => {
  console.log("Checking if username exists:", username);
  const usersRef = db.collection("Users");
  const query = usersRef.where("Username", "==", username);
  const querySnapshot = await query.get();

  return !querySnapshot.empty;
};
const checkIfEmailExists = async (email) => {
  console.log("Checking if email exists:", email);
  const usersRef = db.collection("Users");
  const query = usersRef.where("Email", "==", email);
  const querySnapshot = await query.get();

  return !querySnapshot.empty;
};

app.post("/GoogleLogin", async (req, res) => {
  // Assuming your request body contains the ID token
  email = req.body.email;

  try {
    // Verify the ID token using the Firebase Admin SDK
    if(checkIfEmailExists){
      res.send({ accountExists: true });
    }
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.sendStatus(401);
  }
});

  
const server = app.listen(port, ()=> {
    console.log(port)
})
