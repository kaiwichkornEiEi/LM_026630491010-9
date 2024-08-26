import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import MyPetShow from './MyPetShow';

interface FormData {
  petName: string;
  birthDate: string;
  category: string;
  sex: string;
  description: string;
  ownerName: string;
  email: string;
  image: File | null;
}

const initialFormData: FormData = {
  petName: '', birthDate: '', category: 'Other', sex: 'Other', description: '', ownerName: '', email: '', image: null,
};

const initialErrors = { petName: '', birthDate: '', ownerName: '', email: '' };

const InputField: React.FC<{ name: string; type?: string; value: string; onChange: any; error?: string }> = ({ name, type = 'text', value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{name}:</label>
    <input type={type} name={name} value={value} onChange={onChange} className="border p-2 w-full text-sm" />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

const RadioGroup: React.FC<{ name: string; options: string[]; value: string; onChange: any }> = ({ name, options, value, onChange }) => (
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

const MyPetForm: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const validate = (): boolean => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.petName) { newErrors.petName = 'Please enter your pet\'s name'; isValid = false; }
    if (!formData.birthDate) { newErrors.birthDate = 'Please select a birth date'; isValid = false; }
    if (!formData.ownerName) { newErrors.ownerName = 'Please enter your name'; isValid = false; }
    if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = 'Please enter a valid email'; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) setSubmittedData(formData); };
  const handleReset = () => { setFormData(initialFormData); setErrors(initialErrors); setSubmittedData(null); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: name === 'image' ? files?.[0] || null : value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f8ff]">
      <Header />
      <main className="flex-grow py-6 px-2">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-md max-w-md">
          {submittedData ? (
            <MyPetShow data={submittedData} />
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
      <Footer />
    </div>
  );
};

export default MyPetForm;
