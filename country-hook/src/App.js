import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState()
  const [found, setFound] = useState(false)
  const [capital, setCapital] = useState('')
  const [population, setPopulation] = useState('')
  const [flag, setFlag] = useState('')

  const url = `https://restcountries.eu/rest/v2/name/`+ name + `?fullText=true`
  const hook = () => {
    axios
      .get(url)
      .then(data => {
        if (data.status === 404) {
          setCountry({ error: 'No country found' })
          console.log(data)
        } else {
          setCountry(data.data[0])
          setFound(true)
          setCapital(data.data[0].capital)
          setPopulation(data.data[0].population)
          setFlag(data.data[0].flag)
        }
      })
  }
  useEffect(hook, [name])
  
  console.log(country)
  return {
    name,
    capital,
    population,
    found,
    flag,
    country
  }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    console.log('if !coutry.found', country.found, country)
    return (
      <div>
        not found...
      </div>
    )
  }
  console.log('country in comp ', country)
  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log('country in App ', country)

  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App