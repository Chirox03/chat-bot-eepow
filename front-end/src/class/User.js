class User {
    constructor (Username, Email, Password, Conversations) {
        this.Username = Username;
        this.Email = Email;
        this.Conversations = Conversations;
    }
    toString() {
        return this.Username + ', ' + this.Email + ', ' + this.Conversations;
    }
}

// Firestore data converter
const userConverter = {
    toFirestore: (user) => {
        return {
            Username: user.Username,
            Users: user.Email,
            Password: user.Password,
            Conversation: user.Conversations
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.Username, data.Email, data.Password, data.Conversations);
    }
};