import React from 'react'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ContactsList } from './ContactList.styled'
import ContactItem from '../ContactItem/ContactItem'
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/filter/filter-selectors';
import { getContacts } from 'redux/contacts/contacts-selectors';

export default function ContactList({ removeContact }) {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const getFilteredContacts = () => {
    if (filter.length === 0) {
      return contacts;
    }
    const normalisedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();
      const result = normalizedName.includes(normalisedFilter);
      return result;
    });
    return filteredContacts;
  };

  const items = getFilteredContacts();

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(items));
  }, [items]);

  return (
    <ContactsList>
      {items.map(item => (<ContactItem
        key={item.id}
        id={item.id}
        name={item.name}
        number={item.number}
        removeContact={removeContact}
        text={"Delete"}
      />))}
    </ContactsList>
  )
}

ContactList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
}