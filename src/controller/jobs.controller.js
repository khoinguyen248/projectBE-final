import Job from '../models/jobs.js';
import User from '../models/account.js'; // Để check xem nhân viên có tồn tại ko

// 1. Tạo công việc mới (Giao việc)
export const createJob = async (req, res) => {
    try {
        const { jobName, description, deadline, employeeId } = req.body;

        // Check xem nhân viên được gán có tồn tại không
        const emp = await User.findById(employeeId);
        if (!emp) {
            return res.status(404).json({ message: "Nhân viên không tồn tại!" });
        }

        const newJob = await Job.create({
            jobName,
            description,
            deadline,
            employeeId,
            status: 'Pending'
        });

        res.status(201).json({
            message: "Giao việc thành công!",
            data: newJob
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Lấy danh sách Job (Có populate để hiện tên nhân viên thay vì hiện ID loằng ngoằng)
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate('employeeId', 'fname lname email department'); // Lấy thêm thông tin người làm
            
        res.status(200).json({
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Cập nhật Job (Ví dụ: Đổi deadline, đổi trạng thái)
export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedJob) return res.status(404).json({ message: "Không tìm thấy công việc" });

        res.status(200).json({ message: "Cập nhật thành công", data: updatedJob });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Xóa Job
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await Job.findByIdAndDelete(id);
        res.status(200).json({ message: "Đã xóa công việc!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};