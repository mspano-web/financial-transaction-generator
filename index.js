/* 
  index.js
*/
const axios = require('axios');
const faker = require('faker');

const MAX_TXT_TO_PROCESS = 4

// ----------------------------------------

const automaticGenerateTxn = async (count) => {
  for (let i = 0; i < count; i++) {
    const transaction = {
      credit_card_number: faker.finance.creditCardNumber(), 
      amount: faker.finance.amount(),
      destination: faker.finance.account(),
      transaction_datetime : new Date().toISOString(),
      location: faker.address.city(), 
      type: 'Purchase', 
      status: 'Pending', 
      id: faker.datatype.uuid(), 
    };

    try {
      const response = await axios.post('http://localhost:3000/transaction', transaction);
      console.log(`Transaction ${i + 1} successfully sent to transaction processor ${JSON.stringify(transaction)} con resultado ${response.data} in automaticGenerateTxn`);
    } catch (error) {
      console.error(`Error sending transaction ${i + 1} to transaction processor in automaticGenerateTxn:`, error.message);
    }
  }
};

const manualGenerateTxn = async () => {
    const transaction = [ {
      credit_card_number: "4532143016922506", 
      amount: "584.23",
      destination: "GB65YJKC24223269149692",
      transaction_datetime : "2024-04-26T14:30:00.000Z",
      location: "New York", 
      type: 'Purchase', 
      status: 'Pending', 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58748" 
    },
    {
      credit_card_number: "4532143016922506", 
      amount: "2030.50",
      destination: "GB65YJKC24223269149692",
      transaction_datetime : "2024-04-26T15:30:00.000Z",
      location: "Miami", 
      type: 'Purchase', 
      status: 'Pending', 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58749" 
    },
    {
      credit_card_number: "4532143016922507", 
      amount: "100.50",
      destination: "GB65YJKC24223269149693",
      transaction_datetime : "2024-04-26T16:30:00.000Z",
      location: "Orlando", 
      type: 'Purchase', 
      status: 'Pending', 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58750" 
    },
    {
      credit_card_number: "4532143016922507", 
      amount: "210.70",
      destination: "GB65YJKC24223269149693",
      transaction_datetime : "2024-04-26T16:36:00.000Z",
      location: "Texsa", 
      type: 'Purchase', 
      status: 'Pending', 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58751" 
    },
    {
      credit_card_number: "4532143016922506", 
      amount: "120.00",
      destination: "GB65YJKC24223269149692",
      transaction_datetime : "2024-04-26T15:42:00.000Z",
      location: "California", 
      type: 'Purchase', 
      status: 'Pending', 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58752" 
    },
  ];

  // ----------------------------------------

    try {
      for (let i = 0; i < transaction.length; i++) {
        const response = await axios.post('http://localhost:3000/transaction', transaction[i]);
        console.log(`Transaction ${i + 1} successfully sent to transaction processor ${JSON.stringify(transaction[i])} con resultado ${response.data} in manualGenerateTxn`);
      }
    } catch (error) {
      console.error(`Error sending transaction to transaction processor in manualGenerateTxn:`, error);
    }
};

// ----------------------------------------

async function main() {
  await automaticGenerateTxn(MAX_TXT_TO_PROCESS);
  await manualGenerateTxn();
}

main();

