import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import HeroButtons from './HeroButtons';

export default function HeroContent( { attributes, setAttributes } ) {
	const { eyebrow, title, description } = attributes;

	return (
		<div className="gravisain-hero__content">
			<RichText
				tagName="p"
				className="gravisain-hero__eyebrow"
				value={ eyebrow }
				onChange={ ( value ) => setAttributes( { eyebrow: value } ) }
				placeholder={ __( 'Add eyebrow text...', 'gravisain-blocks' ) }
			/>
			
			<RichText
				tagName="h1"
				className="gravisain-hero__title"
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				placeholder={ __( 'Hero Title', 'gravisain-blocks' ) }
			/>
			
			<RichText
				tagName="p"
				className="gravisain-hero__description"
				value={ description }
				onChange={ ( value ) => setAttributes( { description: value } ) }
				placeholder={ __( 'Hero description...', 'gravisain-blocks' ) }
			/>
			
			<HeroButtons attributes={attributes} setAttributes={setAttributes} />
		</div>
	);
}
