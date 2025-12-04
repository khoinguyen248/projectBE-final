import TrainingData from '../models/training-data.js'; 
import { initialTrainingData } from '../utils/seedData.js';

const seedDatabase = async () => {
    try {
        // 1. Đếm xem trong bảng đã có dữ liệu chưa
        const count = await TrainingData.countDocuments();

        // 2. Nếu chưa có gì (count == 0) thì mới thêm vào
        if (count === 0) {
            await TrainingData.insertMany(initialTrainingData);
            console.log("🌱 [AI SEEDER] Đã khởi tạo dữ liệu mẫu thành công!");
        } else {
            console.log("✅ [AI SEEDER] Dữ liệu đã tồn tại, bỏ qua bước khởi tạo.");
        }
    } catch (error) {
        console.error("❌ [AI SEEDER] Lỗi khi khởi tạo dữ liệu mẫu:", error);
    }
};

export default seedDatabase;