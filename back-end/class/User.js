class User {
    constructor (UserID,Username, Email, Password) {
        this.UserID = UserID;
        this.Username = Username;
        this.Email = Email;
        this.Password = Password;
    }
    toString() {
        return this.Username + ', ' + this.Email + ', ' + this.UserID;
    }
}

// Firestore data converter
module.exports = {User}