class User {
    constructor(firstName, lastName, email) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
    }
    
    // GETTER dan SETTER
    get firstName() {
        return this._firstName;
    }
    
    set firstName(name) {
        this._firstName = name;
    }
    
    get lastName() {
        return this._lastName;
    }
    
    set lastName(name) {
        this._lastName = name;
    }
    
    get fullName() {
        return `${this._firstName} ${this._lastName}`;
    }
    
    get email() {
        return this._email;
    }
    
    set email(newEmail) {
        this._email = newEmail;
    }
    
    // Abstraction - method yang harus ada
    getInfo() {
        throw new Error("Method getInfo() harus diimplementasi");
    }
}