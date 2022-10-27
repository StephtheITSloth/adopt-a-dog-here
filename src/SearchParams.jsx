import {useState, useEffect} from 'react'
import Results from './Results'
import useBreedList from './useBreedList'

const ANIMALS = ["bird","cat","dog","rabbit","reptile"]

const SearchParams = () => {
    const [location,setLocation] = useState('')
    const [animal, setAnimal] = useState("")
    const [breed, setBreed] = useState("")
    const [pets, setPets] = useState([])
    const [breeds] = useBreedList(animal)

    useEffect(()=>{
        requestPets()
    },[])     // eslint-disable-line react-hooks/exhaustive-deps


    async function requestPets(){
        const response = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        )
        const data = await response.json()
        setPets(data.pets)
    }


    return(
        <div className='search-params'>
            <form onSubmit={e => {
                e.preventDefault()
                requestPets()
            }}>
                <label htmlFor='location'>
                    <input onChange={e=> setLocation(e.target.value)} value={location} placeholder='location' 
                    type='text' id='search-params'/>
                </label>
                <label htmlFor='animal'>
                    Animal
                    <select
                    id='animal'
                    value={animal}
                    onChange={e=> setAnimal(e.target.value)}
                    >
                        <option />
                        {ANIMALS.map(animal => <option key={animal}>{animal}</option>)}
                    </select>
                </label>
                <label htmlFor='breed'>
                Breed
                    <select 
                    id='breed'
                    value={breed}
                    onChange={e=> setBreed(e.target.value)}
                    disabled={breed.length === 0}
                    >
                        <option />
                        {breeds.map(breed => <option key={breed}>{breed}</option>)}
                    </select>
                </label>
                <button type='submit'>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchParams;