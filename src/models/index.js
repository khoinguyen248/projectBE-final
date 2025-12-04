// Export các Model cốt lõi của hệ thống HRMS
export { default as User } from './account.js';
export { default as Admin } from './admin.js'; // Nếu bạn vẫn để tên file là manager.js thì sửa dòng này lại
export { default as Employee } from './employee.js';

// Export các Model chức năng
export { default as Job } from './jobs.js';
export { default as Schedule } from './schedule.js';
export { default as Salary } from './salary.js';
export { default as Timesheet } from './timesheet.js';
export { default as Notification } from './notification.js';

// Export Model AI
export { default as TrainingData } from './training-data.js';