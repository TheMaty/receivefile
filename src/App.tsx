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
    const customerFetched = await fetch('/api/download?filename=DavidCooperfield.json')
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
        <br/>
        <b>Customer Information</b>
        {customer !== null && customer !== undefined && <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>EMail</th>
              <th>National Id</th>
              <th>Created Date</th>
              <th>Type</th>
              <th>License</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            
              <tr key={customer.customerCard.main.firstname}>
                <td>{customer.customerCard.main.firstname}</td>
                <td>{customer.customerCard.main.lastname}</td>
                <td>{customer.customerCard.main.email}</td>
                <td>{customer.customerCard.main.nationalid}</td>
                <td>{customer.customerCard.main.dateCreated}</td>
                <td>{customer.customerCard.main.type}</td>
                <td>{customer.customerCard.main.license}</td>
                <td>{customer.customerCard.main.price}</td>
              </tr>

          </tbody>
        </table>}
        <br/>
        <b>Customer Activities</b>
        {customer !== null && customer !== undefined && <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            
              <tr key={customer.customerCard.additionalInformation.activities[0].type}>
                <td>{customer.customerCard.additionalInformation.activities[0].type}</td>
                <td>{customer.customerCard.additionalInformation.activities[0].dateCreated}</td>
                <td>{customer.customerCard.additionalInformation.activities[0].from}</td>
                <td>{customer.customerCard.additionalInformation.activities[0].to}</td>
              </tr>

          </tbody>
        </table>}
        <br/>
        <b>Customer Activities</b>
        {customer !== null && customer !== undefined && <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Subscription</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            
              <tr key={customer.customerCard.additionalInformation.incidents[0].name}>
                <td>{customer.customerCard.additionalInformation.incidents[0].name}</td>
                <td>{customer.customerCard.additionalInformation.incidents[0].dateCreated}</td>
                <td>{customer.customerCard.additionalInformation.incidents[0].subscription}</td>
                <td>{customer.customerCard.additionalInformation.incidents[0].status}</td>
              </tr>

          </tbody>
        </table>}
      </header>
    </div>
  )
}

export default App;
