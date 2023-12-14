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
// app.use(express.json())
// app.use(bodyParser.json())
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
app.post('/add-user', async (req, res) => {
  try {
    const { UserID} = req.body;
    console.log(UserID)
    // Add user to Firestore with the provided user ID as document ID
    await db.collection('Users').doc(String(UserID)).set({
      Username : "Pikachu"
    });

    res.json({ success: true, message: 'User added successfully.' });
  } catch (error) {
    console.error('Error adding user:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});
app.get('/verify-email', async (req, res) => {
    try {
      const { email } = req.query; // Use req.query to get query parameters
  
      console.log(email);
  
      const usersRef = db.collection('Users');
      const snapshot = await usersRef.where('Email', '==', email).get();
  
      if (snapshot.empty) {
        return res.status(404).json({ message: 'Email not found in the database.', userID: null });
      }
  
      return res.status(200).json({ message: 'Email found in the database.', userID: snapshot.docs[0].id });
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
  app.get('/get-user/:userID', async (req, res) =>{
    try{
      const {userID} = req.params;
      console.log(userID)
      if(!userID){
        return res.status(400).json({ error: 'UserID is required in the request parameters.' });
      }
      const UserDoc =await db.collection('Users').doc(userID).get();
      
      if(!UserDoc.exists){
        return res.status(404).json({ error: 'User not found.' });
      }
      const userData = UserDoc.data();
      console.log(userData)
     res.json({ success: true, user: userData });
      
    }catch{
      console.error('Error getting user:', error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  });
  app.get('/get-conversations/:userID', async (req, res) => {
    try {
      console.log("hello")
      const { userID } = req.params;
      if (!userID) {
        return res.status(400).json({ error: 'UserID is required in the request parameters.' });
      }
  
      const conversationsRef = db.collection('Conversations');
      const snapshot = await conversationsRef.where('UserID', '==', userID).get();
  
      const conversations = [];
      snapshot.forEach((doc) => {
        conversations.push({'id':doc.id, 'Tittle':doc.data().Tittle});

      });
      return res.status(200).json({ conversations });
    } catch (error) {
      console.error('Error fetching conversations:', error);
      console.log(error.response)
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  // Update Conversation
app.post('/update-conversation/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const { conversationData } = req.body;

    if (!userID || !conversationData) {
      return res.status(400).json({ error: 'Invalid request parameters or body.' });
    }

    // Assuming your conversations are stored in a "Conversations" collection
    const conversationsRef = db.collection('Conversations');

    // Add the userID to the conversation data
    conversationData.UserID = userID;

    // Add the conversation to Firestore
    const newConversationRef = await conversationsRef.add(conversationData);

    return res.status(200).json({ message: 'Conversation updated successfully.', conversationID: newConversationRef.id });
  } catch (error) {
    console.error('Error updating conversation:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update Messages
app.post('/update-messages/:conversationID', async (req, res) => {
  console.log("new message",req.body)
  try {
    const { conversationID } = req.params;
    const { message } = req.body;
    console.log("ss",message)
    if (!conversationID || !message) {
      return res.status(400).json({ error: 'Invalid request parameters or body.' });
    }
    // Assuming your messages are stored in a "Messages" subcollection within each conversation document
    const messageRef = db.collection('Messages')

    // Add messages to the conversation

    await messageRef.add({
      Data: message.Data,
      From: message.From,
      ConversationID: conversationID,
      Time: message.Time || new Date().toISOString(), // Use current time if not provided
    });

    return res.status(200).json({ message: 'Messages updated successfully.' });
  } catch (error) {
    console.error('Error updating messages:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/get-messages/:conversationID', async (req, res) => {
  try {
    const { conversationID } = req.params;

    if (!conversationID) {
      return res.status(400).json({ error: 'ConversationID is required in the request parameters.' });
    }
    console.log("conid",conversationID)
    // Assuming your messages are stored in a "Messages" subcollection within each conversation document
    const messagesRef = db.collection('Messages');

    // Fetch messages for the specified conversationID
    const snapshot = await messagesRef.where('ConversationID', '==', conversationID).orderBy('Time', 'asc').get();
  
    const Messages = [];
    
    snapshot.forEach((doc) => {
      Messages.push({
        id: doc.id,
        Data: doc.data().Data,
        From: doc.data().From,
        Time: doc.data().Time,
      });
    });

    return res.status(200).json({ Messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
