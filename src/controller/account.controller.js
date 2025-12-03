import User from '../models/account.js';
import Admin from '../models/admin.js';
import Employee from '../models/employee.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Đăng ký
export const register = async (req, res) => {
    try {
        const { fname, lname, email, password, adminKey, department } = req.body;

        // 1. Check trùng email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại!" });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser;

        // 3. Logic tạo Admin hoặc Employee
        if (adminKey) {
            // Kiểm tra Key từ file .env
            if (adminKey === process.env.ADMIN_REGISTRATION_KEY) {
                newUser = await Admin.create({
                    fname, lname, email, 
                    password: hashedPassword,
                    role: 'Admin',
                    adminLevel: 'SuperAdmin'
                });
            } else {
                return res.status(403).json({ message: "Sai Key Admin!" });
            }
        } else {
            // Mặc định tạo Employee
            newUser = await Employee.create({
                fname, lname, email, 
                password: hashedPassword,
                department: department || 'Chưa xếp phòng',
                role: 'Employee'
            });
        }

        res.status(201).json({ 
            message: "Đăng ký thành công!", 
            data: newUser 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Đăng nhập
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. TÌM USER VÀ GÁN VÀO BIẾN TÊN LÀ "user"
        const user = await User.findOne({ email }); // <--- Đảm bảo biến này tên là 'user'
        
        if (!user) return res.status(404).json({ message: "Email không tồn tại" });

        // 2. So sánh pass
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

        // 3. Tạo Token
        const secretKey = process.env.JWT_SECRET || "khoinguyen";
        
        const token = jwt.sign(
            { 
                id: user._id,       // <--- Lúc này biến 'user' mới tồn tại để dùng
                role: user.role,
                email: user.email 
            }, 
            secretKey, 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Login OK",
            token: token,
            user: {                 // <--- Dùng biến 'user' ở đây cũng ok
                id: user._id,
                role: user.role,
                fname: user.fname
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};