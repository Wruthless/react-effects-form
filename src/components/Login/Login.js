import React, {useState, useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.includes('@')
		};
	}

	if (action.type === 'INPUT_BLUR') {
		return {value: state.value, isValid: state.value.includes('@')}
	}

	return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.trim().length > 6
		};
	}

	if (action.type === 'INPUT_BLUR') {
		return {value: state.value, isValid: state.value.trim().length > 6}
	}

	return {value: '', isValid: false};
};

const formReducer = (state, action) => {
	if (action.type === 'USER_BLUR') {
	}
};

const Login = (props) => {
	const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: undefined});
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: undefined})
	const [formState, dispatchForm] = useReducer(formReducer, {value:'', isValid: undefined})


	const emailChangeHandler = (event) => {
		dispatchEmail({type: 'USER_INPUT', val: event.target.value});
		dispatchForm({type: 'USER_INPUT', val: emailState.val})
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({type: 'USER_INPUT', val: event.target.value});
		dispatchForm({type: 'USER_INPUT', val: passwordState.value});

	};

	const validateFormHandler = (event) => {
		dispatchForm({type: 'USER_BLUR', emailVal: emailState.value, passVal: passwordState.value});
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(emailState.value, passwordState.value);
	};

	console.log(passwordState)
	console.log(emailState)
	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={emailChangeHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={passwordChangeHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={passwordState.isValid===false}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
