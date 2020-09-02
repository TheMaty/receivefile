import React, { useState } from 'react';
import './App.css';
import { isNullOrUndefined } from 'util';

interface Main {
  firstname: string;
  lastname: string;
  email: string;
  nationalid: string;
  dateCreated: Date;
  type: string;
  license: string;
  price: string;
}

interface Activity {
  type: string;
  dateCreated: Date;
  from: string;
  to: string;
}

interface Incident {
  name: string;
  dateCreated: Date;
  subscription: string;
  status: string;
}

interface AdditionalInformation {
  activities: Activity[];
  incidents: Incident[];
  inLanguage: string;
}

interface CustomerCard {
  main: Main;
  additionalInformation: AdditionalInformation;
}

interface ICustomer {
  customerCard: CustomerCard;
}



function App() {

  // Prepare state hook for users list
  // Note: <ICustomer[]> is for TypeScript
  // It specifies the shape of usersList state
  const [customer, setCustomer] = useState<ICustomer>()
  // Create async function for fetching welcome message


  // Create async function for fetching customer list
  const fetchCustomer = async () => {
    const customerFetched = await fetch('/api/download?filename=asset.json')
      .then(res => res.json()) // Process the incoming data
    // Update customerList state
    setCustomer(customerFetched)
  }
  return (
    <div className="app">
      <header className="app-header">
        {/* Button to fetch customer data */}
        <button onClick={fetchCustomer}>Fetch Customer</button>
        {/* Display table of customer after fetching customer demographic information data */}
        {customer !== null && customer !== undefined && <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>EMail</th>
              <th>National Id</th>
            </tr>
          </thead>
          <tbody>
            
              <tr key={customer.customerCard.main.firstname}>
                <td>{customer.customerCard.main.firstname}</td>
                <td>{customer.customerCard.main.lastname}</td>
                <td>{customer.customerCard.main.email}</td>
                <td>{customer.customerCard.main.nationalid}</td>
              </tr>

          </tbody>
        </table>}
      </header>
    </div>
  )
}

export default App;
