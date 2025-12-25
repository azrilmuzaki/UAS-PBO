// Subclass dari FormField untuk tipe field yang berbeda (Inheritance & Polimorfisme)
class TextField extends FormField {
    constructor(id, name, required = true, minLength = 2, maxLength = 50) {
        super(id, name, required);
        this._minLength = minLength;
        this._maxLength = maxLength;
    }
    
    validate() {
        if (this._value.length < this._minLength) {
            this._error = `${this._name} minimal ${this._minLength} karakter`;
            return false;
        }
        
        if (this._value.length > this._maxLength) {
            this._error = `${this._name} maksimal ${this._maxLength} karakter`;
            return false;
        }
        
        return true;
    }
    
    // Override method dari parent class
    getValidationRules() {
        return {
            ...super.getValidationRules(),
            minLength: this._minLength,
            maxLength: this._maxLength
        };
    }
}

class NIMField extends FormField {
    constructor(id, name, required = true) {
        super(id, name, required);
    }
    
    validate() {
        const nimRegex = /^[0-9]{9}$/;
        if (!nimRegex.test(this._value)) {
            this._error = 'NIM harus terdiri dari 9 angka';
            return false;
        }
        return true;
    }
}

class EmailField extends FormField {
    constructor(id, name, required = true) {
        super(id, name, required);
    }
    
    validate() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this._value)) {
            this._error = 'Format email tidak valid';
            return false;
        }
        return true;
    }
}

class SelectField extends FormField {
    constructor(id, name, required = true) {
        super(id, name, required);
    }
    
    validate() {
        if (this._value === '') {
            this._error = `${this._name} harus dipilih`;
            return false;
        }
        return true;
    }
}

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi validator
    const validator = new FormValidator();
    
    // Membuat field instances (Polimorfisme)
    validator.addField('firstName', new TextField('firstName', 'Nama Depan', true, 2, 30));
    validator.addField('lastName', new TextField('lastName', 'Nama Belakang', true, 2, 30));
    validator.addField('nim', new NIMField('nim', 'NIM'));
    validator.addField('email', new EmailField('email', 'Email'));
    validator.addField('faculty', new SelectField('faculty', 'Fakultas'));
    validator.addField('program', new SelectField('program', 'Program Studi'));
    validator.addField('address', new TextField('address', 'Alamat', true, 10, 200));
    
    // Event listener untuk select fakultas
    const facultySelect = document.getElementById('faculty');
    const programSelect = document.getElementById('program');
    
    facultySelect.addEventListener('change', function() {
        const facultyId = this.value;
        
        // Reset program select
        programSelect.innerHTML = '<option value="">Pilih Program Studi</option>';
        programSelect.disabled = true;
        
        if (facultyId) {
            try {
                const faculty = Faculty.createFaculty(facultyId);
                
                // Enable program select
                programSelect.disabled = false;
                
                // Tambahkan opsi program studi
                faculty.programs.forEach(program => {
                    const option = document.createElement('option');
                    option.value = program;
                    option.textContent = program;
                    programSelect.appendChild(option);
                });
                
                // Update field value di validator
                validator._fields.get('faculty').value = faculty.name;
                validator._fields.get('program').value = '';
            } catch (error) {
                console.error(error.message);
            }
        }
    });
    
    // Event listener untuk select program
    programSelect.addEventListener('change', function() {
        validator._fields.get('program').value = this.value;
    });
    
    // Event listener untuk input fields
    const inputFields = ['firstName', 'lastName', 'nim', 'email', 'address'];
    inputFields.forEach(fieldId => {
        const fieldElement = document.getElementById(fieldId);
        const fieldInstance = validator._fields.get(fieldId);
        
        fieldElement.addEventListener('input', function() {
            fieldInstance.value = this.value;
            fieldInstance.validateField();
            updateErrorDisplay(fieldId, fieldInstance.error);
        });
    });
    
    // Event listener untuk form submit
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update semua field values
        validator._fields.get('firstName').value = document.getElementById('firstName').value;
        validator._fields.get('lastName').value = document.getElementById('lastName').value;
        validator._fields.get('nim').value = document.getElementById('nim').value;
        validator._fields.get('email').value = document.getElementById('email').value;
        validator._fields.get('faculty').value = facultySelect.value;
        validator._fields.get('program').value = programSelect.value;
        validator._fields.get('address').value = document.getElementById('address').value;
        
        // Validasi semua field
        if (validator.validateAll()) {
            // Buat objek Student
            const student = new Student(
                validator._fields.get('firstName').value,
                validator._fields.get('lastName').value,
                validator._fields.get('email').value,
                validator._fields.get('nim').value,
                validator._fields.get('faculty').value,
                validator._fields.get('program').value,
                validator._fields.get('address').value
            );
            
            // Tampilkan success message
            showSuccessMessage(student);
            
            // Reset form
            this.reset();
            programSelect.disabled = true;
            programSelect.innerHTML = '<option value="">Pilih Fakultas terlebih dahulu</option>';
            validator.clearAllErrors();
            clearAllErrorDisplays();
        } else {
            // Tampilkan error messages
            displayErrors(validator.getAllErrors());
        }
    });
    
    // Fungsi untuk menampilkan error
    function updateErrorDisplay(fieldId, errorMessage) {
        const errorElement = document.getElementById(fieldId + 'Error');
        errorElement.textContent = errorMessage;
        errorElement.style.display = errorMessage ? 'block' : 'none';
    }
    
    function clearAllErrorDisplays() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
    }
    
    function displayErrors(errors) {
        clearAllErrorDisplays();
        for (const [fieldId, errorMessage] of Object.entries(errors)) {
            updateErrorDisplay(fieldId, errorMessage);
        }
    }
    
    function showSuccessMessage(student) {
        const successDiv = document.getElementById('successMessage');
        const studentInfo = student.getStudentData();
        
        successDiv.innerHTML = `
            <h3>Pendaftaran Berhasil!</h3>
            <p><strong>Nama:</strong> ${studentInfo.name}</p>
            <p><strong>NIM:</strong> ${studentInfo.nim}</p>
            <p><strong>Email:</strong> ${studentInfo.email}</p>
            <p><strong>Fakultas:</strong> ${studentInfo.faculty}</p>
            <p><strong>Program Studi:</strong> ${studentInfo.program}</p>
            <p><strong>Tanggal Pendaftaran:</strong> ${studentInfo.registrationDate}</p>
        `;
        
        successDiv.style.display = 'block';
        
        // Auto hide setelah 10 detik
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 10000);
    }
});