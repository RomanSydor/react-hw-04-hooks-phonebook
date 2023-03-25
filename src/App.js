import { useState, useEffect } from "react";
import "./App.css";
import Section from "./components/Section";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      console.log("test");

      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

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

    setName(name);
    setNumber(number);
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
