class Student extends User {
    constructor(firstName, lastName, email, nim, faculty, program, address) {
        super(firstName, lastName, email); // Inheritance
        this._nim = nim;
        this._faculty = faculty;
        this._program = program;
        this._address = address;
    }
    
    // GETTER dan SETTER
    get nim() {
        return this._nim;
    }
    
    set nim(newNim) {
        this._nim = newNim;
    }
    
    get faculty() {
        return this._faculty;
    }
    
    set faculty(faculty) {
        this._faculty = faculty;
    }
    
    get program() {
        return this._program;
    }
    
    set program(program) {
        this._program = program;
    }
    
    get address() {
        return this._address;
    }
    
    set address(address) {
        this._address = address;
    }
    
    // Implementasi method abstract dari parent class
    getInfo() {
        return {
            name: this.fullName,
            nim: this._nim,
            email: this._email,
            faculty: this._faculty,
            program: this._program,
            address: this._address
        };
    }
    
    // Polimorfisme - method spesifik untuk Student
    getStudentData() {
        return {
            ...this.getInfo(),
            registrationDate: new Date().toLocaleDateString('id-ID')
        };
    }
}