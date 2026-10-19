import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import Inspector from './components/Inspector';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { mediaId, mediaUrl, mediaAlt, maxWidth } = attributes;

	const blockProps = useBlockProps( {
		className: 'gravisain-vector-wrapper',
		style: {
			'--gravisain-vector-max-width': maxWidth ? `${ maxWidth }px` : undefined,
		},
	} );

	return (
		<>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />
			<div { ...blockProps }>
				{ mediaUrl ? (
					<div className="gravisain-vector-inner">
						<img
							src={ mediaUrl }
							alt={ mediaAlt || '' }
							className="gravisain-vector-image"
						/>
					</div>
				) : (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									mediaId: media.id,
									mediaUrl: media.url,
									mediaAlt: media.alt || '',
								} )
							}
							allowedTypes={ [ 'image', 'image/svg+xml' ] }
							value={ mediaId }
							render={ ( { open } ) => (
								<div
									onClick={ open }
									className="gravisain-vector-placeholder"
									role="button"
									tabIndex={ 0 }
									onKeyPress={ ( e ) => {
										if ( e.key === 'Enter' || e.key === ' ' ) {
											open();
										}
									} }
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={ { marginBottom: '8px', opacity: 0.6 } }>
										<path d="M3 17c3-7 7-12 9-12s6 12 9 6"></path>
										<circle cx="12" cy="5" r="2"></circle>
										<circle cx="3" cy="17" r="2"></circle>
										<circle cx="21" cy="11" r="2"></circle>
									</svg>
									<span>{ __( 'Gravisain Vector Block', 'gravisain-blocks' ) }</span>
									<p>{ __( 'Click to select or upload an SVG / vector graphic from the Media Library.', 'gravisain-blocks' ) }</p>
									<Button variant="primary" onClick={ open } style={ { marginTop: '12px' } }>
										{ __( 'Select Vector Media', 'gravisain-blocks' ) }
									</Button>
								</div>
							) }
						/>
					</MediaUploadCheck>
				) }
			</div>
		</>
	);
}
