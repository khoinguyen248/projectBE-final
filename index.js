import express from 'express';
import connectData from './src/database/index.js';
import Root from './src/router/index.js';
import cors from 'cors';
import seedDatabase from './src/database/seeder.js'; // <--- 1. Import hàm này

const app = express();
app.use(cors());
app.use(express.json());

app.use(Root);

// Sửa lại đoạn connect và listen
const startServer = async () => {
    try {
        await connectData(); // Kết nối Mongo
        
        // --- 2. GỌI HÀM SEEDER TẠI ĐÂY ---
        await seedDatabase(); 
        // ---------------------------------

        // Lấy port từ env hoặc mặc định 8080
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server Error", error);
    }
}

startServer();