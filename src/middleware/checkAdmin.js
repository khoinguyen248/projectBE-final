const checkAdmin = (req, res, next) => {
    // req.user đã có được từ verifyToken đi trước
    if (!req.user || req.user.role !== 'Admin') {
        return res.status(403).json({ 
            message: "Bạn không có quyền Admin! Cấm truy cập." 
        });
    }
    
    // Nếu là Admin thì cho qua
    next();
};

export default checkAdmin;