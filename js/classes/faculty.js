class Faculty {
    constructor(facultyId) {
        this._facultyId = facultyId;
        this._facultyData = FACULTIES_DATA[facultyId] || null;
    }
    
    // GETTER
    get name() {
        return this._facultyData ? this._facultyData.name : 'Fakultas tidak ditemukan';
    }
    
    get programs() {
        return this._facultyData ? this._facultyData.programs : [];
    }
    
    get isValid() {
        return this._facultyData !== null;
    }
    
    // Factory Method Pattern
    static createFaculty(facultyId) {
        if (!FACULTIES_DATA[facultyId]) {
            throw new Error(`Fakultas dengan ID ${facultyId} tidak ditemukan`);
        }
        return new Faculty(facultyId);
    }
    
    // Polimorfisme - method untuk mendapatkan data
    getFacultyInfo() {
        return {
            id: this._facultyId,
            name: this.name,
            programs: this.programs,
            totalPrograms: this.programs.length
        };
    }
}