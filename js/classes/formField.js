// ABSTRACT CLASS - tidak bisa diinstansiasi langsung
class FormField {
    constructor(id, name, required = true) {
        if (this.constructor === FormField) {
            throw new Error("FormField adalah abstract class dan tidak bisa diinstansiasi langsung");
        }
        this._id = id;
        this._name = name;
        this._required = required;
        this._value = '';
        this._error = '';
    }
    
    // GETTER dan SETTER (Enkapsulasi)
    get id() {
        return this._id;
    }
    
    get name() {
        return this._name;
    }
    
    get value() {
        return this._value;
    }
    
    set value(newValue) {
        this._value = newValue;
    }
    
    get error() {
        return this._error;
    }
    
    set error(errorMsg) {
        this._error = errorMsg;
    }
    
    get required() {
        return this._required;
    }
    
    // ABSTRACT METHOD - harus diimplementasi oleh subclass
    validate() {
        throw new Error("Method 'validate()' harus diimplementasi");
    }
    
    // Template method pattern
    validateField() {
        this.clearError();
        
        // Validasi required
        if (this._required && (!this._value || this._value.trim() === '')) {
            this._error = `${this._name} wajib diisi`;
            return false;
        }
        
        // Delegasi validasi spesifik ke subclass
        return this.validate();
    }
    
    clearError() {
        this._error = '';
    }
    
    // Polimorfisme - method yang bisa dioverride
    getValidationRules() {
        return {};
    }
}