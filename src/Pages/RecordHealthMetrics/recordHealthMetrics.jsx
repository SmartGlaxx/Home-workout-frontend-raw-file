import React, { useState, useEffect } from 'react';
import './recordHealthMetrics.css';
import API from '../../Resources/api';
import { Link, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios';
import { UseAppContext } from '../../Context/app-context';
import Grid from '@mui/material/Grid';
import { TextField, Button } from '@mui/material';
import { DateTime } from 'luxon';  

const RecordHealthData = () => {
  const { loading, loggedIn } = UseAppContext();
  const { id } = useParams();
  const [error, setError] = useState({ status: false, msg: '' });
  const [formValues, setFormValues] = useState({
    systolicPressure: '',
    diastolicPressure: '',
    restingHeartRate: '',
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

  const submitHealthData = async (e) => {
    e.preventDefault();
    try {
      const { systolicPressure, diastolicPressure, restingHeartRate, date } = formValues;
      if(!systolicPressure || !diastolicPressure || !restingHeartRate){
        setError({status: true, msg:"Please provide all fields"})
      }
      const options = {
        url: `${API}/health/${id}/health-metrics`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          userId: id,
          systolicPressure: systolicPressure,
          diastolicPressure: diastolicPressure,
          restingHeartRate: restingHeartRate,
          date: date.toISODate(), 
        },
      };

      const result = await Axios(options);
      const { response } = result.data;
      if (response === 'Success') {
        return (window.location.href = '/');
      } else if (response === 'Fail') {
        const { message } = result.data;
        handleError(true, message);
        setTimeout(() => {
          setError({ status: false, msg: '' });
        }, 4000);
      }
    } catch (error) {
      handleError(true, "Error recording health metrics");
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
      <Grid container justifyContent='center'>
        {
            error.status && <div className='alert' style={{position:"absolute"}}>
            <Alert severity="error">{error.msg}</Alert>
          </div>
          }

          <Grid item xs={12} >
            <h3 className='user-health-data-title'>Health Data</h3>
          </Grid>
          <Grid item sm={12} md={4}></Grid>
          <Grid item sm={12} md={4} className='user-health-data-form' >
            <TextField
              className='user-health-data-input'
              value={formValues.systolicPressure}
              onChange={(e) => setValues('systolicPressure', e.target.value)}
              type='number'
              name='systolicPressure'
              label='Systolic Pressure'
              style={{ marginTop: '0.7rem' }}
              fullWidth
            />
            <TextField
              className='user-health-data-input'
              value={formValues.diastolicPressure}
              onChange={(e) => setValues('diastolicPressure', e.target.value)}
              type='number'
              name='diastolicPressure'
              label='Diastolic Pressure'
              style={{ marginTop: '0.7rem' }}
              fullWidth
            />
            <TextField
              className='user-health-data-input'
              value={formValues.restingHeartRate}
              onChange={(e) => setValues('restingHeartRate', e.target.value)}
              type='number'
              name='restingHeartRate'
              label='Resting Heart Rate'
              style={{ marginTop: '0.7rem', marginBottom:"2rem" }}
              fullWidth
            />
            <DatePicker
              selected={formValues.date.toJSDate()} 
              onChange={(date) => handleDateChange(DateTime.fromJSDate(date).setZone('America/Vancouver'))}
              style={{ width: '100%', backgroundColor: '#fff', marginTop: '0.7rem' }}
            />
            <div className='user-health-data-btns'>
              <Link to={'/'} className='link' >
                <Button className='user-health-data-btn' variant='outlined' style={{color:"var(--color3)"}}>
                  Skip health data
                </Button>
              </Link>
              <Button className='user-health-data-btn' variant='contained' onClick={submitHealthData}>
                Save and continue
              </Button>
            </div>
          </Grid>
          <Grid item sm={12} md={4}></Grid>
        </Grid>
      </Grid>
  );
};

export default RecordHealthData;
