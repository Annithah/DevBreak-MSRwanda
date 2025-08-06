import React from 'react';
import "./go-as.css";
    import { Link } from 'react-router-dom';

function GoToAnother(){
    return(

        <>
        <div className="introduction">
            <h1>Medihub System Rwanda</h1>
            <p>Continue In Medihub System  As</p>
      
        {/* <div className="container-for-all">
            <select name="category" id="select">
                <option value="Continue As"></option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
                <option value="pharmacy">Pharmacy</option>
            </select>
        </div> */}
          <div className="continue-as">
             <ul>
            <li> <Link to={"/"} class="links">Admin</Link></li>
            <li><Link to={"/"} class="links">Doctor</Link></li>
            <li><Link to={"/login"} class="links">Patient</Link> </li>
            <li><Link to={"/"} class="links">Pharmacy</Link></li>
        </ul>



          </div>
       
          </div>
        
        </>
    );
};

export default GoToAnother;