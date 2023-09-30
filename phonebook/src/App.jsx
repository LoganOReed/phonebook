import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

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
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])


  const addNewContact = (e) => {
    e.preventDefault()

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      axios
        .post('http://localhost:3001/persons', { name: newName, number: newNumber })
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
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
        <ContactList persons={persons} filter={filter} />
      </div>
    </>
  )
}

export default App
