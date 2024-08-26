import React from 'react';

// กำหนดประเภทข้อมูลของสัตว์เลี้ยงที่จะแสดง
interface PetData {
  petName: string; // ชื่อสัตว์เลี้ยง
  birthDate: string; // วันเกิดของสัตว์เลี้ยง
  category: string; // ประเภทของสัตว์เลี้ยง เช่น สุนัข, แมว, หรือ อื่นๆ
  sex: string; // เพศของสัตว์เลี้ยง เช่น เพศผู้, เพศเมีย, หรือ อื่นๆ
  description: string; // รายละเอียดเพิ่มเติมเกี่ยวกับสัตว์เลี้ยง
  ownerName: string; // ชื่อเจ้าของ
  email: string; // อีเมลของเจ้าของ
  image: File | null; // รูปภาพของสัตว์เลี้ยง หรือ null ถ้าไม่มีการอัพโหลด
}

// คอมโพเนนต์เพื่อแสดงข้อมูลสัตว์เลี้ยง
const MyPetShow: React.FC<{ data: PetData }> = ({ data }) => {
  return (
    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
      {/* หัวข้อหลัก */}
      <h2 className="text-2xl font-bold mb-4">แสดงข้อมูลสัตว์เลี้ยง</h2>
      {/* แสดงข้อมูลของสัตว์เลี้ยง */}
      <p><strong>ชื่อสัตว์เลี้ยง:</strong> {data.petName}</p>
      <p><strong>วันเกิด:</strong> {data.birthDate}</p>
      <p><strong>ประเภท:</strong> {data.category}</p>
      <p><strong>เพศ:</strong> {data.sex}</p>
      <p><strong>รายละเอียด:</strong> {data.description}</p>
      <p><strong>ชื่อเจ้าของ:</strong> {data.ownerName}</p>
      <p><strong>อีเมล:</strong> {data.email}</p>
      {/* แสดงรูปภาพถ้ามีการอัพโหลด */}
      {data.image && (
        <div>
          <strong>รูปภาพ:</strong>
          <img
            src={URL.createObjectURL(data.image)} // ใช้ URL.createObjectURL เพื่อสร้าง URL สำหรับแสดงรูปภาพ
            alt="Uploaded pet" // ข้อความอธิบายรูปภาพ
            className="mt-4 max-w-xs" // สไตล์ CSS สำหรับการจัดรูปแบบภาพ
          />
        </div>
      )}
    </div>
  );
};

export default MyPetShow;
