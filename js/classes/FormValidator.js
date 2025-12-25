class FormValidator {
    constructor() {
        this._fields = new Map();
        this._isValid = false;
    }
    
    // Menambahkan field untuk divalidasi
    addField(fieldId, fieldInstance) {
        this._fields.set(fieldId, fieldInstance);
    }
    
    // Validasi semua field
    validateAll() {
        let isValid = true;
        
        for (const [fieldId, field] of this._fields) {
            if (!field.validateField()) {
                isValid = false;
            }
        }
        
        this._isValid = isValid;
        return isValid;
    }
    
    // Mendapatkan error dari semua field
    getAllErrors() {
        const errors = {};
        for (const [fieldId, field] of this._fields) {
            if (field.error) {
                errors[fieldId] = field.error;
            }
        }
        return errors;
    }
    
    // Mendapatkan nilai dari semua field
    getAllValues() {
        const values = {};
        for (const [fieldId, field] of this._fields) {
            values[fieldId] = field.value;
        }
        return values;
    }
    
    get isValid() {
        return this._isValid;
    }
    
    // Clear semua error
    clearAllErrors() {
        for (const [_, field] of this._fields) {
            field.clearError();
        }
    }
}