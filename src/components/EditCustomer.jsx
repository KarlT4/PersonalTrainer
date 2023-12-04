import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { editCustomer } from './services/ApiService';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  content: {
    color: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '300px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(10, 10, 10, 0.9)'
  }
};

const EditCustomer = ({ isOpen, onClose, customerData }) => {
  const [editedCustomer, setEditedCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (customerData) {
    setEditedCustomer({ ...customerData });
    }
  }, [customerData]);

  const handleChange = (event) => {
    setEditedCustomer({ ...editedCustomer, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await editCustomer(editedCustomer); // ApiService.jsx avulla toteutuu asiakastietojen muokkaus.
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal 
      appElement={document.getElementById('root')}
      isOpen={isOpen} onRequestClose={onClose}
      style={modalStyles}
    >
      <h2>Muokkaa Asiakasta</h2>
      <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firstname">Etunimi: </label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        value={editedCustomer.firstname  || ''}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="lastname">Sukunimi: </label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={editedCustomer.lastname  || ''}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="streetaddress">Osoite: </label>
      <input
        type="text"
        id="streetaddress"
        name="streetaddress"
        value={editedCustomer.streetaddress  || ''}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="postcode">Postinumero: </label>
      <input
        type="text"
        id="postcode"
        name="postcode"
        value={editedCustomer.postcode  || ''}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="city">Kaupunki: </label>
      <input
        type="text"
        id="city"
        name="city"
        value={editedCustomer.city  || ''}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="email">Sähköposti: </label>
      <input
        type="email"
        id="email"
        name="email"
        value={editedCustomer.email  || ''}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="phone">Puhelinnumero: </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={editedCustomer.phone  || ''}
        onChange={handleChange}
      />
    </div>
    <button className="green-button" type="submit">Tallenna muutokset </button>
  </form>
</Modal>

  );
};

export default EditCustomer;
