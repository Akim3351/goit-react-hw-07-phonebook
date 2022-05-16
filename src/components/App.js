import React from 'react';
import ContactsList from './ContactsList/ContactsList.jsx';
import ContactForm from './ContactForm/ContactForm.jsx';
import Filter from './Filter/Filter.jsx';

function App() {
  return (
    <div className="App">
      <h1> Phonebook </h1>
      <ContactForm />

      <h2> Contacts </h2>
      <Filter />
      <ContactsList />
    </div>
  );
}

export default App;
