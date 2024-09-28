import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';

const UserElectronics = () => {
  const [electronics, setElectronics] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleAddElectronics = (e) => {
    e.preventDefault();
    navigate('/add-electronics');
  };

  useEffect(() => {
    const fetchElectronics = async () => {
      if (!currentUser) return;

      const q = query(
        collection(db, 'electronics'),
        where('userId', '==', currentUser.uid)
      );

      try {
        const querySnapshot = await getDocs(q);
        const electronicsData = [];
        querySnapshot.forEach((doc) => {
          electronicsData.push({ id: doc.id, ...doc.data() });
        });

        setElectronics(electronicsData);
      } catch (error) {
        console.error("Error fetching electronics: ", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchElectronics();
  }, [currentUser]);

  const handleDeleteElectronics = async (id) => {
    try {
      await deleteDoc(doc(db, 'electronics', id));
      setElectronics(electronics.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const Spinner = () => (
    <div className="p-6 flex justify-center items-center">
      <div className="animate-spin h-10 w-10 border-4 border-t-4 border-white border-t-purple-500 rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-purple-950 to-black p-10">
      <div className='text-3xl md:text-6xl font-bold text-white mb-12'>User Electronics</div>
      <button
        onClick={handleAddElectronics}
        className="bg-gradient-to-r from-purple-600 to-blue-400 text-black text-2xl font-oswald rounded-3xl px-8 py-3 my-2 hover:bg-gray-300"
      >
        Add Electronics
      </button>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-md p-4 text-gray-800">
          You own a Total of {electronics.length} Electronics (Want to <a href="https://goonj.org/" className="underline">Donate?</a> )
        </h2>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? ( 
          <Spinner />
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Bought On</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {electronics.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No electronics available
                  </td>
                </tr>
              ) : (
                electronics.map((item) => (
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
                    <td className="px-4 py-2"> 
                      <button
                        onClick={() => handleDeleteElectronics(item.id)}
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
        )}
      </div>
    </div>
  );
};

export default UserElectronics;
