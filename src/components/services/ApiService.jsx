const BASE_URL = 'https://traineeapp.azurewebsites.net/api';

export const fetchCustomerData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/customers`);
    if (!response.ok) {
      throw new Error('API:n hakeminen epäonnistui.');
    }

    const data = await response.json();
    console.log('Customer API onnistui:', data);
    return data;
  } catch (error) {
    console.error('Error fetching from Customer API:', error);
    throw error;
  }
};

export const fetchTrainingData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trainings`);
    if (!response.ok) {
      throw new Error('API:n hakeminen epäonnistui.');
    }

    const data = await response.json();
    console.log('Training API onnistui:', data);
    return data;
  } catch (error) {
    console.error('Error fetching from Training API:', error);
    throw error;
  }
};

export const fetchCustomerName = async (training) => {
  const customerLink = training.links.find(link => link.rel === 'customer');
  if (!customerLink) {
    return 'N/A';
  }

  const response = await fetch(customerLink.href);
  if (!response.ok) {
    throw new Error('API:n hakeminen epäonnistui.');
  }

  const customer = await response.json();
  return `${customer.firstname} ${customer.lastname}`;
};

export const deleteTraining = async (trainingLink) => {
  const response = await fetch(trainingLink, {
    method: 'DELETE'
  });
  return response.ok;
};

export const addCustomer = async (customerData) => {
  try {
    const response = await fetch(`${BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error('API:n hakeminen epäonnistui.');
    }

    const newCustomer = await response.json();
    console.log('Lisätty uusi asiakas:', newCustomer);
    return newCustomer;
  } catch (error) {
    console.error('Ongelma uutta asiakasta lisätessä:', error);
    throw error;
  }
};

export const editCustomer = async (editedCustomer) => {
  try {
    const response = await fetch(editedCustomer.selfLink, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedCustomer),
    });

    if (response.ok) {
      const updatedCustomer = await response.json();

      setRowData((prevRowData) =>
        prevRowData.map((customer) =>
          customer.links.find((link) => link.rel === 'self').href === editedCustomer.selfLink
            ? updatedCustomer
            : customer
        )
      );
    } else {
      throw new Error('Päivitys epäonnistui');
    }
  } catch (error) {
    console.error('Error updating customer:', error);
  }
};


export const customerDelete = async (customerLink) => {
  const response = await fetch(customerLink, {
    method: 'DELETE'
  });
  return response.ok;
};