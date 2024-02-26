import React, { useState, useEffect } from 'react';
import './recordBodyMetrics.css';
import API from '../../Resources/api';
import { UseAppContext } from '../../Context/app-context';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DateTime } from 'luxon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RecordBodyMetrics = () => {
  const { currentUserParsed, loggedIn } = UseAppContext();
  const { id } = currentUserParsed;
  const [error, setError] = useState({ status: false, msg: '' });
  const [formValues, setFormValues] = useState({
    chestCircumference: '',
    waistCircumference: '',
    hipCircumference: '',
    date: DateTime.local().setZone('America/Vancouver'),
  });

  const handleError = (status, message) => {
    setError({ status: status, msg: message });
  };

  const setValues = (name, value) => {
    setFormValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleDateChange = (date) => {
    setValues('date', date);
  };

  const submitBodyMetrics = async (e) => {
    e.preventDefault();
    try {
      const { waistCircumference, hipCircumference, chestCircumference, date } = formValues;
      if (!waistCircumference || !hipCircumference || !chestCircumference) {
        return setError({ status: true, msg: 'Please provide all fields' });
      }

      const options = {
        url: `${API}/metrics/${id}/body-metrics`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          userId: id,
          chestCircumference: chestCircumference,
          waistCircumference: waistCircumference,
          hipCircumference: hipCircumference,
          date: date.toISODate(),  
        },
      };

      const result = await Axios(options);
      const { response } = result.data;

      if (response === 'Success') {
        return (window.location.href = `/report/${id}`);
      } else if (response === 'Fail') {
        const { message } = result.data;
        handleError(true, message);
        setTimeout(() => {
          setError({ status: false, msg: '' });
        }, 4000);
      }
    } catch (error) {
      handleError(true, "Error recording body metrics");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if(loggedIn == "false" || !loggedIn){
    return window.location.href = `/sign-in`
  }

  return (
    <Grid container className='user-health-data'>
      {error.status && (
        <div className='alert' style={{ position: 'absolute' }}>
          <Alert severity='error'>{error.msg}</Alert>
        </div>
      )}
      <Grid item xs={12}>
        <h3 className='user-body-data-title'>Body Metrics</h3>
      </Grid>
      <Grid item sm={12} md={4}></Grid>
      <Grid item sm={12} md={4} className='user-body-data-form'>
        <TextField
          className='user-health-data-input'
          value={formValues.chestCircumference}
          onChange={(e) => setValues('chestCircumference', e.target.value)}
          type='number'
          name='chestCircumference'
          label='Chest Circumference'
          style={{ marginTop: '0.7rem' }}
        />
        <TextField
          className='user-health-data-input'
          value={formValues.waistCircumference}
          onChange={(e) => setValues('waistCircumference', e.target.value)}
          type='number'
          name='waistCircumference'
          label='Waist Circumference'
          style={{ marginTop: '0.7rem' }}
        />
        <TextField
          className='user-health-data-input'
          value={formValues.hipCircumference}
          onChange={(e) => setValues('hipCircumference', e.target.value)}
          type='number'
          name='hipCircumference'
          label='Hip Circumference'
          style={{ marginTop: '0.7rem', marginBottom: '2rem' }}
        />
        <DatePicker
          selected={formValues.date.toJSDate()}
          onChange={(date) => handleDateChange(DateTime.fromJSDate(date).setZone('America/Vancouver'))}
          style={{ width: '100%', backgroundColor: '#fff', marginTop: '0.7rem' }}
        />
        <div className='user-body-data-btns'>
          <Button className='user-body-data-btn' variant='contained' onClick={submitBodyMetrics}>
            Save and continue
          </Button>
        </div>
      </Grid>
      <Grid item sm={12} md={4}></Grid>
    </Grid>
  );
};

export default RecordBodyMetrics;
