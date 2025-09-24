# Logitik ERP System

Sistem ERP berbasis Laravel (backend) dan React (frontend) untuk manajemen logistik dan supply chain.

## Fitur Utama

### Backend (Laravel)
- **Authentication**: Login dengan email atau NIK
- **Role-based Access Control**: Admin, Manager, Staff, Viewer
- **Multi-Database Support**: MySQL dan SQL Server
- **Supplier Order Management**: CRUD operations untuk order supplier
- **Excel Import**: Import data order dari file Excel (.xlsx/.xls)
- **RESTful API**: API endpoints yang konsisten dan terstruktur

### Frontend (React)
- **Single Page Application**: Menggunakan React dengan Vite
- **Routing**: React Router untuk navigasi
- **Internationalization**: Dukungan bahasa Indonesia dan Inggris
- **Protected Routes**: Halaman yang memerlukan autentikasi
- **Responsive Design**: Tampilan mobile-friendly
- **Excel Upload**: Interface untuk upload file Excel

## Struktur Proyek

```
logitik/
├── backend/                  # Laravel Backend API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Middleware/
│   │   ├── Models/
│   │   ├── Imports/
│   │   └── Providers/
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── pages/
│   │   ├── services/
│   │   └── i18n.js
│   └── public/
└── README.md
```

## Setup & Installation

### Backend (Laravel)

1. **Install Dependencies**
   ```bash
   cd backend
   composer install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env file dengan database credentials
   ```

3. **Database Setup**
   ```bash
   php artisan key:generate
   php artisan migrate
   php artisan db:seed
   ```

4. **Run Backend Server**
   ```bash
   php artisan serve
   # Server akan berjalan di http://localhost:8000
   ```

### Frontend (React)

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   # File .env sudah tersedia dengan konfigurasi default
   VITE_API_URL=http://localhost:8000/api
   ```

3. **Run Frontend Development Server**
   ```bash
   npm run dev
   # Server akan berjalan di http://localhost:5173
   ```

## Demo Credentials

Setelah menjalankan seeder, gunakan kredensial berikut untuk testing:

| Role    | Email                | NIK     | Password    |
|---------|---------------------|---------|-------------|
| Admin   | admin@logitik.com   | ADMIN001| password123 |
| Manager | manager@logitik.com | MGR001  | password123 |
| Staff   | staff@logitik.com   | STF001  | password123 |

## API Endpoints

### Authentication
- `POST /api/login` - Login dengan email/NIK
- `POST /api/logout` - Logout
- `GET /api/user` - Get user profile

### Public
- `GET /api/profile` - Get company profile (public)
- `GET /api/health` - Health check

### Supplier Orders (Protected)
- `GET /api/supplier-orders` - List orders
- `POST /api/supplier-orders` - Create order
- `GET /api/supplier-orders/{id}` - Get specific order
- `PUT /api/supplier-orders/{id}` - Update order
- `DELETE /api/supplier-orders/{id}` - Delete order (Admin/Manager only)
- `POST /api/supplier-orders/import` - Import from Excel (Admin/Manager only)

## Database Schema

### Users Table
```sql
- id (bigint, primary key)
- email (string, unique)
- nik (string, unique) 
- password (string, hashed)
- role (enum: admin, manager, staff, viewer)
- timestamps
```

### Supplier Orders Table
```sql
- id (bigint, primary key)
- order_number (string, unique)
- supplier_name (string)
- supplier_contact (string, nullable)
- order_date (date)
- delivery_date (date, nullable)
- total_amount (decimal)
- status (enum: pending, confirmed, shipped, delivered, cancelled)
- items (json, nullable)
- notes (text, nullable)
- created_by (foreign key to users)
- updated_by (foreign key to users)
- timestamps
- soft deletes
```

## Excel Import Format

Format file Excel untuk import supplier orders:

| Column | Required | Type | Description |
|--------|----------|------|-------------|
| order_number | Yes | String | Nomor order unik |
| supplier_name | Yes | String | Nama supplier |
| supplier_contact | No | String | Kontak supplier |
| order_date | Yes | Date | Tanggal order |
| delivery_date | No | Date | Tanggal pengiriman |
| total_amount | No | Number | Total amount |
| status | No | String | Status order |
| items | No | JSON String | Detail items |
| notes | No | String | Catatan |

## Technologies Used

### Backend
- Laravel 11
- PHP 8.2+
- Laravel Sanctum (API Authentication)
- Maatwebsite/Laravel-Excel (Excel Import/Export)
- MySQL/SQL Server Support

### Frontend
- React 19
- Vite (Build Tool)
- React Router DOM (Routing)
- React i18next (Internationalization)
- Axios (HTTP Client)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

Untuk dukungan teknis atau pertanyaan, silakan hubungi:
- Email: info@hayder-logistics.com
- Phone: +62-21-12345678
