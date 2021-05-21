import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElements = null;
    const classesList = [classes.inputElements];
    if(!props.valid && props.touched){
        classesList.push(classes.Invalid);
    }

    switch( props.elementType ) {
        case('input'):
            inputElements=<input 
            className={classesList.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}
            />
            break;
        case('textarea'):
           inputElements=<textarea 
           className={classesList.join(' ')} 
           {...props.elementConfig} 
           value={props.value}
           onChange={props.changed}/>
           break;
        case('select'):
           inputElements=<select 
           className={classes.inputElements}
           onChange={props.changed}>
               {props.elementConfig.options.map( option => (
                   <option key={option.value} value={option.value}>{option.displayValue}</option>
               ))}
           </select>
           break;
        default:
            inputElements=<input 
            className={classesList.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}/>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElements}
        </div>
    )
}

export default Input;