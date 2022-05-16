import React, { useState, useEffect } from 'react';
import ContactsListItem from '../ContactsListItem/ContactsListItem';
import css from './ContactsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from '../../redux/store';

const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, contacts]);

  const onDelete = id => {
    dispatch(removeContact(id));
  };

  return (
    <ul className={css.contacts__list}>
      {filteredContacts.map(contact => {
        const { id, name, number } = contact;
        return (
          <ContactsListItem
            id={id}
            name={name}
            number={number}
            onDelete={onDelete}
            key={id}
          />
        );
      })}
    </ul>
  );
};

export default ContactsList;
