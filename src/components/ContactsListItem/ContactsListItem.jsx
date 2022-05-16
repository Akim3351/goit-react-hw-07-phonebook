import React from 'react';
import css from '../ContactsListItem/ContactsListItem.module.css';
import propTypes from 'prop-types';

const ContactsListItem = ({ id, name, number, onDelete }) => {
  return (
    <li id={id} className={css.contacts__item}>
      <p>
        {name}: {number}
      </p>
      <button onClick={() => onDelete(id)}>delete</button>
    </li>
  );
};

ContactsListItem.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
  onDelete: propTypes.func.isRequired,
};

export default ContactsListItem;
