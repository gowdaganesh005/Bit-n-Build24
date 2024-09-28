import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function AddClothes() {
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [boughtOn, setBoughtOn] = useState('')
  const [lastUsed, setLastUsed] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, image, boughtOn, lastUsed })
    setName('')
    setImage(null)
    setBoughtOn('')
    setLastUsed('')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen font-oswald bg-gradient-to-br from-purple-900 via-purple-700 to-pink-500 flex flex-col items-center justify-center p-4">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Add Clothes
      </motion.h1>
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
        <div className="mb-6">
          <label htmlFor="lastUsed" className="block text-gray-700 text-sm font-bold mb-2">Last Used</label>
          <input 
            type="date" 
            id="lastUsed" 
            value={lastUsed} 
            onChange={(e) => setLastUsed(e.target.value)} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Clothes
          </button>
          <Link 
            to="/clothes" 
            className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800"
          >
            Back to Clothes
          </Link>
        </div>
      </form>
    </div>
  )
}
