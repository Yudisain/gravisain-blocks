import { useBlockProps, RichText } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		label,
		percentage,
		showPercentage,
		height,
		barColor,
		trackColor,
		textColor,
		borderRadius,
		striped,
		animated,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-progress-bar',
			striped ? 'is-striped' : '',
			animated && striped ? 'is-animated' : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-pb-height': `${ height }px`,
			'--gravisain-pb-bar-color': barColor || '#007cba',
			'--gravisain-pb-track-color': trackColor || '#e2e8f0',
			'--gravisain-pb-text-color': textColor || '#333333',
			'--gravisain-pb-radius': `${ borderRadius }px`,
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-progress-header">
				{ ! RichText.isEmpty( label ) && (
					<RichText.Content tagName="span" className="gravisain-progress-label" value={ label } />
				) }
				{ showPercentage && (
					<span className="gravisain-progress-percentage">{ percentage }%</span>
				) }
			</div>
			<div className="gravisain-progress-track" role="progressbar" aria-valuenow={ percentage } aria-valuemin="0" aria-valuemax="100">
				<div
					className="gravisain-progress-fill"
					style={ { width: `${ percentage }%` } }
				/>
			</div>
		</div>
	);
}
