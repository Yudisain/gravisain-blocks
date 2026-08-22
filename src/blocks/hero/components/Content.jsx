import { __ } from '@wordpress/i18n';
import { RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { Heading } from '../../../components/Heading.jsx';
import { Text } from '../../../components/Text.jsx';
import { Button } from '../../../components/Button.jsx';

export default function Content({ attributes, setAttributes }) {
	const { 
		eyebrow, 
		title, 
		description, 
		primaryButton, 
		secondaryButton, 
		layout
	} = attributes;

	const [ activeLink, setActiveLink ] = useState( null );

	return (
		<div className="hero-content">
			<RichText
				tagName="span"
				className="hero-eyebrow"
				value={eyebrow}
				onChange={(val) => setAttributes({ eyebrow: val })}
				placeholder={__('Enter eyebrow text...', 'gravisain')}
			/>
			
			<RichText
				tagName="h1"
				className="hero-title"
				value={title}
				onChange={(val) => setAttributes({ title: val })}
				placeholder={__('Enter hero title...', 'gravisain')}
			/>

			<RichText
				tagName="p"
				className="hero-description"
				value={description}
				onChange={(val) => setAttributes({ description: val })}
				placeholder={__('Enter hero description...', 'gravisain')}
			/>

			<div className={`hero-button-group ${layout === '1-column' ? 'center' : ''}`}>
				<div className="button-wrapper" onClick={() => setActiveLink('primary')}>
					<RichText
						tagName="span"
						className={`gravisain-button gravisain-button--${primaryButton.style} primary-btn`}
						value={primaryButton.text}
						onChange={(val) => setAttributes({ primaryButton: { ...primaryButton, text: val } })}
						placeholder={__('Primary Action', 'gravisain')}
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>
					{ activeLink === 'primary' && (
						<Popover
							position="bottom center"
							onClose={ () => setActiveLink( null ) }
							focusOnMount={ false }
						>
							<LinkControl
								value={ { url: primaryButton.url, opensInNewTab: false } }
								onChange={ ( link ) => setAttributes({ primaryButton: { ...primaryButton, url: link.url } }) }
							/>
						</Popover>
					) }
				</div>
				
				<div className="button-wrapper" onClick={() => setActiveLink('secondary')}>
					<RichText
						tagName="span"
						className={`gravisain-button gravisain-button--${secondaryButton.style} secondary-btn`}
						value={secondaryButton.text}
						onChange={(val) => setAttributes({ secondaryButton: { ...secondaryButton, text: val } })}
						placeholder={__('Secondary Action', 'gravisain')}
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>
					{ activeLink === 'secondary' && (
						<Popover
							position="bottom center"
							onClose={ () => setActiveLink( null ) }
							focusOnMount={ false }
						>
							<LinkControl
								value={ { url: secondaryButton.url, opensInNewTab: false } }
								onChange={ ( link ) => setAttributes({ secondaryButton: { ...secondaryButton, url: link.url } }) }
							/>
						</Popover>
					) }
				</div>
			</div>
		</div>
	);
}
