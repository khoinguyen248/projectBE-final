import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    // 1. Lấy token từ header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).send("Bạn chưa đăng nhập (Thiếu Token)");
    }

    // Header thường có dạng: "Bearer <token_dai_ngoang>"
    const token = authHeader.split(" ")[1]; 

    if (!token) {
        return res.status(401).send("Token không hợp lệ");
    }

    try {
        // 2. Xác thực token
        // Lưu ý: Thay "khoinguyen" bằng process.env.JWT_SECRET trong file .env cho bảo mật
        const secretKey = process.env.JWT_SECRET || "khoinguyen"; 
        
        const payload = jwt.verify(token, secretKey);

        // 3. QUAN TRỌNG: Gắn thông tin user vào biến req để dùng ở sau
        req.user = payload; 

        // 4. Cho phép đi tiếp
        next();
        
    } catch (error) {
        // Nếu token hết hạn hoặc sai -> Trả về lỗi 403 (Forbidden)
        return res.status(403).send("Token không hợp lệ hoặc đã hết hạn!");
    }
}

export default verifyToken;