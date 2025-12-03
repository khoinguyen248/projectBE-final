import mongoose from 'mongoose';
import User from './account.js'; // Quan trọng: phải có .js

const AdminSchema = new mongoose.Schema({
    permissions: [{ type: String }],
    adminLevel: { type: String, default: 'Standard' }
});

const Admin = User.discriminator('Admin', AdminSchema);

export default Admin;