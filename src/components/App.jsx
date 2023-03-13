import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { AppStyled } from './App.styled';

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    const parsedContacts = JSON.parse(savedContacts);
    return parsedContacts;
  }
  return [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onHandleSubmit = (data, { resetForm }) => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts!`);
      return;
    }

    setContacts(prevState => [...prevState, contact]);
    resetForm();
  };
  const onDeleteContacts = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };
  const onHandleFilter = evt => setFilter(evt.target.value);

  const getVisibleContacts = () => {
    // const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <AppStyled>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onHandleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onHandleFilter} />
      {contacts.length > 0 && (
        <ContactList
          contacts={getVisibleContacts()}
          onDelete={onDeleteContacts}
        />
      )}
    </AppStyled>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = localStorage.getItem('contacts');
//     if (savedContacts !== null) {
//       const parsedContacts = JSON.parse(savedContacts);
//       this.setState({ contacts: parsedContacts });
//       return;
//     }
//     this.setState({
//       contacts: [
//         { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//         { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//         { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//         { id: 'id-4', name: 'Annia Copeland', number: '227-91-26' },
//       ],
//     });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   onHandleSubmit = (data, { resetForm }) => {
//     const contact = {
//       id: nanoid(),
//       name: data.name,
//       number: data.number,
//     };
//     if (this.state.contacts.find(contact => contact.name === data.name)) {
//       alert(`${data.name} is already in contacts!`);
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, contact],
//     }));
//     resetForm();
//   };
//   onDeleteContacts = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };
//   onHandleFilter = evt => {
//     this.setState({ filter: evt.target.value });
//   };
//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase().trim();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { filter, contacts } = this.state;
//     const { onHandleSubmit, onHandleFilter } = this;
//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <AppStyled>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={onHandleSubmit} />
//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={onHandleFilter} />
//         {contacts.length > 0 && (
//           <ContactList
//             contacts={visibleContacts}
//             onDelete={this.onDeleteContacts}
//           />
//         )}
//       </AppStyled>
//     );
//   }
// }
