import React, { useState, useContext, useRef } from 'react';
import { storage } from '../firebase'; // Make sure to export your storage instance from firebase.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../Context/AuthContext'; // Adjust the path as necessary

const FileUpload = ({ onFileUpload }) => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (fileToUpload) => {
    if (!fileToUpload || !currentUser) return;

    setUploading(true);
    const storageRef = ref(storage, `chat-images/${Date.now()}_${fileToUpload.name}`); // Create a unique path

    try {
      await uploadBytes(storageRef, fileToUpload);
      const url = await getDownloadURL(storageRef); // Get the download URL
      console.log('File uploaded successfully:', url);
      // Pass the URL back to the parent component (e.g., Chat)
      if (onFileUpload) onFileUpload(url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setFile(null); 
    }
  };

  return (
    <div className="file-upload-container flex items-center">
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="bg-blue-500 text-white w-10 h-10 px-2 rounded-full mr-9"
      >
        +
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden" 
      />
    </div>
  );
};

export default FileUpload;
