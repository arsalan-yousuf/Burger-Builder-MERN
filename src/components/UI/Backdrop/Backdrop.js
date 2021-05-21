import React from 'react';
import classes from './Backdrop.css';

const Backdrop = (props) => {
    return(
        props.show? <div onClick={props.clicked} className={classes.Backdrop}></div> : null       // onClick not working on div
    );
}

export default Backdrop;