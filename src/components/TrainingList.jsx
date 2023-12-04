import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import dayjs from 'dayjs';
import { fetchTrainingData, fetchCustomerName, deleteTraining } from './services/ApiService';

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);

  const formatDate = (params) => {
    return dayjs(params.value).format('DD.MM.YYYY HH:mm');
  };

  const columnDefs = [
    { headerName: 'Asiakas', field: 'customerName', sortable: true, filter: true },
    { headerName: 'Päivämäärä', field: 'date', valueFormatter: formatDate },
    { headerName: 'Toiminta', field: 'activity', sortable: true, filter: true },
    { headerName: 'Kesto', field: "duration", sortable: true, filter: true },
    { headerName: 'Toiminto', field: 'links', cellRenderer: (params) => {
        const selfLink = params.data.links.find(link => link.rel === "self").href;
        return <button className="red-button" onClick={() => deleteTrainingHandler(selfLink)}>Poista</button>
    }}
  ];

  const fetchTrainings = async () => {
    try {
      const trainingData = await fetchTrainingData();
      const trainingDataWithCustomerName = await Promise.all(trainingData.content.map(async training => {
        const customerName = await fetchCustomerName(training);
        return { ...training, customerName };
      }));
      setTrainings(trainingDataWithCustomerName);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteTrainingHandler = async (trainingLink) => {
    if (window.confirm("Varmistus: Haluatko todella poistaa kyseisen harjoituksen?")) {
      try {
        const success = await deleteTraining(trainingLink);
        if (success) {
          setTrainings(trainings.filter(training => training.links.find(link => link.rel === "self").href !== trainingLink));
        } else {
          alert("Poisto epäonnistui");
        }
      } catch (error) {
        console.error('Error deleting training:', error);
      }
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  return (
    <div className="ag-theme-alpine-dark" style={{ height: 800, width: '100%' }}>
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
        defaultColDef={{
            cellStyle: () => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        })
        }}
      />
    </div>
  );
};

export default TrainingList;