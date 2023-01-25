import React, {useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.includes('@')
		};
	}

	return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		console.log("TEST");
		return {
			value: action.val,
			isValid: action.val.trim().length > 6
		};
	}

	return {value: '', isValid: false};
};

const Login = (props) => {
	const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: undefined});
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: undefined})

	const emailChangeHandler = (event) => {
		dispatchEmail({type: 'USER_INPUT', val: event.target.value});
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({type: 'USER_INPUT', val: event.target.value});
	};

	const ctx = useContext(AuthContext);

	const submitHandler = (event) => {
		event.preventDefault();
		ctx.onLogin(emailState.value, passwordState.value);
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
					<Button type="submit" className={classes.btn} disabled={passwordState.isValid===false || emailState.isValid===false}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
