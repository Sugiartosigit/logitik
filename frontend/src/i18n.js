import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  id: {
    translation: {
      // Navigation
      home: 'Beranda',
      profile: 'Profil',
      login: 'Masuk',
      logout: 'Keluar',
      supplierOrders: 'Order Supplier',
      
      // Login page
      loginTitle: 'Masuk ke Sistem',
      emailOrNik: 'Email / NIK',
      password: 'Kata Sandi',
      loginButton: 'Masuk',
      loginError: 'Email/NIK atau kata sandi tidak valid',
      
      // Profile page
      profileTitle: 'Profil Perusahaan',
      companyName: 'Nama Perusahaan',
      description: 'Deskripsi',
      established: 'Didirikan',
      modules: 'Modul Tersedia',
      features: 'Fitur Utama',
      contact: 'Kontak',
      version: 'Versi',
      lastUpdated: 'Terakhir Diperbarui',
      
      // Supplier Orders
      supplierOrdersTitle: 'Daftar Order Supplier',
      orderNumber: 'Nomor Order',
      supplierName: 'Nama Supplier',
      orderDate: 'Tanggal Order',
      deliveryDate: 'Tanggal Kirim',
      totalAmount: 'Total Amount',
      status: 'Status',
      actions: 'Aksi',
      
      // Status
      pending: 'Menunggu',
      confirmed: 'Dikonfirmasi',
      shipped: 'Dikirim',
      delivered: 'Terkirim',
      cancelled: 'Dibatalkan',
      
      // Actions
      view: 'Lihat',
      edit: 'Edit',
      delete: 'Hapus',
      create: 'Buat Baru',
      import: 'Import Excel',
      export: 'Export',
      save: 'Simpan',
      cancel: 'Batal',
      
      // Messages
      success: 'Berhasil',
      error: 'Terjadi kesalahan',
      loading: 'Memuat...',
      noData: 'Tidak ada data',
      confirmDelete: 'Apakah Anda yakin ingin menghapus?',
      
      // Common
      search: 'Cari',
      filter: 'Filter',
      refresh: 'Refresh',
      close: 'Tutup',
      back: 'Kembali',
      next: 'Selanjutnya',
      previous: 'Sebelumnya',
    }
  },
  en: {
    translation: {
      // Navigation
      home: 'Home',
      profile: 'Profile',
      login: 'Login',
      logout: 'Logout',
      supplierOrders: 'Supplier Orders',
      
      // Login page
      loginTitle: 'Login to System',
      emailOrNik: 'Email / NIK',
      password: 'Password',
      loginButton: 'Login',
      loginError: 'Invalid email/NIK or password',
      
      // Profile page
      profileTitle: 'Company Profile',
      companyName: 'Company Name',
      description: 'Description',
      established: 'Established',
      modules: 'Available Modules',
      features: 'Key Features',
      contact: 'Contact',
      version: 'Version',
      lastUpdated: 'Last Updated',
      
      // Supplier Orders
      supplierOrdersTitle: 'Supplier Orders List',
      orderNumber: 'Order Number',
      supplierName: 'Supplier Name',
      orderDate: 'Order Date',
      deliveryDate: 'Delivery Date',
      totalAmount: 'Total Amount',
      status: 'Status',
      actions: 'Actions',
      
      // Status
      pending: 'Pending',
      confirmed: 'Confirmed', 
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      
      // Actions
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      create: 'Create New',
      import: 'Import Excel',
      export: 'Export',
      save: 'Save',
      cancel: 'Cancel',
      
      // Messages
      success: 'Success',
      error: 'An error occurred',
      loading: 'Loading...',
      noData: 'No data available',
      confirmDelete: 'Are you sure you want to delete?',
      
      // Common
      search: 'Search',
      filter: 'Filter',
      refresh: 'Refresh',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id', // Default language (Indonesian)
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    react: {
      useSuspense: false,
    }
  });

export default i18n;