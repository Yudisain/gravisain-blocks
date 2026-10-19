import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, Button } from '@wordpress/components';

export default function Inspector( { attributes, setAttributes } ) {
	const { mediaId, mediaUrl, mediaAlt, maxWidth } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Vector Media', 'gravisain-blocks' ) } initialOpen={ true }>
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
							mediaUrl ? (
								<div style={ { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' } }>
									<Button variant="secondary" onClick={ open } style={ { flex: 1, justifyContent: 'center' } }>
										{ __( 'Replace Vector', 'gravisain-blocks' ) }
									</Button>
									<Button
										isDestructive
										variant="secondary"
										onClick={ () => setAttributes( { mediaId: 0, mediaUrl: '', mediaAlt: '' } ) }
										style={ { justifyContent: 'center' } }
									>
										{ __( 'Remove', 'gravisain-blocks' ) }
									</Button>
								</div>
							) : (
								<Button variant="primary" onClick={ open } style={ { width: '100%', justifyContent: 'center', marginBottom: '12px' } }>
									{ __( 'Select Vector / SVG', 'gravisain-blocks' ) }
								</Button>
							)
						) }
					/>
				</MediaUploadCheck>

				{ mediaUrl && (
					<TextControl
						label={ __( 'Alt Text (Alternative Text)', 'gravisain-blocks' ) }
						value={ mediaAlt }
						onChange={ ( value ) => setAttributes( { mediaAlt: value } ) }
						help={ __( 'Describe the vector graphic for screen readers and accessibility.', 'gravisain-blocks' ) }
					/>
				) }

				<RangeControl
					label={ __( 'Max Width (px)', 'gravisain-blocks' ) }
					value={ maxWidth }
					onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
					min={ 10 }
					max={ 2000 }
				/>
			</PanelBody>
		</InspectorControls>
	);
}
