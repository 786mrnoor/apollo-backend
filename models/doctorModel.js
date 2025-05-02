import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ['MALE', 'FEMALE'], uppercase: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  qualification: { type: String, required: true },
  location: { type: String, required: true },
  onlineConsultationFees: { type: Number },
  physicalConsultationFees: { type: Number },
  consultMode: { type: String, required: true, enum: ['ONLINE', 'PHYSICAL', 'BOTH'], uppercase: true },
  facilityType: { type: String, required: true, enum: ['HOSPITAL', 'OUTPATIENT_CLINICS'], uppercase: true },
  languages: [{ type: String }],
  profileImage: { type: String },
  rating: { type: Number, default: 100, min: 0, max: 100 }
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);
