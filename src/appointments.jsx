import React from 'react';
import "./appointment.css";

function MakeAppointment(){

    return(
        <>
        <form action="">
            <div className="container">
                <h1 class="book-app">Appointment Booking</h1>
                <div className="inputs">
                    <input type="text" name="fullname" placeholder='Enter Full Names' />
                    <input type="number" name="number" placeholder='Enter Phone Number' required/>
                    <input type="date" name='date' placeholder='Date For Appointment' />
                    <input type="time" name='time' placeholder='Enter Time' />
                   <select name="department" id="depar">
    <option value="">Choose the department</option>
    <option value="general_medicine">General Medicine</option>
    <option value="pediatrics">Pediatrics</option>
    <option value="gynecology">Gynecology</option>
    <option value="cardiology">Cardiology</option>
    <option value="dermatology">Dermatology</option>
    <option value="neurology">Neurology</option>
    <option value="orthopedics">Orthopedics</option>
    <option value="ent">ENT (Ear, Nose, Throat)</option>
    <option value="ophthalmology">Ophthalmology</option>
    <option value="radiology">Radiology</option>
    <option value="psychiatry">Psychiatry</option>
    <option value="dentistry">Dentistry</option>
    <option value="urology">Urology</option>
    <option value="oncology">Oncology</option>
    <option value="surgery">Surgery</option>
    <option value="emergency">Emergency</option>
    <option value="physiotherapy">Physiotherapy</option>
    <option value="nutrition">Nutrition & Dietetics</option>
    <option value="laboratory">Laboratory</option>
    <option value="anesthesiology">Anesthesiology</option>
</select>
        <textarea id="message" rows="5" placeholder="Reason For the Visit?" required></textarea>

        <button type='submit' className='submit-btn'> Book Appointment</button>
        <button type='submit' className='submit-btn'> View Appointments made</button>

                </div>

            </div>
        </form>


        </>
    );
};
export default MakeAppointment;