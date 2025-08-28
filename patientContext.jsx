import {createContext, useState, useContext} from "react";

export const PatientContext = createContent();
export const PatientProviderv=({children}) =>{
    const [patient, setPatient]= useState({
        id:'',
        name:'',
        email:''
    });

    const[appointments,setAppointments]= useState([])
    return(
        <PatientContext.Provider value={{patient,setPatient,appointments,setAppointments}}>
            {children}
        </PatientContext.Provider>
    )
}