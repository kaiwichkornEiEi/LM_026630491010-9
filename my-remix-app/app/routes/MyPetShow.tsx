import React from 'react';

interface PetData {
  petName: string;
  birthDate: string;
  category: string;
  sex: string;
  description: string;
  ownerName: string;
  email: string;
  image: File | null;
}
const MyPetShow: React.FC<{ data: PetData }> = ({ data }) => {
  return (
    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">แสดงข้อมูลสัตว์เลี้ยง</h2>
      <p><strong>ชื่อสัตว์เลี้ยง:</strong> {data.petName}</p>
      <p><strong>วันเกิด:</strong> {data.birthDate}</p>
      <p><strong>ประเภท:</strong> {data.category}</p>
      <p><strong>เพศ:</strong> {data.sex}</p>
      <p><strong>รายละเอียด:</strong> {data.description}</p>
      <p><strong>ชื่อเจ้าของ:</strong> {data.ownerName}</p>
      <p><strong>อีเมล:</strong> {data.email}</p>
      {data.image && (
        <div>
          <strong>รูปภาพ:</strong>
          <img
            src={URL.createObjectURL(data.image)}
            alt="Uploaded pet"
            className="mt-4 max-w-xs"
          />
        </div>
      )}
    </div>
  );
};
export default MyPetShow;
