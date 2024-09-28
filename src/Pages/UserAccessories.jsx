import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, ArcElement);

const UserAccessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [uniqueColors, setUniqueColors] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleAddAccessories = (e) => {
    e.preventDefault();
    navigate('/add-accessories');
  };

  useEffect(() => {
    const fetchAccessories = async () => {
      if (!currentUser) return;

      const q = query(
        collection(db, 'accessories'),
        where('userId', '==', currentUser.uid)
      );

      try {
        const querySnapshot = await getDocs(q);
        const accessoriesData = [];
        const colorsSet = new Set(); 

        querySnapshot.forEach((doc) => {
          const accessory = { id: doc.id, ...doc.data() };
          accessoriesData.push(accessory);
          colorsSet.add(accessory.color); 
        });

        setAccessories(accessoriesData);
        setUniqueColors([...colorsSet]); 
      } catch (error) {
        console.error("Error fetching accessories: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, [currentUser]);

  const handleDeleteAccessories = async (id) => {
    try {
      await deleteDoc(doc(db, 'accessories', id));
      setAccessories(accessories.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleFilterByColor = (color) => {
    setSelectedColor(color);
  };

  const filteredAccessories = selectedColor
    ? accessories.filter(item => item.color === selectedColor)
    : accessories;

 
  const colorCounts = accessories.reduce((acc, item) => {
    acc[item.color] = (acc[item.color] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(colorCounts),
    datasets: [
      {
        data: Object.values(colorCounts),
        backgroundColor: Object.keys(colorCounts).map((_, index) => `hsl(${index * 30}, 70%, 50%)`),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const Spinner = () => (
    <div className="p-6 flex justify-center items-center">
      <div className="animate-spin h-10 w-10 border-4 border-t-4 border-white border-t-purple-500 rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-purple-950 to-black p-10">
      <div className='text-3xl md:text-6xl font-bold text-white mb-12'>User Accessories</div>
      <button
        onClick={handleAddAccessories}
        className="bg-gradient-to-r from-purple-600 to-blue-400 text-black text-2xl font-oswald rounded-3xl px-8 py-3 my-2 hover:bg-gray-300"
      >
        Add Accessories
      </button>

   
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-md p-4 text-gray-800">
          You own {accessories.length} Accessories
        </h2>
        <div>
          <select
            value={selectedColor}
            onChange={(e) => handleFilterByColor(e.target.value)}
            className="text-black text-xl font-oswald rounded-3xl px-4 py-2 bg-purple-600 hover:bg-purple-800 transition-colors duration-300 mr-2"
          >
            <option value="">All Colors</option>
            {uniqueColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-white text-xl">{Spinner()}</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Bought On</th>
                <th className="px-4 py-2">Color</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccessories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No accessories available
                  </td>
                </tr>
              ) : (
                filteredAccessories.map((item) => (
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
                    <td className="px-4 py-2">{item.color}</td>
                    <td className="px-4 py-2"> 
                      <button
                        onClick={() => handleDeleteAccessories(item.id)}
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
      )}


      {accessories.length > 0 && (
        <div className="mt-4 w-1/2 h-1/2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Accessories by Color</h3>
          <Pie data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default UserAccessories;
