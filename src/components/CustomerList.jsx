import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { customerDelete, fetchCustomerData } from './services/ApiService';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const columnDefs = [
    { headerName: 'Etunimi', field: 'firstname', sortable: true, filter: true  },
    { headerName: 'Sukunimi', field: 'lastname', sortable: true, filter: true  },
    { headerName: 'Osoite', field: 'streetaddress', sortable: true, filter: true  },
    { headerName: 'Postinumero', field: 'postcode', sortable: true, filter: true  },
    { headerName: 'Kaupunki', field: 'city', sortable: true, filter: true  },
    { headerName: 'Sähköposti', field: 'email', sortable: true, filter: true  },
    { headerName: 'Puhelin', field: 'phone', sortable: true, filter: true  },
    { headerName: 'Toiminnot', field: 'links',
    cellRenderer: (params) => {
        const selfLink = params.data.links.find(link => link.rel === 'self').href;
        return (
          <>
            <button className="button green-button" onClick={() => handleEditCustomer(selfLink)}>Muokkaa</button>
            <button className="button red-button" onClick={() => handleDeleteCustomer(selfLink)}>Poista</button>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await fetchCustomerData();
        console.log('API Response:', customerData);
        setCustomers(customerData.content);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddCustomer = async (newCustomer) => {
    try {
      const addedCustomer = await addCustomerData(newCustomer);
      setCustomers((prevCustomers) => [...prevCustomers, addedCustomer]);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsEditCustomerModalOpen(true);
  };

  const handleDeleteCustomer = async (customerLink) => {
    if (window.confirm('Varmistus: Haluatko todella poistaa kyseisen asiakkaan?')) {
      try {
        const success = await customerDelete(customerLink);
        if (success) {
          setCustomers(customers.filter(customer => customer.links.find(link => link.rel === 'self').href !== customerLink));
        } else {
          alert('Asiakkaan poisto epäonnistui');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <div className="ag-theme-alpine-dark" style={{ height: 700, width: '100%' }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          defaultColDef={{
            cellStyle: () => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }),
          }}
        />
      </div>

      <button className="green-button" onClick={() => setIsAddCustomerModalOpen(true)}>Lisää uusi asiakas</button>

      <AddCustomer
        isOpen={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        addCustomer={handleAddCustomer}
      />
      {selectedCustomer && (
        <EditCustomer
        isOpen={isEditCustomerModalOpen}
        onClose={() => {
            setIsEditCustomerModalOpen(false);
            setSelectedCustomer(null);
          }}
          editCustomer={handleEditCustomer}
          customer={selectedCustomer}
        />
      )}
    </div>
  );
}