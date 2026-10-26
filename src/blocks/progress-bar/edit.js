import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
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

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-progress-bar',
			striped ? 'is-striped' : '',
			animated ? 'is-animated' : '',
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
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<div className="gravisain-progress-header">
					<RichText
						tagName="span"
						className="gravisain-progress-label"
						value={ label }
						onChange={ ( val ) => setAttributes( { label: val } ) }
						placeholder={ __( 'Skill or Metric Label...', 'gravisain-blocks' ) }
					/>
					{ showPercentage && (
						<span className="gravisain-progress-percentage">{ percentage }%</span>
					) }
				</div>
				<div className="gravisain-progress-track">
					<div
						className="gravisain-progress-fill"
						style={ { width: `${ percentage }%` } }
					/>
				</div>
			</div>
		</>
	);
}
