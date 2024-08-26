import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import MyPetShow from './MyPetShow';

// กำหนดประเภทของข้อมูลฟอร์มที่เราต้องการเก็บ
interface FormData {
  petName: string;
  birthDate: string;
  category: string;
  sex: string;
  description: string;
  ownerName: string;
  email: string;
  image: File | null; // ใช้ประเภท File หรือ null สำหรับการอัพโหลดไฟล์
}

// กำหนดค่าเริ่มต้นของข้อมูลฟอร์ม
const initialFormData: FormData = {
  petName: '',
  birthDate: '',
  category: 'Other', // ค่าเริ่มต้นของประเภท
  sex: 'Other', // ค่าเริ่มต้นของเพศ
  description: '',
  ownerName: '',
  email: '',
  image: null, // ค่าเริ่มต้นของไฟล์ภาพเป็น null
};

// กำหนดค่าเริ่มต้นของข้อผิดพลาดในฟอร์ม
const initialErrors = { petName: '', birthDate: '', ownerName: '', email: '' };

// คอมโพเนนต์ InputField ใช้สำหรับการกรอกข้อมูลประเภทต่างๆ
const InputField: React.FC<{ name: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string }> = ({ name, type = 'text', value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{name}:</label>
    <input type={type} name={name} value={value} onChange={onChange} className="border p-2 w-full text-sm" />
    {error && <span className="text-red-500 text-sm">{error}</span>} {/* แสดงข้อผิดพลาดถ้ามี */}
  </div>
);

// คอมโพเนนต์ RadioGroup ใช้สำหรับการเลือกตัวเลือกแบบ radio
const RadioGroup: React.FC<{ name: string; options: string[]; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ name, options, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{name}:</label>
    <div className="space-x-2">
      {options.map(option => (
        <label key={option} className="text-sm">
          <input type="radio" name={name} value={option} checked={value === option} onChange={onChange} className="mr-1" />
          {option}
        </label>
      ))}
    </div>
  </div>
);

// คอมโพเนนต์หลักของฟอร์ม
const MyPetForm: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData); // สถานะของข้อมูลฟอร์ม
  const [errors, setErrors] = useState(initialErrors); // สถานะของข้อผิดพลาด
  const [submittedData, setSubmittedData] = useState<FormData | null>(null); // ข้อมูลที่ส่ง

  // ฟังก์ชันตรวจสอบความถูกต้องของข้อมูล
  const validate = (): boolean => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.petName) { newErrors.petName = 'Please enter your pet\'s name'; isValid = false; }
    if (!formData.birthDate) { newErrors.birthDate = 'Please select a birth date'; isValid = false; }
    if (!formData.ownerName) { newErrors.ownerName = 'Please enter your name'; isValid = false; }
    if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = 'Please enter a valid email'; isValid = false; }

    setErrors(newErrors); // อัพเดตข้อผิดพลาด
    return isValid; // คืนค่าความถูกต้องของฟอร์ม
  };

  // ฟังก์ชันจัดการเมื่อฟอร์มถูกส่ง
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    if (validate()) setSubmittedData(formData); // ถ้าข้อมูลถูกต้องให้ตั้งค่า submittedData
  };

  // ฟังก์ชันจัดการการรีเซ็ตฟอร์ม
  const handleReset = () => {
    setFormData(initialFormData); // รีเซ็ตข้อมูลฟอร์ม
    setErrors(initialErrors); // รีเซ็ตข้อผิดพลาด
    setSubmittedData(null); // ลบข้อมูลที่ส่ง
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของฟิลด์ในฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement; // ใช้ Type Assertion

    // ถ้า name เป็น 'image' ให้ตรวจสอบ files
    if (name === 'image') {
      setFormData(prevData => ({
        ...prevData,
        [name]: files && files.length > 0 ? files[0] : null // อัพเดตไฟล์ภาพ
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value // อัพเดตค่าอื่นๆ
      }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f8ff]">
      <Header /> {/* แสดง Header */}
      <main className="flex-grow py-6 px-2">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-md max-w-md">
          {submittedData ? (
            <MyPetShow data={submittedData} /> // แสดงข้อมูลที่กรอกไว้ถ้ามี
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-[#555] mb-4">ข้อมูลสัตว์เลี้ยง</h2>
              <InputField name="petName" value={formData.petName} onChange={handleChange} error={errors.petName} />
              <InputField name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} error={errors.birthDate} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ประเภท:</label>
                <select name="category" value={formData.category} onChange={handleChange} className="border p-2 w-full text-sm rounded">
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <RadioGroup name="sex" options={['Male', 'Female', 'Other']} value={formData.sex} onChange={handleChange} />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">รายละเอียดเพิ่มเติม:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full text-sm rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">อัพโหลดรูปสัตว์เลี้ยง:</label>
                <input type="file" name="image" accept="image/*" onChange={handleChange} className="border p-2 w-full text-sm rounded" />
              </div>
              <h2 className="text-2xl font-bold text-[#555] mb-4">ข้อมูลเจ้าของ</h2>
              <InputField name="ownerName" value={formData.ownerName} onChange={handleChange} error={errors.ownerName} />
              <InputField name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
              <div className="space-x-2">
                <button type="submit" className="bg-[#457b9d] text-white px-3 py-1 rounded hover:bg-[#1d3557] text-sm">Submit</button>
                <button type="button" onClick={handleReset} className="bg-gray-500 text-white px-3 py-1 rounded text-sm">Reset</button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer /> {/* แสดง Footer */}
    </div>
  );
};

export default MyPetForm;
