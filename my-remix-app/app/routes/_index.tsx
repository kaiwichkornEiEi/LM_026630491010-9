import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Index: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow py-8 px-4 bg-gray-100">
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">ข้อมูลส่วนตัว</h1>
          <ul className="space-y-4">
            <li>
              <strong className="font-semibold">ชื่อ-นามสกุล:</strong> ไกรวิชกร เกตุบุบผา
            </li>
            <li>
              <strong className="font-semibold">รหัสนักศึกษา:</strong> 026630491010-9
            </li>
            <li>
              <strong className="font-semibold">Email:</strong> kaiwichkorn.ket@rmutto.ac.th
            </li>
            <li>
              <strong className="font-semibold">Facebook</strong> นาย นิค
            </li>
          </ul>
        </section>
    </main>
    <Footer />
  </div>
);

export default Index;
