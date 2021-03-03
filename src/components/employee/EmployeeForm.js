import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from './EmployeeProvider'
import { useHistory } from 'react-router-dom';

export const EmployeeForm = () => {
    const { addEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    const [employee, setEmployee] = useState({
      name: "",
      locationId: 0,
    });

    const history = useHistory();

    useEffect(() => {
      getLocations()
    }, [])

    const handleControlledInputChange = (event) => {
      
      const newEmployee = { ...employee }
    
      newEmployee[event.target.id] = event.target.value
      setEmployee(newEmployee)
    }

    const handleClickSaveEmployee = (event) => {
    event.preventDefault()
    const newEmployee = {... employee}

    const intLocationId = parseInt(employee.locationId)

    newEmployee.locationId = intLocationId

      if (intLocationId === 0) {
        window.alert("Please select a location")
      } else {
        addEmployee(newEmployee)
        .then(() => history.push("/employees"))
      }
    }
   
    return (
      <form className="employeeForm">
          <h2 className="employeeForm__title">New Employee</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Employee name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>
                  <select onChange={handleControlledInputChange} defaultValue={employee.locationId} name="locationId" id="locationId" className="form-control" >
                      <option value="0">Select a location</option>
                      {locations.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <button className="btn btn-primary" onClick={handleClickSaveEmployee}>New Employee</button>
      </form>
    )
}