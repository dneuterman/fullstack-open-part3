const express = require('express')
const app = express()

app.use(express.json())

let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Phonebook Application</h1>')
})

app.get('/info', (request, response) => {
  const phonebookSize = phonebook.length
  const today = new Date()
  response.send(`
    <h1>Phonebook Info</h1>
    <p>Phonebook has info for ${phonebookSize} people</p>
    <p>${today}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const name = body.name
  const number = body.number

  if (!name) {
    return response.status(400).json({
      error: 'Name is missing'
    })
  }

  if (!number) {
    return response.status(400).json({
      error: 'Number is missing'
    })
  }

  const person = {
    name: name,
    number: number,
    id: Math.floor(Math.random() * 1000000)
  }

  phonebook = phonebook.concat(person)
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)