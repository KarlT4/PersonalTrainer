import React, { useState } from 'react';
import Modal from 'react-modal';
import { addCustomer } from './services/ApiService';

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

const AddCustomer = ({ isOpen, onClose }) => {
  const [newCustomer, setNewCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  const handleChange = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addCustomer(newCustomer); // ApiService.jsx avulla toteutuu uuden asiakkaan luominen.
      setNewCustomer({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
      });
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
  <h2>Lisää Uusi Asiakas</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firstname">Etunimi: </label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        value={newCustomer.firstname}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="lastname">Sukunimi: </label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={newCustomer.lastname}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="streetaddress">Osoite: </label>
      <input
        type="text"
        id="streetaddress"
        name="streetaddress"
        value={newCustomer.streetaddress}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="postcode">Postinumero: </label>
      <input
        type="text"
        id="postcode"
        name="postcode"
        value={newCustomer.postcode}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="city">Kaupunki: </label>
      <input
        type="text"
        id="city"
        name="city"
        value={newCustomer.city}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="email">Sähköposti: </label>
      <input
        type="email"
        id="email"
        name="email"
        value={newCustomer.email}
        onChange={handleChange}
      />
    </div>
    <div>
      <label htmlFor="phone">Puhelinnumero: </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={newCustomer.phone}
        onChange={handleChange}
      />
    </div>
    <button className="green-button" type="submit">Lisää asiakas </button>
  </form>
</Modal>

  );
};

export default AddCustomer;