import React from 'react';

import classes from './Navigation.module.css';
import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
	return (
		<AuthContext.Consumer>
			{(ctx) => {
				<nav className={classes.nav}>
					<ul>
						{ctx.isLoggedIn && (
							<li>
								<a href="/">Users</a>
							</li>
						)}
						{props.isLoggedIn && (
							<li>
								<a href="/">Admin</a>
							</li>
						)}
						{props.isLoggedIn && (
							<li>
								<button onClick={props.onLogout}>Logout</button>
							</li>
						)}
					</ul>
				</nav>
			}}
		</AuthContext.Consumer>
	);
};

export default Navigation;
