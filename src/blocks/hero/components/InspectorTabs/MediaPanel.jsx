import { __ } from '@wordpress/i18n';
import { PanelBody, Button, FocalPointPicker } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

export default function MediaPanel({ attributes, setAttributes }) {
	const { layout, media = {} } = attributes;

	if (layout === '1-column' || layout === 'full-width') {
		return null;
	}

	return (
		<PanelBody title={__('Media (Foreground)', 'gravisain')} initialOpen={false}>
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(mediaObj) => setAttributes({ media: { ...media, url: mediaObj.url, id: mediaObj.id, alt: mediaObj.alt || '' } })}
					allowedTypes={['image']}
					render={({ open }) => (
						<div style={{ display: 'flex', gap: '8px', marginBottom: media.url ? '16px' : '0' }}>
							<Button variant="secondary" onClick={open} style={{ flex: 1, justifyContent: 'center' }}>
								{media.url ? __('Replace Media Image', 'gravisain') : __('Select Media Image', 'gravisain')}
							</Button>
							{media.url && (
								<Button
									variant="secondary"
									isDestructive
									onClick={() => setAttributes({ media: { ...media, url: '', focalPoint: { x: 0.5, y: 0.5 } } })}
								>
									{__('Remove', 'gravisain')}
								</Button>
							)}
						</div>
					)}
				/>
			</MediaUploadCheck>
			{media.url && (
				<div className="gravisain-focal-point-wrapper" style={{ marginBottom: 16 }}>
					<FocalPointPicker
						label={__('Focal Point (Foreground Image)', 'gravisain')}
						url={media.url}
						value={media.focalPoint || { x: 0.5, y: 0.5 }}
						onChange={(focalPoint) => setAttributes({ media: { ...media, focalPoint } })}
					/>
				</div>
			)}
		</PanelBody>
	);
}
