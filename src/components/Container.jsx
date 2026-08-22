import { forwardRef } from 'react';

export const Container = forwardRef(({ children, className = '', maxWidth, padding, alignment, ...props }, ref) => {
	const classes = [
		'gravisain-container',
		maxWidth ? `max-w-${maxWidth}` : '',
		padding ? `p-${padding}` : '',
		alignment ? `align-${alignment}` : '',
		className,
	].filter(Boolean).join(' ');

	return (
		<div ref={ref} className={classes} {...props}>
			{children}
		</div>
	);
});

Container.displayName = 'Container';
