import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { UseAppContext } from '../../Context/app-context';
import API from '../../Resources/api';
import "./healthReport.css"
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';
import { Backdrop, Sidebar, Topbar } from '../../Components';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const HealthReport = () => {
    const [systolicPressure, setSystolicPressure] = useState([]);
    const [diastolicPressure, setDiastolicPressure] = useState([]);
    const [restingHeartRate, setRestingHeartRate] = useState([]);
    const [error, setError] = useState({status: false, msg :''})
    const {id} = useParams()


    const fetchHealthData = async()=>{
        
            const options = {
                url: `${API}/health/${id}/health-metrics`,
                method : "GET",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json;charset=UTF-8"
                }
            }
            console.log(options) 
            const result = await Axios(options)
            
            
            const {response, healthMetrics} = result.data
            if(response == 'Success'){
                setRestingHeartRate(healthMetrics)
                setSystolicPressure(healthMetrics)
                setDiastolicPressure(healthMetrics)
            }else if(response == 'Fail'){
                setError({status : true, msg : "Failed to fetch health report"})
                return setTimeout(()=>{
                    setError({status : false, msg :''})
            }, 4000)
            }
          
        }
    
    
    useEffect(()=>{
        setTimeout(()=>{
          fetchHealthData()
        },1000)
    },[])
    


  const SystolicPressureChart = ({ data }) => {
    const chartData = {
      labels: data.map(entry => entry.date),
      datasets: [
        {
          label: 'Systolic Pressure',
          data: data.map(entry => entry.systolicPressure),
          borderColor: '#e7e7dd',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#e7e7dd',
        },
      ],
    };
  
    const chartOptions = {
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Dates',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Systolic Pressure',
          },
          suggestedMin: 0,
          suggestedMax: 150,
        },
      },
    };
  
    return <Line data={chartData} options={chartOptions} />;
  };
  

  const DiastolicPressureChart = ({ data }) => {
    const chartData = {
      labels: data.map(entry => entry.date),
      datasets: [
        {
          label: 'Diastolic Pressure',
          data: data.map(entry => entry.diastolicPressure),
          borderColor: '#e7e7dd',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#e7e7dd',
        },
      ],
    };
  
    const chartOptions = {
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Dates',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Diastolic Pressure',
          },
          suggestedMin: 0,
          suggestedMax: 150,
        },
      },
    };
  
    return <Line data={chartData} options={chartOptions} />;
  };
  


  const RestingHeartRateChart = ({ data }) => {
    const chartData = {
      labels: data.map(entry => entry.date),
      datasets: [
        {
          label: 'Resting Heart Rate',
          data: data.map(entry => entry.restingHeartRate),
          borderColor: '#e7e7dd',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#e7e7dd',
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Dates',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Resting Heart Rate',
          },
          suggestedMin: 0,
          suggestedMax: 150,
        },
      },
    };

    return <Line data={chartData} options={chartOptions} />;
  };

  

  return (<>
    <Topbar />
    <Sidebar />
    <Backdrop />
    <div className='health-report' >
      <div className="chart-container" style={{background:"var(--background-overlay)"}}>
        <div className="chart-header">Systolic Pressure Chart</div>
        {systolicPressure && <SystolicPressureChart data={systolicPressure} />}
      </div>
      <div className="chart-container" style={{background:"var(--background-overlay)"}}>
        <div className="chart-header">Diastolic Pressure Chart</div>
        {diastolicPressure && <DiastolicPressureChart data={diastolicPressure} />}
      </div>
      <div className="chart-container" style={{background:"var(--background-overlay)"}}>
        <div className="chart-header">Resting Heart Rate Chart</div>
        {restingHeartRate && <RestingHeartRateChart data={restingHeartRate} />}
      </div>
    </div>
    </>);
};

export default HealthReport;
