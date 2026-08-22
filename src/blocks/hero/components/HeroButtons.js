import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export default function HeroButtons( { attributes, setAttributes } ) {
	const { primaryButton, secondaryButton } = attributes;

	return (
		<div className="gravisain-hero__buttons">
			<div className={`gravisain-button gravisain-button--${primaryButton.style || 'primary'}`}>
				<RichText
					tagName="span"
					value={ primaryButton.text }
					onChange={ ( value ) => setAttributes( { primaryButton: { ...primaryButton, text: value } } ) }
					placeholder={ __( 'Primary Button', 'gravisain' ) }
				/>
			</div>
			
			<div className={`gravisain-button gravisain-button--${secondaryButton.style || 'outline'}`}>
				<RichText
					tagName="span"
					value={ secondaryButton.text }
					onChange={ ( value ) => setAttributes( { secondaryButton: { ...secondaryButton, text: value } } ) }
					placeholder={ __( 'Secondary Button', 'gravisain' ) }
				/>
			</div>
		</div>
	);
}
