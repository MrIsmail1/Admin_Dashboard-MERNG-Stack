import { useState } from 'react';

export const useFormP = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [selectedDate, setSelectedDate] = useState(new Date(''));


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleDateChange = (date) => {  
    setSelectedDate(date);
    
  };
  return {
    handleChange,
    values,
    selectedDate
  };
};