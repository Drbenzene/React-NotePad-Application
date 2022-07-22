import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calender.css';


function Calender() {

  const [value, onChange] = useState(new Date());

  const onClickHandler = (e) => {
    alert("clicked")
  }

  return (
    <div>
      <Calendar className="react-calendar" onChange={onChange} value={value} onClickDay={onClickHandler} />
    </div>
  );
}

export default Calender