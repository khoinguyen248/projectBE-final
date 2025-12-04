export const initialTrainingData = [
    // =========================================================
    // NHÓM 1: NGUY CƠ NGHỈ VIỆC CAO (CHURN: TRUE)
    // =========================================================

    // 1.1. Nhóm "Burnout" (Lương ổn nhưng làm việc quá sức -> Kiệt sức nghỉ)
    { salary: 15000000, avgHours: 12, lateRate: 0.1, years: 1, churn: true },
    { salary: 20000000, avgHours: 13, lateRate: 0.0, years: 2, churn: true },
    { salary: 18000000, avgHours: 11.5, lateRate: 0.2, years: 3, churn: true },
    { salary: 25000000, avgHours: 14, lateRate: 0.1, years: 5, churn: true }, // Lương cao nhưng làm 14 tiếng thì cũng nghỉ
    { salary: 12000000, avgHours: 11, lateRate: 0.0, years: 1, churn: true },

    // 1.2. Nhóm "Underpaid" (Làm bình thường/tốt nhưng lương quá bèo -> Bỏ sang công ty khác)
    { salary: 4000000, avgHours: 8, lateRate: 0.0, years: 1, churn: true },
    { salary: 5000000, avgHours: 8.5, lateRate: 0.1, years: 2, churn: true }, // Làm 2 năm mà lương 5tr -> Nghỉ
    { salary: 6000000, avgHours: 9, lateRate: 0.0, years: 3, churn: true },
    { salary: 4500000, avgHours: 8, lateRate: 0.0, years: 1, churn: true },

    // 1.3. Nhóm "Disengaged" (Chán việc, trễ deadline liên tục -> Sắp bị đuổi hoặc tự nghỉ)
    { salary: 10000000, avgHours: 8, lateRate: 0.6, years: 2, churn: true }, // Trễ 60% job
    { salary: 15000000, avgHours: 7, lateRate: 0.8, years: 4, churn: true },
    { salary: 8000000, avgHours: 8, lateRate: 0.5, years: 1, churn: true },
    { salary: 20000000, avgHours: 8, lateRate: 0.9, years: 5, churn: true }, // Lương cao mà không làm việc

    // 1.4. Nhóm "Quiet Quitting" (Làm cho có lệ, số giờ làm cực thấp)
    { salary: 9000000, avgHours: 4, lateRate: 0.1, years: 2, churn: true },
    { salary: 12000000, avgHours: 3.5, lateRate: 0.0, years: 3, churn: true },
    { salary: 7000000, avgHours: 2, lateRate: 0.2, years: 1, churn: true },

    // =========================================================
    // NHÓM 2: AN TOÀN / HÀI LÒNG (CHURN: FALSE)
    // =========================================================

    // 2.1. Nhóm "Dream Job" (Lương cao, giờ làm chuẩn)
    { salary: 30000000, avgHours: 8, lateRate: 0.0, years: 3, churn: false },
    { salary: 40000000, avgHours: 8.5, lateRate: 0.0, years: 5, churn: false },
    { salary: 50000000, avgHours: 7.5, lateRate: 0.0, years: 4, churn: false },
    { salary: 100000000, avgHours: 8, lateRate: 0.0, years: 2, churn: false }, // Sếp tổng

    // 2.2. Nhóm "Newbie Tiềm Năng" (Mới vào, lương trung bình/cao, chăm chỉ)
    // Đây là nhóm để FIX LỖI "người mới 0 năm" bạn vừa gặp
    { salary: 8000000, avgHours: 8, lateRate: 0.0, years: 0, churn: false },
    { salary: 10000000, avgHours: 8.5, lateRate: 0.0, years: 0, churn: false },
    { salary: 15000000, avgHours: 8, lateRate: 0.0, years: 0, churn: false },
    { salary: 12000000, avgHours: 9, lateRate: 0.1, years: 0, churn: false }, // Hơi nhiệt tình quá mức

    // 2.3. Nhóm "Loyal Employee" (Lương trung bình khá, gắn bó lâu năm, ổn định)
    { salary: 12000000, avgHours: 8, lateRate: 0.05, years: 4, churn: false },
    { salary: 14000000, avgHours: 8, lateRate: 0.1, years: 6, churn: false },
    { salary: 11000000, avgHours: 8, lateRate: 0.0, years: 3, churn: false },
    { salary: 18000000, avgHours: 8.2, lateRate: 0.0, years: 7, churn: false },

    // 2.4. Nhóm "Thực tập sinh/Fresher" (Lương thấp nhưng chấp nhận để học hỏi -> An toàn trong năm đầu)
    { salary: 3000000, avgHours: 8, lateRate: 0.0, years: 0, churn: false }, // Intern
    { salary: 5000000, avgHours: 9, lateRate: 0.1, years: 0, churn: false }, // Fresher chăm chỉ

    // =========================================================
    // NHÓM 3: EDGE CASES (TRƯỜNG HỢP NHẠY CẢM / NGOẠI LỆ)
    // =========================================================

    // Lương rất cao nhưng trễ deadline liên tục -> Vẫn có nguy cơ nghỉ (bị đuổi)
    { salary: 50000000, avgHours: 8, lateRate: 0.8, years: 2, churn: true },

    // Lương thấp nhưng làm rất ít (part-time) -> An toàn
    { salary: 3000000, avgHours: 4, lateRate: 0.0, years: 1, churn: false },

    // Thâm niên rất cao (10 năm) lương trung bình -> An toàn (Ngại thay đổi)
    { salary: 15000000, avgHours: 8, lateRate: 0.2, years: 10, churn: false },
    
    // Thâm niên cao (8 năm) nhưng lương quá thấp so với thâm niên -> Nguy cơ nghỉ
    { salary: 8000000, avgHours: 8, lateRate: 0.0, years: 8, churn: true },
];