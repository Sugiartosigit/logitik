# ERP Sistem Logistik

Sistem ERP (Enterprise Resource Planning) komprehensif untuk manajemen divisi logistik yang dirancang khusus untuk memenuhi kebutuhan bisnis modern.

## 🌟 Fitur Utama

### 📊 Dashboard ERP
- Overview bisnis real-time
- Statistik kinerja utama
- Navigasi antar modul yang intuitif
- Desain responsif untuk semua perangkat

### 📦 Manajemen Inventory
- Tracking stok barang real-time
- Manajemen kategori produk
- Alert stok rendah dan habis
- CRUD operations lengkap untuk produk
- Pencarian dan filter produk

### 💰 Manajemen Keuangan
- Tracking pendapatan dan pengeluaran
- Kategorisasi transaksi
- Laporan keuangan otomatis
- Kalkulasi profit margin dan ROI
- Export laporan keuangan

### 👥 Manajemen SDM
- Database karyawan lengkap
- Sistem absensi digital
- Evaluasi performance karyawan
- Manajemen cuti dan izin
- Tracking produktivitas

### 🤝 Customer Relations Management (CRM)
- Database pelanggan dan prospek
- Lead management dan conversion tracking
- Manajemen pesanan pelanggan
- Customer lifetime value tracking

### 🚚 Manajemen Supplier
- Database supplier dan vendor
- Purchase order management
- Evaluasi kinerja supplier
- Rating dan review sistem
- Contract management

### 📈 Laporan & Analytics
- Dashboard analytics komprehensif
- Multiple report types (Financial, Sales, HR, Inventory)
- Export ke PDF dan Excel
- Print-friendly reports
- Date range filtering

## 🚀 Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: LocalStorage untuk demo (dapat diintegrasikan dengan database)
- **Design**: Responsive design dengan CSS Grid & Flexbox
- **Icons**: Emoji icons untuk kemudahan dan konsistensi
- **Print**: CSS print media queries untuk laporan

## 📱 Responsivitas

Sistem ini fully responsive dan dapat digunakan di:
- Desktop computers
- Tablets
- Mobile phones
- Print media

## 🎯 Target Pengguna

- **Manajer Divisi**: Overview dan monitoring bisnis
- **Staff Keuangan**: Manajemen transaksi dan laporan
- **HR Manager**: Manajemen karyawan dan performance
- **Sales Team**: Customer relationship management
- **Procurement**: Supplier dan purchase order management
- **Admin**: Sistem management dan reporting

## 📂 Struktur File

```
logitik/
├── index.html          # Dashboard utama
├── inventory.html      # Manajemen inventory
├── finance.html        # Manajemen keuangan
├── hr.html            # Manajemen SDM
├── customer.html      # Customer relations
├── supplier.html      # Manajemen supplier
├── reports.html       # Laporan & analytics
└── README.md          # Dokumentasi
```

## 🔧 Instalasi dan Penggunaan

1. **Clone repository**
```bash
git clone https://github.com/Sugiartosigit/logitik.git
cd logitik
```

2. **Buka di browser**
- Double-click pada `index.html`, atau
- Serve menggunakan web server lokal

3. **Mulai menggunakan**
- Navigasi menggunakan menu utama
- Data akan tersimpan di localStorage browser
- Gunakan fitur export untuk backup data

## 💾 Manajemen Data

### LocalStorage
Sistem menggunakan localStorage untuk menyimpan data:
- `inventory` - Data produk dan stok
- `transactions` - Data keuangan (income/expense)  
- `employees` - Data karyawan
- `customers` - Data pelanggan dan prospek
- `suppliers` - Data supplier
- `orders` - Data pesanan
- `purchaseOrders` - Data purchase order
- `attendance` - Data absensi
- `performance` - Data performance karyawan
- `evaluations` - Data evaluasi supplier

### Backup & Restore
Untuk backup data:
1. Buka Developer Tools (F12)
2. Console tab
3. Run: `localStorage`
4. Copy semua data

## 🔒 Keamanan

- Data tersimpan lokal di browser
- Tidak ada transmisi data ke server eksternal
- Cocok untuk demo dan prototype
- Untuk produksi, integrasikan dengan backend dan database

## 🎨 Kustomisasi

### Theme Colors
File CSS menggunakan CSS custom properties yang mudah diubah:
- Primary: `#3498db`
- Secondary: `#2c3e50`
- Success: `#27ae60`
- Warning: `#f39c12`
- Danger: `#e74c3c`

### Menambah Modul Baru
1. Buat file HTML baru
2. Copy structure dari modul existing
3. Tambah navigation link di semua file
4. Implement JavaScript functionality

## 📊 Fitur Mendatang

- [ ] Integration dengan database real
- [ ] User authentication system
- [ ] Role-based access control
- [ ] Email notifications
- [ ] Advanced reporting dengan charts
- [ ] Mobile app companion
- [ ] API untuk integrasi third-party
- [ ] Automated backup system

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

## 📝 Lisensi

Sistem ini dikembangkan untuk keperluan bisnis internal. Silakan sesuaikan lisensi sesuai kebutuhan organisasi.

## 📞 Support

Untuk support dan pertanyaan:
- Create issue di GitHub repository
- Contact: hayder.logistics@example.com

## 🌟 Acknowledgments

- Desain terinspirasi dari best practices ERP modern
- Icons menggunakan emoji untuk universal compatibility
- Responsive design mengikuti mobile-first approach

---

**© 2025 Hayder Logistics System - ERP Sistem Logistik**
