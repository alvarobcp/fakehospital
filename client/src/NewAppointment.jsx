import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';
import AppointmentsContainer from './AppointmentsContainer';

function NewAppointment({setAppointments, patient_id}) {

    const [newAppointments, SetNewAppointments] = useState([]);

     const addAppointment = async (id, speciality) => {
      console.log("Added appointment with id: " + id)
      try{
            const res = await fetch(`https://fakehospital.onrender.com/api/hospital/addappointment/${id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    appointment_id: id //rev
                }),
            });
           
            const result = await res.json();

            if (res.ok) {
                console.log('Done!');
                await getAppointments(speciality);

                const resPatient = await fetch(`https://fakehospital.onrender.com/api/hospital/appointments/${1}`);
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
    
      <div className='appointments-container'>
        <div className="title"><span class="material-symbols-outlined">emergency</span><h3>New appointment:</h3></div>
        <div className='app-container'>
           <button onClick={() => getAppointments("Cardiologist")}>Cardiologist</button>
           <button onClick={() => getAppointments("Neurologist")}>Neurologist</button>
           <button onClick={() => getAppointments("Pediatrician")}>Pediatrician</button>  
        </div>
        <div className='app-container'>
              {newAppointments.length > 0 ? 
              newAppointments.map((appn, index) => (<Appointment key={index} id={appn.appointment_id} doctor_name={appn.doctor_name} doctor_surname={appn.doctor_surname} speciality={appn.speciality} date={appn.date} time ={appn.time} 
              button={<button onClick={()=> addAppointment(appn.appointment_id, appn.speciality)}>Accept</button>}></Appointment>)) : <p>No appointments</p>}
        </div>
      </div>

  );
}

export default NewAppointment;