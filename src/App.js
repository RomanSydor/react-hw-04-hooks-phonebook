import { useState } from "react";
import "./App.css";
import Section from "./components/Section";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const addContact = (id, name, number) => {
    if (isContactExists(name)) {
      alert("Exists");
      return;
    }

    const contact = {
      id: id,
      name: name,
      number: number,
    };

    setContacts((prevContacts) => [contact, ...prevContacts]);
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const isContactExists = (name) => {
    return contacts.filter((contact) => contact.name === name).length > 0;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className="App">
      <Section title={"Phonebook"}>
        <AddContact onAddContact={addContact} />
      </Section>
      <Section title={"Contacts"}>
        {contacts.length !== 0 && (
          <>
            <Filter
              className="filterContainer"
              value={filter}
              onChange={changeFilter}
            />
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={deleteContact}
            />
          </>
        )}
      </Section>
    </div>
  );
};

export default App;
