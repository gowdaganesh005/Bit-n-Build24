import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Import your Firebase Firestore
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods
import { AuthContext } from '../Context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';

const AddElectronics = () => { // Updated component name
  const { currentUser } = useContext(AuthContext); 
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [boughtOn, setBoughtOn] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const Spinner = () => (
    <div className="p-6 flex justify-center items-center">
      <div className="animate-spin h-10 w-10 border-4 border-t-4 border-white border-t-purple-500 rounded-full"></div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError("You must be logged in to add electronics.");
      navigate('/login');
      return;
    }
    setLoading(true);

    try {
      await addDoc(collection(db, 'electronics'), { 
        image,
        boughtOn,
        userId: currentUser.uid, 
        createdAt: new Date() 
      });

      // Reset the form
      setName('');
      setImage(null);
      setBoughtOn('');
      setError(null); 
      navigate('/user-electronics'); // Update the navigation path
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to add electronics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen font-oswald bg-gradient-to-br from-purple-900 via-purple-700 to-pink-500 flex flex-col items-center justify-center p-4">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Add Electronics
      </motion.h1>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image File</label>
          <input 
            type="file" 
            id="image" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="boughtOn" className="block text-gray-700 text-sm font-bold mb-2">Bought On</label>
          <input 
            type="date" 
            id="boughtOn" 
            value={boughtOn} 
            onChange={(e) => setBoughtOn(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Electronics
          </button>
          <Link 
            to="/user-electronics" // Update the navigation path
            className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800"
          >
            Back to Electronics
          </Link>
        </div>
      </form>
      {loading && <Spinner />}
      {error && <p className="text-red-500 mt-4">{error}</p>} 
    </div>
  );
};

export default AddElectronics; // Updated export statement
