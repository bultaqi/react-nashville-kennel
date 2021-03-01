import React from "react"
import "./Animal.css"

export const AnimalCard = ({ animal, customer, location }) => (
    <section className="animal">
        <h3>{animal.name}</h3>
        <p>{animal.breed}</p>
        <p>{customer.name}</p>
        <p>{location.name}</p>
    </section>
)