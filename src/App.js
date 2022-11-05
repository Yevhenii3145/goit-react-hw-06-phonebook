import React from 'react';
import { nanoid } from 'nanoid';
import Form from './components/Form/Form';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import { Container } from './components/Container/Container.styled';
import { TitlePage } from './components/Title/Title';
import { Heading } from './components/Heading/Heading';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/filter/filter-selectors';

export default function App() {
  const filter = useSelector(getFilter);
  const filterId = nanoid();

  return (
    <Container>
      <TitlePage text={'Phonebook'}></TitlePage>
      <Form />
      <Heading text={'Contacts'}></Heading>
      <Filter filterId={filterId} filter={filter} />
      <ContactList />
    </Container>
  );
}
