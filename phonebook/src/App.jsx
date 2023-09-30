import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Filter({ filter, setFilter }) {
  return (
    <div>
      filter: <input name="filter" value={filter} onChange={e => setFilter(e.target.value)} />
    </div>
  )
}

function ContactForm({ newName, setNewName, newNumber, setNewNumber, addNewContact }) {

  return (
    <form onSubmit={addNewContact}>
      <div>
        name: <input name="name" value={newName} onChange={e => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input name="number" value={newNumber} onChange={e => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

function ContactList({ persons, filter }) {
  return (
    <div>
      {
        persons.filter(obj => Object.values(obj).some(val => val.toString().toLowerCase().includes(filter.toLowerCase())))
          .map(person =>
            <p key={person.name}>
              {person.name} :: {person.number}
            </p>
          )}
    </div>
  )
}

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addNewContact = (e) => {
    e.preventDefault()

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
  }
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter filter={filter} setFilter={setFilter} />
        <ContactForm
          newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addNewContact={addNewContact} />
        <h2>Numbers</h2>
        <ContactList persons={persons} filter={filter} />
      </div>
    </>
  )
}

export default App
