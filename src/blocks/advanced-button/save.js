import { useBlockProps, RichText } from '@wordpress/block-editor';
import { ICONS } from '../../controls/icons';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const { 
		text, url, newTab, icon, iconPosition,
		backgroundColor, textColor, hoverBackgroundColor, hoverTextColor,
		borderRadius, padding, borderWidth, borderColor, hoverBorderColor,
		hoverEffect, shadow,
		anchor, customClassName, customCSS
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: `gravisain-advanced-button hover-effect-${hoverEffect} ${shadow ? 'has-shadow' : ''} ${customClassName || ''}`.trim(),
		style: {
			'--btn-bg': backgroundColor || undefined,
			'--btn-color': textColor || undefined,
			'--btn-hover-bg': hoverBackgroundColor || backgroundColor || undefined,
			'--btn-hover-color': hoverTextColor || textColor || undefined,
			'--btn-border-color': borderColor || 'transparent',
			'--btn-hover-border-color': hoverBorderColor || borderColor || 'transparent',
			borderWidth: `${borderWidth}px`,
			borderRadius: `${borderRadius}px`,
			paddingTop: padding?.top || undefined,
			paddingRight: padding?.right || undefined,
			paddingBottom: padding?.bottom || undefined,
			paddingLeft: padding?.left || undefined,
			...parseCustomCSS( customCSS ),
		}
	} );

	return (
		<div { ...blockProps }>
			<a 
				href={ url || '#' } 
				className="gravisain-advanced-button-inner"
				target={ newTab ? '_blank' : undefined }
				rel={ newTab ? 'noopener noreferrer' : undefined }
			>
				{ icon && iconPosition === 'left' && ICONS[ icon ] && (
					<span className="gravisain-btn-icon icon-left" dangerouslySetInnerHTML={ { __html: ICONS[ icon ] } } />
				) }
				
				<RichText.Content
					tagName="span"
					className="gravisain-btn-text"
					value={ text }
				/>

				{ icon && iconPosition === 'right' && ICONS[ icon ] && (
					<span className="gravisain-btn-icon icon-right" dangerouslySetInnerHTML={ { __html: ICONS[ icon ] } } />
				) }
			</a>
		</div>
	);
}
