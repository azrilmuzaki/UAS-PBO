// Import Firebase functions
import { db, collection, getDocs, query, orderBy, deleteDoc, doc } from './firebase-config.js';

// Load data mahasiswa dari Firestore
async function loadMahasiswaData() {
    const loadingMessage = document.getElementById('loadingMessage');
    const tableContainer = document.getElementById('tableContainer');
    const noDataMessage = document.getElementById('noDataMessage');
    const tableBody = document.getElementById('mahasiswaTableBody');
    const totalCount = document.getElementById('totalCount');
    
    try {
        // Query data dengan urutan berdasarkan timestamp terbaru
        const q = query(collection(db, "mahasiswa"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        
        // Hide loading
        loadingMessage.style.display = 'none';
        
        if (querySnapshot.empty) {
            // Tidak ada data
            noDataMessage.style.display = 'block';
            tableContainer.style.display = 'none';
            totalCount.textContent = '0';
        } else {
            // Ada data
            noDataMessage.style.display = 'none';
            tableContainer.style.display = 'block';
            
            // Clear table body
            tableBody.innerHTML = '';
            
            let index = 1;
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const row = createTableRow(index, doc.id, data);
                tableBody.appendChild(row);
                index++;
            });
            
            // Update total count
            totalCount.textContent = querySnapshot.size;
        }
    } catch (error) {
        console.error("Error loading data: ", error);
        loadingMessage.textContent = 'Gagal memuat data: ' + error.message;
        loadingMessage.style.color = 'red';
    }
}

// Fungsi untuk membuat baris tabel
function createTableRow(index, docId, data) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${index}</td>
        <td>${data.fullName || '-'}</td>
        <td>${data.nim || '-'}</td>
        <td>${data.email || '-'}</td>
        <td>${data.faculty || '-'}</td>
        <td>${data.program || '-'}</td>
        <td>${data.registrationDate || '-'}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteData('${docId}')">Hapus</button>
        </td>
    `;
    
    return row;
}

// Fungsi untuk menghapus data
async function deleteData(docId) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        try {
            await deleteDoc(doc(db, "mahasiswa", docId));
            alert('Data berhasil dihapus!');
            // Reload data
            loadMahasiswaData();
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert('Gagal menghapus data: ' + error.message);
        }
    }
}

// Make deleteData available globally
window.deleteData = deleteData;

// Load data saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    loadMahasiswaData();
});