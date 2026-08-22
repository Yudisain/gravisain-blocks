export const Button = ({ children, className = '', variant = 'primary', url, ...props }) => {
	const classes = [
		'gravisain-button',
		`gravisain-button--${variant}`,
		className,
	].filter(Boolean).join(' ');

	if (url) {
		return (
			<a href={url} className={classes} {...props}>
				{children}
			</a>
		);
	}

	return (
		<button className={classes} {...props}>
			{children}
		</button>
	);
};
