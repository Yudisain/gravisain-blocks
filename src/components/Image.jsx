export const Image = ({ src, alt, className = '', objectFit = 'cover', ...props }) => {
	if (!src) return null;

	const classes = [
		'gravisain-image',
		className,
	].filter(Boolean).join(' ');

	const styles = {
		objectFit,
		width: '100%',
		height: 'auto',
		display: 'block'
	};

	return (
		<img src={src} alt={alt || ''} className={classes} style={styles} {...props} />
	);
};
