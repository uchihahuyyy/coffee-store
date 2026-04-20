const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// --- BƯỚC 1: NẠP BIẾN MÔI TRƯỜNG ---
// Ép đọc file .env ở cùng thư mục để tránh lỗi undefined
dotenv.config({ path: path.join(__dirname, '.env') });

const Product = require('./models/Product');

// --- BƯỚC 2: CẤU HÌNH ĐƯỜNG DẪN KẾT NỐI ---
// Nếu trong .env có MONGO_URI thì dùng, không có thì tự động dùng Local
const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coffee-store';

console.log('------------------------------------------');
console.log('>>> Đang chuẩn bị Seed dữ liệu...');
console.log('>>> Mục tiêu kết nối:', dbURI.includes('cluster') ? '☁️ MONGODB ATLAS (ONLINE)' : '🏠 LOCALHOST (OFFLINE)');
console.log('------------------------------------------');

// --- BƯỚC 3: DỮ LIỆU MẪU ---
const seedProducts = [
    { name: 'Cà phê sữa đá', price: 25000, image: '/images/cfsuada.jfif', category: 'Coffee' },
    { name: 'Cà phê đen đá', price: 20000, image: '/images/cfdenda.jfif', category: 'Coffee' },
    { name: 'Cà phê Espresso', price: 30000, image: '/images/cfespresso.jfif', category: 'Coffee' },
    { name: 'Cà phê Cappuccino', price: 35000, image: '/images/cfcapuchino.jfif', category: 'Coffee' },
    { name: 'Cà phê Latte', price: 40000, image: '/images/cflatte.jfif', category: 'Coffee' },
    { name: 'Cà phê Mocha', price: 45000, image: '/images/cfmocha.jfif', category: 'Coffee' },
    { name: 'Cà phê Macchiato', price: 47000, image: '/images/cfmacchiato.jfif', category: 'Coffee' },
    { name: 'Cà phê Americano', price: 30000, image: '/images/cfamericano.jfif', category: 'Coffee' },
    { name: 'Trà đào cam sả', price: 35000, image: '/images/cftdcs.jfif', category: 'Tea' },
    { name: 'Trà sữa trân châu', price: 30000, image: '/images/cftstc.jfif', category: 'Tea' },
    { name: 'Sinh tố xoài', price: 35000, image: '/images/cfstxoai.jfif', category: 'Smoothie' },
    { name: 'Sinh tố bơ', price: 37000, image: '/images/cfstbo.jfif', category: 'Smoothie' },
    { name: 'Sinh tố dâu', price: 34000, image: '/images/cfstdau.jfif', category: 'Smoothie' },
    { name: 'Nước ép cam', price: 30000, image: '/images/cfnecam.jfif', category: 'Juice' },
    { name: 'Nước ép cà rốt', price: 28000, image: '/images/cfnecarot.jfif', category: 'Juice' },
    { name: 'Nước ép ổi', price: 29000, image: '/images/cfneoi.jfif', category: 'Juice' },
    { name: 'Sữa chua đánh đá', price: 32000, image: '/images/cfscdd.jfif', category: 'Other' },
    { name: 'Nước suối', price: 10000, image: '/images/cfnsuoi.jfif', category: 'Other' },
    { name: 'Trà xanh matcha', price: 45000, image: '/images/cftxmatcha.jfif', category: 'Tea' },
    { name: 'Chocolate nóng', price: 40000, image: '/images/cfchoco.jfif', category: 'Other' },
];

// --- BƯỚC 4: THỰC THI SEED ---
const seedDatabase = async () => {
    try {
        // Kết nối tới DB được chọn
        await mongoose.connect(dbURI);
        console.log('✅ Kết nối thành công!');

        // Xóa dữ liệu cũ
        await Product.deleteMany({});
        console.log('✅ Đã dọn dẹp sạch sẽ dữ liệu cũ.');

        // Thêm dữ liệu mới
        await Product.insertMany(seedProducts);
        console.log('✅ Đã nạp thành công 20 sản phẩm mẫu!');

    } catch (err) {
        console.error('❌ Lỗi trong khi Seed dữ liệu:', err.message);
    } finally {
        // Đóng kết nối
        await mongoose.connection.close();
        console.log('🔌 Đã ngắt kết nối an toàn.');
        console.log('------------------------------------------');
    }
};

seedDatabase();