import React, { useEffect, useState } from 'react';
import Appointment from './Appointment';
import DoctorAppointment from './DoctorAppointment';

function AddAppointment({appointments, setAppointments, doctor_id}) {

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

  const addAppointment = async (date, time) => {
      console.log(`Added appointment on ${date} and ${time}`);
      try{
            const res = await fetch(`https://fakehospital.onrender.com/api/doctor/newappointment/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    doctor_id: 3, //REV
                    date: date,
                    time: time  
                }),
            });
           
            const result = await res.json();

            if (res.ok) {
                console.log('Done!');
                const resDoctor = await fetch(`https://fakehospital.onrender.com/api/doctor/appointments/${doctor_id}`);
                const dataDoctor = await resDoctor.json();
                setAppointments(dataDoctor);


            } else {
                console.log(`Error: ${result.error}`);
            }
          } catch (err) {
            console.log('Error' + err);
            }
  }

   const submitAppointment = (e) => {
    e.preventDefault();
    if (!date || !time) {
      alert("Please, some data is missing");
      return;
    }

    const updateDate = date;
    const updateTime = `${time}:00`;

    addAppointment(updateDate, updateTime);



    setDate("");
    setTime("");




}


  return (
    
      <div className='appointments-container new-app-container' style={{padding: 0}}>
        <div className="title add-app-text"><span className="material-symbols-outlined">calendar_add_on</span><p>Add a free appointment:</p></div>
        <div className='add-container'>
           <form onSubmit={submitAppointment} className="add-form">
                <label>
                    Date:
                    <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    />
                </label>

                <label>
                    Time:
                    <select value={time} onChange={(e) => setTime(e.target.value)}>
                        <option value="">Select time</option>
                        <option value="09:00">9:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                    </select>
                </label>

                <button className='button-style' style={{padding: '2px 14px 2px 7px'}} type="submit"><span className="material-symbols-outlined">add</span>Add</button>
            </form>
           
        </div>
      </div>

  );
}

export default AddAppointment;