export const Image = ({ src, alt, className = '', objectFit = 'cover', focalPoint, style = {}, ...props }) => {
	if (!src) return null;

	const classes = [
		'gravisain-image',
		className,
	].filter(Boolean).join(' ');

	const styles = {
		objectFit,
		objectPosition: focalPoint ? `${Math.round(focalPoint.x * 100)}% ${Math.round(focalPoint.y * 100)}%` : undefined,
		width: '100%',
		height: 'auto',
		display: 'block',
		...style
	};

	return (
		<img src={src} alt={alt || ''} className={classes} style={styles} {...props} />
	);
};
