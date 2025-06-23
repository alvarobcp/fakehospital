import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';
import AppointmentsContainer from './AppointmentsContainer';

function NewAppointment({setAppointments, patient_id, isStart, setStart}) {

    const [newAppointments, SetNewAppointments] = useState([]);

     const addAppointment = async (id, speciality) => {
      console.log("Added appointment with id: " + id)
      try{
            const res = await fetch(`https://fakehospital.onrender.com/api/hospital/addappointment/${id}/${patient_id}`, {
                method: 'POST',
            });
           
            const result = await res.json();

            if (res.ok) {
                console.log('Done!');
                await getAppointments(speciality);
                const resPatient = await fetch(`https://fakehospital.onrender.com/api/hospital/appointments/${patient_id}`); 
                const dataPatient = await resPatient.json();
                setAppointments(dataPatient);


            } else {
                console.log(`Error: ${result.error}`);
            }
            } catch (err) {
            console.log('Error');
            }
  }



    const getAppointments = async (speciality) => {
        if(isStart) {setStart(false);}
        try{
            const res = await fetch(`https://fakehospital.onrender.com/api/hospital/appointment?speciality=${speciality}`);
            const data = await res.json();
            if(res.ok){
                SetNewAppointments(data);

            } else{
                console.log(data.error || "Error");
            }
            
        }
        catch (err){
            console.log("Error")
        }
        
    }

  return (
    
      <div className='appointments-container new-app-container'>
        <div className="title app-title"><span class="material-symbols-outlined">search</span><h3>FIND A <b>DOCTOR</b>:</h3></div>
        <div className='app-container speciality-buttons'>
           <button className='button-style speciality-bttn' onClick={() => getAppointments("Cardiologist")}><span class="material-symbols-outlined">cardiology</span>Cardiologist</button>
           <button className='button-style speciality-bttn' onClick={() => getAppointments("Neurologist")}><span class="material-symbols-outlined">neurology</span>Neurologist</button>
           <button className='button-style speciality-bttn' onClick={() => getAppointments("Pediatrician")}><span class="material-symbols-outlined">pediatrics</span>Pediatrician</button>
           <button className='button-style speciality-bttn' onClick={() => getAppointments("Psychiatrist")}><span class="material-symbols-outlined">psychiatry</span>Psychiatrist</button>
           <button className='button-style speciality-bttn' onClick={() => getAppointments("Orthopedics")}><span class="material-symbols-outlined">orthopedics</span>Orthopedics</button>


        </div>
        {isStart ? <div></div> :
        <div className='app-container new-app'>
              {newAppointments.length > 0 ? 
              newAppointments.map((appn, index) => (<Appointment className='component-new-app' key={index} id={appn.appointment_id} doctor_name={appn.doctor_name} doctor_surname={appn.doctor_surname} speciality={appn.speciality} date={appn.date} time ={appn.time} 
              button={<button className='button-style' onClick={()=> addAppointment(appn.appointment_id, appn.speciality)}>Accept</button>}></Appointment>)) : <p className='welcome-text'>We don't have free appointments at the moment — please contact with us.</p>}
        </div>}
      </div>

  );
}

export default NewAppointment;