import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserClothes = () => {
  // Initially empty data structure for clothes
  const clothes = [];

  const navigate=useNavigate();

  const handleAddClothes = (e) => {
    e.preventDefault();
    navigate('/add-clothes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-purple-950 to-black p-10">
      <div className='text-3xl md:text-6xl font-bold text-white mb-12'>user clothes</div>
      <button
      onClick={handleAddClothes}
      className="bg-gradient-to-r from-purple-600 to-blue-400  text-black text-2xl font-oswald rounded-3xl px-8 py-3 my-2 hover:bg-gray-300"
      
      >Add Clothes</button>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          You own {clothes.length} clothes (Want to Donate?)
        </h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Last Used</th>
              <th className="px-4 py-2">Bought On</th>
            </tr>
          </thead>
          <tbody>
            {clothes.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No clothes available
                </td>
              </tr>
            ) : (
              clothes.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{item.lastUsed}</td>
                  <td className="px-4 py-2">{item.boughtOn}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserClothes;