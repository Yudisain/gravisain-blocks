import { __ } from '@wordpress/i18n';

export default function HeroMedia( { attributes } ) {
	const { layout, media } = attributes;

	if ( layout !== '2-columns' ) {
		return null;
	}

	return (
		<div className="gravisain-hero__media">
			{ media.url ? (
				<img src={ media.url } alt={ __( 'Hero Media', 'gravisain' ) } />
			) : (
				<div className="gravisain-hero__media-placeholder">
					{ __( 'Media Placeholder', 'gravisain' ) }
				</div>
			) }
		</div>
	);
}
