export const Heading = ({ children, level = 2, className = '', typography, ...props }) => {
	const Tag = `h${level}`;
	const classes = [
		'gravisain-heading',
		className,
	].filter(Boolean).join(' ');

	const styles = {
		...(typography?.fontSize ? { fontSize: typography.fontSize } : {}),
		...(typography?.fontWeight ? { fontWeight: typography.fontWeight } : {}),
		...(typography?.lineHeight ? { lineHeight: typography.lineHeight } : {}),
		...(typography?.color ? { color: typography.color } : {}),
	};

	return (
		<Tag className={classes} style={styles} {...props}>
			{children}
		</Tag>
	);
};
