import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import ButtonInspector from './components/ButtonInspector';
import { ICONS } from '../../controls/icons';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { 
		text, url, newTab, icon, iconPosition,
		backgroundColor, textColor, hoverBackgroundColor, hoverTextColor,
		borderRadius, padding, borderWidth, borderColor, hoverBorderColor,
		hoverEffect, shadow,
		anchor, customClassName, customCSS
	} = attributes;

	const [ isLinkOpen, setIsLinkOpen ] = useState( false );

	const blockProps = useBlockProps( {
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
		<>
			<ButtonInspector attributes={ attributes } setAttributes={ setAttributes } />

			<div { ...blockProps }>
				<div 
					className="gravisain-advanced-button-inner"
					onClick={ () => setIsLinkOpen( true ) }
				>
					{ icon && iconPosition === 'left' && ICONS[ icon ] && (
						<span className="gravisain-btn-icon icon-left" dangerouslySetInnerHTML={ { __html: ICONS[ icon ] } } />
					) }
					
					<RichText
						tagName="span"
						className="gravisain-btn-text"
						value={ text }
						onChange={ ( val ) => setAttributes( { text: val } ) }
						placeholder={ __( 'Add text...', 'gravisain' ) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>

					{ icon && iconPosition === 'right' && ICONS[ icon ] && (
						<span className="gravisain-btn-icon icon-right" dangerouslySetInnerHTML={ { __html: ICONS[ icon ] } } />
					) }
				</div>

				{ isLinkOpen && (
					<Popover
						position="bottom center"
						onClose={ () => setIsLinkOpen( false ) }
						focusOnMount={ false }
					>
						<LinkControl
							value={ { url, opensInNewTab: newTab } }
							onChange={ ( link ) => setAttributes( { url: link.url, newTab: link.opensInNewTab } ) }
						/>
					</Popover>
				) }
			</div>
		</>
	);
}
