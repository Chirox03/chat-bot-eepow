class User {
    constructor (UserID,Username, Email, Password) {
        this.UserID = UserID;
        this.Username = Username;
        this.Email = Email;
        this.Password = Password;
    }
    toString() {
        return this.Username + ', ' + this.Email + ', ' + this.Conversations;
    }
}

// Firestore data converter
module.export = {User};