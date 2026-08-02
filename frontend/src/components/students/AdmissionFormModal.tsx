'use client';

import React, { useState } from 'react';
import { X, CheckCircle, UserPlus, FileText, ChevronRight, ChevronLeft, Upload } from 'lucide-react';

interface AdmissionFormProps {
  onClose: () => void;
  onAddStudent: (student: any) => void;
}

export function AdmissionFormModal({ onClose, onAddStudent }: AdmissionFormProps) {
  const [activeStep, setActiveStep] = useState(1);

  const [formData, setFormData] = useState({
    // 1. Personal Information
    studentId: 'STU-2026-' + Math.floor(1000 + Math.random() * 9000),
    admissionNo: 'ADM-2026-' + Math.floor(10000 + Math.random() * 90000),
    rollNo: String(Math.floor(100 + Math.random() * 900)),
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '2010-05-15',
    gender: 'MALE',
    bloodGroup: 'O+',
    nationality: 'Nepali',
    religion: 'Hinduism',
    citizenshipNo: '',
    birthCertNo: '',
    profilePhoto: null as File | null,

    // 2. Academic Information
    academicYear: '2025-2026',
    admissionDate: new Date().toISOString().split('T')[0],
    classCode: 'G10',
    section: 'A',
    stream: 'Science',
    faculty: 'Schooling',
    house: 'Gryffindor',
    shift: 'Day',
    previousSchool: 'Sunrise Secondary School',
    previousGrade: '3.85 GPA / 88%',
    studentStatus: 'ACTIVE',

    // 3. Contact Information
    mobileNumber: '+977 9801234567',
    email: '',
    currentAddress: 'Baneshwor-10, Kathmandu',
    permanentAddress: 'Dharan-05, Sunsari',
    district: 'Kathmandu',
    province: 'Bagmati Province',
    country: 'Nepal',
    postalCode: '44600',

    // 4. Parent / Guardian Information
    fatherName: '',
    fatherMobile: '+977 9841000000',
    fatherEmail: '',
    fatherOccupation: 'Business / Enterprise',
    fatherCitizenshipNo: '12-01-75-09876',
    motherName: '',
    motherMobile: '+977 9841111111',
    motherEmail: '',
    motherOccupation: 'Educator',
    motherCitizenshipNo: '12-01-78-01234',
    guardianName: '',
    guardianRelation: 'Uncle',
    guardianMobile: '',
    guardianEmail: '',
    guardianAddress: '',

    // 5. Emergency Contact
    emergencyContactPerson: '',
    emergencyRelation: 'Father',
    emergencyPhone: '+977 9801234567',
    emergencyAltPhone: '+977 9841000000',
    emergencyAddress: 'Baneshwor-10, Kathmandu',

    // 6. Medical Information
    allergies: 'None',
    medicalConditions: 'None',
    disabilities: 'None',
    medications: 'None',
    doctorName: 'Dr. S. K. Sharma',
    hospitalName: 'Norvic Hospital',
    emergencyMedicalNotes: 'No known chronic illness.',

    // 7. Transport Information
    usesTransport: 'Yes',
    route: 'Route #4 (Koteshwor - Baneshwor - Maitighar)',
    pickupPoint: 'Baneshwor Chowk',
    dropoffPoint: 'Baneshwor Chowk',
    busNumber: 'BA 3 KHA 4589',
    driverName: 'Ram Bahadur',

    // 8. Hostel Information
    hostelRequired: 'No',
    hostelName: 'N/A',
    roomNumber: 'N/A',
    bedNumber: 'N/A',
    wardenName: 'N/A',

    // 9. Fee Information
    admissionFee: '$500',
    monthlyFeePlan: '$250 / Month',
    scholarship: '10% Merit Scholarship',
    discount: '$50 Waiver',
    paymentMethod: 'Cash / Direct Transfer',
    feeStatus: 'PAID',

    // 10. Documents Upload
    studentPhotoUploaded: true,
    birthCertUploaded: true,
    citizenshipCertUploaded: false,
    transferCertUploaded: true,
    markSheetUploaded: true,
    characterCertUploaded: true,
    medicalCertUploaded: false,
    passportCopyUploaded: false,
    parentCitizenshipCopyUploaded: true,

    // 11. Login Credentials
    username: '',
    portalEmail: '',
    tempPassword: 'SMS-' + Math.random().toString(36).slice(-8).toUpperCase(),
    sendCredentialsSMS: true,
  });

  const STEPS = [
    { num: 1, label: 'Personal Info', icon: '👤' },
    { num: 2, label: 'Academic Info', icon: '🎓' },
    { num: 3, label: 'Contact Details', icon: '📞' },
    { num: 4, label: 'Parent / Guardian', icon: '👨‍👩‍👧' },
    { num: 5, label: 'Emergency Contact', icon: '🚨' },
    { num: 6, label: 'Medical Info', icon: '🩺' },
    { num: 7, label: 'Transport', icon: '🚌' },
    { num: 8, label: 'Hostel', icon: '🏢' },
    { num: 9, label: 'Fee & Payment', icon: '💵' },
    { num: 10, label: 'Documents Upload', icon: '📁' },
    { num: 11, label: 'Portal Account', icon: '🔐' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`.trim();
    
    const newStudent = {
      id: 's-' + Date.now(),
      userId: 'u-' + Date.now(),
      studentIdCode: formData.studentId,
      admissionNo: formData.admissionNo,
      rollNo: formData.rollNo,
      gender: formData.gender,
      dob: formData.dob,
      bloodGroup: formData.bloodGroup,
      nationality: formData.nationality,
      house: formData.house,
      status: formData.studentStatus,
      user: {
        firstName: formData.firstName || 'New',
        lastName: formData.lastName || 'Student',
        email: formData.email || `${(formData.firstName || 'student').toLowerCase()}@sms.edu`,
        phone: formData.mobileNumber,
      },
      class: { name: formData.classCode === 'G10' ? 'Grade 10' : 'Grade 11', code: formData.classCode },
      section: { name: `Section ${formData.section}` },
      allergies: formData.allergies,
      emergencyContact: formData.emergencyPhone,
    };

    onAddStudent(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/30">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Complete 11-Step Student Admission Registration</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pathaibhara Comprehensive Enrollment Form</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 11-Step Navigation Tabs Bar */}
        <div className="flex overflow-x-auto bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-2 gap-1.5 scrollbar-none">
          {STEPS.map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveStep(s.num)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                activeStep === s.num
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.num}. {s.label}</span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {/* STEP 1: Personal Information */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">1. Personal Information</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Student ID (Auto)</label>
                  <input type="text" readOnly value={formData.studentId} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 font-mono font-bold text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Admission No</label>
                  <input type="text" value={formData.admissionNo} onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Roll Number</label>
                  <input type="text" value={formData.rollNo} onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">First Name *</label>
                  <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" placeholder="e.g. Aarav" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Middle Name (Optional)</label>
                  <input type="text" value={formData.middleName} onChange={(e) => setFormData({ ...formData, middleName: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" placeholder="e.g. Kumar" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Last Name *</label>
                  <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" placeholder="e.g. Shrestha" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Date of Birth</label>
                  <input type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="mt-1 w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Gender</label>
                  <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="mt-1 w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Blood Group</label>
                  <select value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} className="mt-1 w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                    <option value="O+">O+</option><option value="A+">A+</option><option value="B+">B+</option><option value="AB+">AB+</option>
                    <option value="O-">O-</option><option value="A-">A-</option><option value="B-">B-</option><option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Religion</label>
                  <input type="text" value={formData.religion} onChange={(e) => setFormData({ ...formData, religion: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Information */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">2. Academic Information</h4>
              

            </div>
          )}

          {/* STEP 3: Contact Information */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">3. Contact Details</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mobile Number *</label>
                  <input type="text" required value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" placeholder="e.g. student@sms.edu" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Current Address</label>
                  <input type="text" value={formData.currentAddress} onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Permanent Address</label>
                  <input type="text" value={formData.permanentAddress} onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Parent / Guardian Information */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">4. Parent / Guardian Information</h4>
              
              {/* Father Details */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <p className="text-xs font-bold text-slate-900 dark:text-white">👨 Father Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="text" placeholder="Father Full Name" value={formData.fatherName} onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                  <input type="text" placeholder="Mobile Number" value={formData.fatherMobile} onChange={(e) => setFormData({ ...formData, fatherMobile: e.target.value })} className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                  <input type="text" placeholder="Occupation" value={formData.fatherOccupation} onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })} className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
              </div>

              {/* Mother Details */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <p className="text-xs font-bold text-slate-900 dark:text-white">👩 Mother Details</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="text" placeholder="Mother Full Name" value={formData.motherName} onChange={(e) => setFormData({ ...formData, motherName: e.target.value })} className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                  <input type="text" placeholder="Mobile Number" value={formData.motherMobile} onChange={(e) => setFormData({ ...formData, motherMobile: e.target.value })} className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                  <input type="text" placeholder="Occupation" value={formData.motherOccupation} onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })} className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Emergency Contact */}
          {activeStep === 5 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">5. Emergency Contact</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Contact Person</label>
                  <input type="text" value={formData.emergencyContactPerson} onChange={(e) => setFormData({ ...formData, emergencyContactPerson: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" placeholder="e.g. Uncle / Father" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number *</label>
                  <input type="text" required value={formData.emergencyPhone} onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Relationship</label>
                  <input type="text" value={formData.emergencyRelation} onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Medical Information */}
          {activeStep === 6 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">6. Medical Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Allergies</label>
                  <input type="text" value={formData.allergies} onChange={(e) => setFormData({ ...formData, allergies: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" placeholder="e.g. Peanuts, Penicillin" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Medical Conditions</label>
                  <input type="text" value={formData.medicalConditions} onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" placeholder="e.g. Asthma" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Transport Information */}
          {activeStep === 7 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">7. Transport Information (Optional)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Uses School Transport</label>
                  <select value={formData.usesTransport} onChange={(e) => setFormData({ ...formData, usesTransport: e.target.value })} className="mt-1 w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Route</label>
                  <input type="text" value={formData.route} onChange={(e) => setFormData({ ...formData, route: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Bus Number</label>
                  <input type="text" value={formData.busNumber} onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Hostel Information */}
          {activeStep === 8 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">8. Hostel Information (Optional)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Hostel Required</label>
                  <select value={formData.hostelRequired} onChange={(e) => setFormData({ ...formData, hostelRequired: e.target.value })} className="mt-1 w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Hostel Name</label>
                  <input type="text" value={formData.hostelName} onChange={(e) => setFormData({ ...formData, hostelName: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Room Number</label>
                  <input type="text" value={formData.roomNumber} onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: Fee Information */}
          {activeStep === 9 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">9. Fee Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Admission Fee</label>
                  <input type="text" value={formData.admissionFee} onChange={(e) => setFormData({ ...formData, admissionFee: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Scholarship / Waiver</label>
                  <input type="text" value={formData.scholarship} onChange={(e) => setFormData({ ...formData, scholarship: e.target.value })} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Fee Status</label>
                  <select value={formData.feeStatus} onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })} className="mt-1 w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold">
                    <option value="PAID">Paid</option>
                    <option value="PARTIAL">Partial</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: Documents Upload */}
          {activeStep === 10 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">10. Required Documents Checklist</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  'Student Profile Photo',
                  'Birth Certificate',
                  'Citizenship Certificate',
                  'Previous School Transfer Certificate',
                  'Previous Mark Sheet / Grades',
                  'Character Certificate',
                  'Medical Certificate',
                  'Passport Copy (Optional)',
                  'Parent Citizenship Copy'
                ].map((doc, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{doc}</span>
                    <button type="button" className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-lg font-bold flex items-center gap-1 hover:bg-indigo-100">
                      <Upload className="w-3 h-3" /> Upload File
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 11: Login Account */}
          {activeStep === 11 && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">11. Student Portal Credentials</h4>
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Student Portal Username</label>
                    <input type="text" readOnly value={(formData.firstName || 'student').toLowerCase() + '.' + formData.rollNo} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Generated Temp Password</label>
                    <input type="text" readOnly value={formData.tempPassword} className="mt-1 w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 font-mono font-bold text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" checked={formData.sendCredentialsSMS} onChange={(e) => setFormData({ ...formData, sendCredentialsSMS: e.target.checked })} id="sendSms" className="rounded text-indigo-600" />
                  <label htmlFor="sendSms" className="text-xs font-semibold text-slate-700 dark:text-slate-300">Send Login Credentials via SMS & Email</label>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              disabled={activeStep === 1}
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Step
            </button>

            {activeStep < 11 ? (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => Math.min(11, prev + 1))}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md flex items-center gap-1"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" /> Complete Student Enrollment
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
