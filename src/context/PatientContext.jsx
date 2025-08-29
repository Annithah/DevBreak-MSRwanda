import {createContext, useState, useContext} from "react";

export const PatientContext = createContext();

export const PatientProvider = ({children}) => {
    const [patient, setPatient] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: ''
    });

    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState([]);

    return (
        <PatientContext.Provider value={{
            patient, setPatient,
            appointments, setAppointments,
            prescriptions, setPrescriptions,
            medicalHistory, setMedicalHistory
        }}>
            {children}
        </PatientContext.Provider>
    );
};

export const usePatient = () => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error('usePatient must be used within PatientProvider');
    }
    return context;
};