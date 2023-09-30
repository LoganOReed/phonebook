import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNewName = (e) => {
    e.preventDefault()

    setPersons(persons.concat({name: newName}))
    console.log(persons)
    
  }
  return (
    <>
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
         name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      <div>
          {persons.map(person => 
            <p key={person.name}>
              {person.name}
            </p>
          )}
      </div>
    </div>
    </>
  )
}

export default App
