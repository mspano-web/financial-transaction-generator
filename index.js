/* 
  index.js
*/
const axios = require('axios');
const faker = require('faker');

const MAX_TXT_TO_PROCESS = 4
const STATUS = 'NEW'
const TYPE = 'Purchase'

// ----------------------------------------

const automaticGenerateTxn = async (count) => {
  console.log('Automatic....');

  for (let i = 0; i < count; i++) {
    const transaction = {
      credit_card_number: faker.finance.creditCardNumber(), 
      amount: faker.finance.amount(),
      destination: faker.finance.account(),
      transaction_datetime : new Date().toISOString(),
      location: faker.address.city(), 
      type: TYPE, 
      status: STATUS, 
      id: faker.datatype.uuid(), 
    };

    try {
      await sendTxn(transaction, i);
    } catch (error) {
      console.error(`Error sending transaction ${i + 1} to transaction processor in automaticGenerateTxn:`, error.message);
    }
  }
};

const manualGenerateTxn = async () => {
    console.log('Manual....');
    const transaction = [ {
      credit_card_number: "4532143016922506", 
      amount: "584.23",
      destination: "GB65YJKC24223269149692",
      transaction_datetime : "2024-04-26T14:30:00.000Z",
      location: "New York", 
      type: TYPE, 
      status: STATUS, 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58748" 
    },
    {
      credit_card_number: "4532143016922506", 
      amount: "2030.50",
      destination: "GB65YJKC24223269149692",
      transaction_datetime : "2024-04-26T15:30:00.000Z",
      location: "Miami", 
      type: TYPE, 
      status: STATUS, 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58749" 
    },
    {
      credit_card_number: "4532143016922507", 
      amount: "100.50",
      destination: "GB65YJKC24223269149693",
      transaction_datetime : "2024-04-26T16:30:00.000Z",
      location: "Orlando", 
      type: TYPE, 
      status: STATUS, 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58750" 
    },
    {
      credit_card_number: "4532143016922507", 
      amount: "210.70",
      destination: "GB65YJKC24223269149693",
      transaction_datetime : "2024-04-26T16:36:00.000Z",
      location: "Texas", 
      type: TYPE, 
      status: STATUS, 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58751" 
    },
    {
      credit_card_number: "4532143016922506", 
      amount: "120.00",
      destination: "GB65YJKC24223269149692",
      transaction_datetime : "2024-04-26T15:42:00.000Z",
      location: "California", 
      type: TYPE, 
      status: STATUS, 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58752" 
    },
  ];

  // ----------------------------------------

    try {
      for (let i = 0; i < transaction.length; i++) {
        await sendTxn(transaction[i], i);
      }
    } catch (error) {
      console.error(`Error sending transaction to transaction processor in manualGenerateTxn:`, error);
    }
};

// ----------------------------------------

const manualGenerateCompensationTxn = async () => {
  console.log('Compensation....');
  const transaction = [
    {
      credit_card_number: "2222222222", 
      amount: "1000.00",
      destination: "DDDDDDDDDDDD",
      transaction_datetime : "2024-04-26T15:42:00.000Z",
      location: "California", 
      type: TYPE, 
      status: STATUS, 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58753" 
    },
    {
      credit_card_number: "3333333333", 
      amount: "2000.00",
      destination: "EEEEEEEEEEEE",
      transaction_datetime : "2024-04-27T15:43:00.000Z",
      location: "Washington", 
      type: TYPE, 
      status: STATUS, 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58754" 
    },
  ];
  try {
    for (let i = 0; i < transaction.length; i++) {
      await sendTxn(transaction[i], i);
    }
  } catch (error) {
    console.error(`Error sending transaction to transaction processor in manualGenerateCompensationTxn:`, error);
  }

}

// ----------------------------------------

const manualGenerateCompensationWithFailTxn = async () => {
  console.log('Compensation with Failure....');
  const transaction = [
    {
      credit_card_number: "4444444444", 
      amount: "3000.00",
      destination: "FFFFFFFFFFFF",
      transaction_datetime : "2024-04-27T15:49:00.000Z",
      location: "Utah", 
      type: TYPE, 
      status: STATUS, 
      id: "5b7338c-8011-4d22-ae9f-8cb98ef58755" 
    },
  ];
  try {
    for (let i = 0; i < transaction.length; i++) {
       await sendTxn (transaction[i], i);
    }
  } catch (error) {
    console.error(`Error sending transaction to transaction processor in manualGenerateCompensationWithFailTxn:`, error);
  }

}

// ----------------------------------------

const sendTxn = async (transaction, position) => {
  console.log('Send transacion.... - id: ', transaction.id);
  const response = await axios.post('http://localhost:3005/transaction', transaction);
  console.log(`Transaction ${position + 1} successfully sent to transaction processor ${JSON.stringify(transaction)} con resultado ${response.data} in manualGenerateTxn`);
}

// ----------------------------------------

async function main() {
  console.log('Start generator....');
  await automaticGenerateTxn(MAX_TXT_TO_PROCESS);
  await manualGenerateTxn();
  await manualGenerateCompensationTxn();
  await manualGenerateCompensationWithFailTxn();
  console.log('End generator....');
}

main();

