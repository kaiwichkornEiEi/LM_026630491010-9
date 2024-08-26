import React from 'react';

const Header: React.FC = () => (
  <header className="bg-[#98c1d9] text-white py-4 shadow-md">
    <div className="container mx-auto px-4 flex justify-start items-center">
      <h1 className="text-3xl font-bold mr-6">PetCare</h1> 
      <nav>
        <ul className="flex space-x-4"> 
          <li><a href="/" className="hover:text-[#f0e68c]">Home</a></li>
          <li><a href="/MyPetForm" className="hover:text-[#f0e68c]">Pets</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
