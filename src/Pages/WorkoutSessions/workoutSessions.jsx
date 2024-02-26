import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { WorkoutData } from '../../Resources/data';
import { DummyWorkoutData } from '../../Resources/data';
import { UseAppContext } from '../../Context/app-context';
import "./workoutSessions.css"
import { Backdrop, Sidebar, Topbar } from '../../Components';

const WorkoutSessions = () => {
    const { category } = useParams();
    const { exercises } = WorkoutData;
    const [currentWorkouts, setCurrentWorkouts] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [timer, setTimer] = useState(0);
    const [preparationTimer, setPreparationTimer] = useState(0);
    const {currentUserParsed, loggedIn} = UseAppContext()
    const {id} = currentUserParsed

    useEffect(() => {
        const mainCurrentWorkouts = exercises.filter(exercise => exercise.category.toLowerCase() === category)
        setCurrentWorkouts([DummyWorkoutData,...mainCurrentWorkouts]);
    }, [category, exercises]);

    useEffect(() => {
        if (currentWorkouts.length > 0) {
            setCurrentExercise(currentWorkouts[currentExerciseIndex]);
            setPreparationTimer(currentWorkouts[currentExerciseIndex].preparationTime);
        } else {
            setCurrentExercise(null);
        }
    }, [currentWorkouts, currentExerciseIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPreparationTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (preparationTimer === 0 && currentWorkouts[currentExerciseIndex]) {
            setTimer(currentWorkouts[currentExerciseIndex].duration);
        }
    }, [preparationTimer, currentExerciseIndex, currentWorkouts]);
    

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (timer === 0) {
            const nextExerciseIndex = currentExerciseIndex + 1;
            if (nextExerciseIndex < currentWorkouts.length) {
                setCurrentExerciseIndex(nextExerciseIndex);
                setPreparationTimer(currentWorkouts[nextExerciseIndex].preparationTime);
                setTimer(currentWorkouts[nextExerciseIndex].duration);
            } else {
                setCurrentExercise(null);
            }
        }
    }, [timer, currentExerciseIndex, currentWorkouts]);

    if(loggedIn == "false" || !loggedIn){
        return window.location.href = `/sign-in`
    }

    return (<>
        <Topbar />
        <Sidebar />
        <Backdrop />
        <div className='workout-session' >
            {currentExercise ? (
                <div className='workout-session-container'>
                    <h3>{currentExercise.name}</h3>
                    <h5>
                    {preparationTimer > 0 ? (
                        <span className='preparation-time'>Get Ready: {preparationTimer} seconds</span>
                    ) : (
                        <span className='duration'> {timer} seconds</span>
                    )}
                    </h5>
                    <iframe
                    className='iframe'
                    src={currentExercise.video}
                    title="Home workout video"
                    frameBorder="0"
                    allow='autoplay; fullscreen; encrypted-media; picture-in-picture'
                    allowfullscreen
                    autoPlay
                    ></iframe>
                    <p>{currentExercise.description}</p>
                </div>
                ) : (  
                <div className='workout-complete'>
                    <h4>Workout Completed</h4>
                    <Link to={`/record-body-metrics/${id}`} ><button className="competed-button">Record Body Metrics</button></Link>
                </div>
            )}
        </div>
    </>);
};

export default WorkoutSessions;
