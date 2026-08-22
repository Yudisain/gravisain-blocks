import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import CardInspector from './components/CardInspector';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		title,
		description,
		icon,
		iconSymbol,
		iconPosition,
		textAlign,
		iconSize,
		iconBoxSize,
		iconRadius,
		iconColor,
		iconBackgroundColor,
		titleFontSize,
		titleColor,
		descriptionFontSize,
		descriptionColor,
		cardBackgroundColor,
		cardBorderColor,
		cardBorderWidth,
		cardBorderRadius,
		cardPaddingTop,
		cardPaddingBottom,
		cardPaddingLeft,
		cardPaddingRight,
		hoverEffect,
	} = attributes;

	const symbols = {
		star: '★',
		lightning: '⚡',
		shield: '🛡️',
		check: '✓',
		award: '🏆',
		heart: '♥',
	};

	const blockProps = useBlockProps( {
		className: [
			'gravisain-feature-card',
			`icon-pos-${ iconPosition || 'top' }`,
			`align-${ textAlign || 'center' }`,
			hoverEffect && hoverEffect !== 'none' ? `hover-${ hoverEffect }` : '',
		]
			.filter( Boolean )
			.join( ' ' ),
		style: {
			'--card-bg': cardBackgroundColor || '#ffffff',
			'--card-border': cardBorderColor || '#f3f4f6',
			'--card-border-width': `${ cardBorderWidth ?? 1 }px`,
			'--card-radius': `${ cardBorderRadius ?? 12 }px`,
			'--card-pt': `${ cardPaddingTop ?? 32 }px`,
			'--card-pb': `${ cardPaddingBottom ?? 32 }px`,
			'--card-pl': `${ cardPaddingLeft ?? 28 }px`,
			'--card-pr': `${ cardPaddingRight ?? 28 }px`,
			'--icon-color': iconColor || '#4f46e5',
			'--icon-bg': iconBackgroundColor || 'rgba(79, 70, 229, 0.1)',
			'--icon-size': `${ iconSize ?? 32 }px`,
			'--icon-box-size': `${ iconBoxSize ?? 64 }px`,
			'--icon-radius': `${ iconRadius ?? 12 }px`,
			'--title-size': `${ titleFontSize ?? 20 }px`,
			'--title-color': titleColor || '#111827',
			'--desc-size': `${ descriptionFontSize ?? 15 }px`,
			'--desc-color': descriptionColor || '#4b5563',
			'--text-align': textAlign || 'center',
		},
	} );

	return (
		<>
			<CardInspector { ...props } />
			<div { ...blockProps }>
				<div className="gravisain-feature-card__icon">
					{ icon ? (
						<span className={ `dashicons dashicons-${ icon }` } />
					) : (
						<span>{ symbols[ iconSymbol ] || '★' }</span>
					) }
				</div>
				<div className="gravisain-feature-card__content">
					<RichText
						tagName="h3"
						className="gravisain-feature-card__title"
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						placeholder={ __( 'Feature Title', 'gravisain' ) }
					/>
					<RichText
						tagName="p"
						className="gravisain-feature-card__description"
						value={ description }
						onChange={ ( value ) => setAttributes( { description: value } ) }
						placeholder={ __( 'Feature description...', 'gravisain' ) }
					/>
				</div>
			</div>
		</>
	);
}
