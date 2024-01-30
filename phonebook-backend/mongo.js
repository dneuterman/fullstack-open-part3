const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log("Not enough parameters provided")
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log("Please provide a phone number with the name")
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://mongo-dneuterman:${password}@cluster0.c70kg7g.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  mongoose.connect(url)
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(result => {
    console.log(`${name} saved to the database`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  mongoose.connect(url)

  Person.find({}).then(result => {
    console.log("Phonebook:")
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}