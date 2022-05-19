import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactsListItem from '../ContactsListItem/ContactsListItem';
import css from './ContactsList.module.css';

const ContactsList = () => {
  const filter = useSelector(state => state.filter);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [removeContact] = useDeleteContactMutation();
  const { data = [], isLoading } = useGetContactsQuery();

  useEffect(() => {
    setFilteredContacts(
      data.filter(contact => contact.name.toLowerCase().includes(filter))
    );
  }, [filter, data]);

  const onDelete = async (id, name) => {
    await removeContact(id).unwrap();
    toast.info(`${name}'s phone was succesfully deleted`, {
      autoClose: 5000,
    });
  };

  if (isLoading) {
    return <ThreeDots color="black" height={80} width={80} />;
  } else {
    return (
      <>
        <ul className={css.contacts__list}>
          {filteredContacts.map(contact => {
            const { id, name, phone } = contact;
            return (
              <ContactsListItem
                id={id}
                name={name}
                phone={phone}
                onDelete={onDelete}
                key={id}
              />
            );
          })}
        </ul>
        <ToastContainer />
      </>
    );
  }
};
export default ContactsList;
