import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AddTraining = ({ isOpen, onClose, addTraining, customer }) => {
  const [newTraining, setNewTraining] = useState({
    date: new Date(),
    duration: '',
    activity: '',
    customer: customer 
  });

  const handleDateChange = (date) => {
    setNewTraining({ ...newTraining, date: date });
  };

  const handleChange = (event) => {
    setNewTraining({ ...newTraining, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTraining(newTraining);
      setNewTraining({
        date: new Date(),
        duration: '',
        activity: '',
        customer: customer
      });
      onClose(); 
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
    <Modal appElement={document.getElementById('root')} isOpen={isOpen} onRequestClose={onClose} >
      <h2>Lisää Uusi Harjoitus</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Päivämäärä:</label>
          <DatePicker
            selected={newTraining.date}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="dd.MM.yyyy HH:mm"
          />
        </div>
        <div>
          <label htmlFor="duration">Kesto (min):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={newTraining.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="activity">Toiminta:</label>
          <input
            type="text"
            id="activity"
            name="activity"
            value={newTraining.activity}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Lisää harjoitus</button>
      </form>
    </Modal>
  );
};

export default AddTraining;