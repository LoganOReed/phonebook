import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import personsService from './services/persons'

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

function ContactList({ persons, filter, removeContact }) {
  return (
    <div>
      {
        persons.filter(obj => Object.values(obj).some(val => val.toString().toLowerCase().includes(filter.toLowerCase())))
          .map(person =>
          <div key={person.name}>
            <p>
              {person.name} :: {person.number}
            </p>
            <button value={person.id} onClick={removeContact}>delete</button>
            </div>
          )}
    </div>
  )
}

function App() {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addNewContact = (e) => {
    e.preventDefault()

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      personsService
        .create({ name: newName, number: newNumber })
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removeContact = (e) => {
    if(window.confirm('Do you want to delete this contact?')){
      personsService
        .remove(e.target.value)
        .then( _ => {
          setPersons(persons.filter(item => item.id.toString() !== e.target.value))
        })
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
        <ContactList persons={persons} filter={filter} removeContact={removeContact} />
      </div>
    </>
  )
}

export default App
