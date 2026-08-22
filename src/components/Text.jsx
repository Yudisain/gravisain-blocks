export const Text = ({ children, className = '', typography, ...props }) => {
	const classes = [
		'gravisain-text',
		className,
	].filter(Boolean).join(' ');

	const styles = {
		...(typography?.fontSize ? { fontSize: typography.fontSize } : {}),
		...(typography?.fontWeight ? { fontWeight: typography.fontWeight } : {}),
		...(typography?.lineHeight ? { lineHeight: typography.lineHeight } : {}),
		...(typography?.color ? { color: typography.color } : {}),
	};

	return (
		<p className={classes} style={styles} {...props}>
			{children}
		</p>
	);
};
