import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';

const UserClothes = () => {
  const [clothes, setClothes] = useState([]);
  const [isDescending, setIsDescending] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleAddClothes = (e) => {
    e.preventDefault();
    navigate('/add-clothes');
  };

  useEffect(() => {
    const fetchClothes = async () => {
      if (!currentUser) return;

      const q = query(
        collection(db, 'clothes'),
        where('userId', '==', currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const clothesData = [];
      querySnapshot.forEach((doc) => {
        clothesData.push({ id: doc.id, ...doc.data() });
      });

      setClothes(clothesData);
    };

    fetchClothes();
  }, [currentUser]);

  const sortedClothes = [...clothes].sort((a, b) => {
    const wearCountA = a.wearCount || 0;
    const wearCountB = b.wearCount || 0;
    return isDescending ? wearCountB - wearCountA : wearCountA - wearCountB;
  });

  const handleSortToggle = () => {
    setIsDescending((prev) => !prev);
  };

  const handleDeleteClothes = async (id) => {
    try {
      await deleteDoc(doc(db, 'clothes', id));
      setClothes(clothes.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleWearClothes = async (id) => {
    try {
      const clothesRef = doc(db, 'clothes', id);
      const currentItem = clothes.find(item => item.id === id);
      
      await updateDoc(clothesRef, {
        wearCount: (currentItem?.wearCount || 0) + 1,
        lastUsed: serverTimestamp()
      });
      
      setClothes(prevClothes => prevClothes.map(item => 
        item.id === id ? { ...item, wearCount: (item.wearCount || 0) + 1, lastUsed: new Date() } : item
      ));
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-purple-950 to-black p-10">
      <div className='text-3xl md:text-6xl font-bold text-white mb-12'>User Clothes</div>
      <button
        onClick={handleAddClothes}
        className="bg-gradient-to-r from-purple-600 to-blue-400 text-black text-2xl font-oswald rounded-3xl px-8 py-3 my-2 hover:bg-gray-300"
      >
        Add Clothes
      </button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-md p-4 text-gray-800">
          You own a Total of {clothes.length} Apparels (Want to Donate?)
        </h2>
        <button
          onClick={handleSortToggle}
          className={`text-black text-xl font-oswald rounded-3xl px-8 py-3 transition-colors duration-300 
            ${isDescending ? 'bg-gradient-to-r from-purple-600 to-blue-400 hover:bg-gray-300' : 'bg-gradient-to-r from-red-600 to-orange-400 hover:bg-gray-300'}`}
        >
          Sort
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Bought On</th>
              <th className="px-4 py-2">Wear Count</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedClothes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No clothes available
                </td>
              </tr>
            ) : (
              sortedClothes.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{item.boughtOn}</td>
                  <td className="px-4 py-2">{item.wearCount || 0}</td>
                  <td className="px-4 py-2"> 
                    <button
                      onClick={() => handleWearClothes(item.id)}
                      className="bg-blue-500 text-white rounded-lg px-4 py-1 hover:bg-blue-700 transition-colors duration-300"
                    >
                      ➕
                    </button>
                    <button
                      onClick={() => handleDeleteClothes(item.id)}
                      className="bg-red-500 text-white rounded-lg px-4 py-1 hover:bg-red-700 transition-colors duration-300 ml-2"
                    >
                      🗑️
                    </button>
                  </td>
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
