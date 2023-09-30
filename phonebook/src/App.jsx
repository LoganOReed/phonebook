import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNewName = (e) => {
    e.preventDefault()

    if(persons.some(p => p.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
  }
  return (
    <>
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
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
      <h2>Numbers</h2>
      <div>
          {persons.map(person => 
            <p key={person.name}>
              {person.name} :: {person.number}
            </p>
          )}
      </div>
    </div>
    </>
  )
}

export default App
