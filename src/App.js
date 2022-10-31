import React from 'react';
import { nanoid } from 'nanoid';
import Form from './components/Form/Form';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import { Container } from './components/Container/Container.styled';
import { TitlePage } from './components/Title/Title';
import { Heading } from './components/Heading/Heading';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';
import { addContact, removeContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';

export default function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  // const [contacts, setContacts] = useState(() => {
  //   const value = JSON.parse(localStorage.getItem('contacts'));
  //   return value ?? [];
  // });
  // const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addOneContact = data => {
    if (isDublicate(data)) {
      return alert(`${data.name} is already in contacts`);
    }
    const action = addContact(data);
    dispatch(action);
  };

  const handleChange = event => {
    const { value } = event.target;
    dispatch(setFilter(value));
    // setFilter(value);
  };

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

  const isDublicate = ({ name }) => {
    const result = contacts.find(contact => contact.name === name);
    return result;
  };

  const removeOneContact = id => {
    const action = removeContact(id);
    dispatch(action);
  };

  const filterId = nanoid();
  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <TitlePage text={'Phonebook'}></TitlePage>
      <Form addContact={addOneContact} />

      <Heading text={'Contacts'}></Heading>
      <Filter filterId={filterId} filter={filter} handleChange={handleChange} />
      <ContactList items={filteredContacts} removeContact={removeOneContact} />
    </Container>
  );
}
