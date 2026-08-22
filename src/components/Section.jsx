import { forwardRef } from 'react';

export const Section = forwardRef(({ children, className = '', style = {}, background, overlay, spacing, ...props }, ref) => {
	const classes = [
		'gravisain-section',
		className,
	].filter(Boolean).join(' ');

	const styles = {
		...(background?.color ? { backgroundColor: background.color } : {}),
		...(background?.image ? { backgroundImage: `url(${background.image})` } : {}),
		...(spacing?.paddingTop ? { paddingTop: spacing.paddingTop } : {}),
		...(spacing?.paddingBottom ? { paddingBottom: spacing.paddingBottom } : {}),
		...(spacing?.marginTop ? { marginTop: spacing.marginTop } : {}),
		...(spacing?.marginBottom ? { marginBottom: spacing.marginBottom } : {}),
		...style,
	};

	return (
		<section ref={ref} className={classes} style={styles} {...props}>
			{overlay?.color && (
				<div 
					className="gravisain-section-overlay" 
					style={{ backgroundColor: overlay.color, opacity: overlay.opacity || 0.5, position: 'absolute', inset: 0 }} 
				/>
			)}
			<div className="gravisain-section-content" style={{ position: 'relative', zIndex: 1 }}>
				{children}
			</div>
		</section>
	);
});

Section.displayName = 'Section';
