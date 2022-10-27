import {useState,useEffect} from 'react'

const localCache = {}

export default function useBreedList(animal){
    const [breedList, setBreedList] = useState([])
    const [status, setStatus] = useState('unloaded')

    useEffect(() => {
        if(!animal){
            setBreedList([])
        } else if(localCache[animal]){
            setBreedList(localCache[animal])
        }else{
            requestBreedList()
        }

        async function requestBreedList(){
            setBreedList([])
            setStatus('loading')
            const response = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`)
            const data = await response.json()

            localCache[animal] = data.breed || []

            setBreedList(localCache[animal])
            setStatus('loaded')
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[animal])
    return [breedList, status]

}
