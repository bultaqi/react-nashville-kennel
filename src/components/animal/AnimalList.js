import React, { useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalCard } from "./AnimalCard"

export const AnimalList = () => {
    const { animals, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    useEffect(() => {
        console.log("AnimalList: Initial render before data")
        getLocations()
        .then(getCustomers)
        .then(getAnimals)
    }, [])


        const history = useHistory()

        return (
            <>
                <h2>Animals</h2>
                <button onClick={() => {history.push("/animals/create")}}>
                        Add Animal
                </button>
                    <div className="animals">
                {animals.map(animal => {
                    const owner = customers.find(c => c.id === animal.customerId)
                    const clinic = locations.find(l => l.id === animal.locationId)
                
                 return <AnimalCard key={animal.id}
                    location={clinic}
                    customer={owner}
                    animal={animal} />
                })}
                </div>
             </>
)
}


