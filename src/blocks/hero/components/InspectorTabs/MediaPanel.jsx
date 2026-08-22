import { __ } from '@wordpress/i18n';
import { PanelBody, Button } from '@wordpress/components';
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
					onSelect={(mediaObj) => setAttributes({ media: { ...media, url: mediaObj.url } })}
					allowedTypes={['image']}
					render={({ open }) => (
						<Button variant="secondary" onClick={open} style={{ width: '100%', justifyContent: 'center' }}>
							{media.url ? __('Replace Media Image', 'gravisain') : __('Select Media Image', 'gravisain')}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			{media.url && (
				<Button
					variant="link"
					isDestructive
					onClick={() => setAttributes({ media: { ...media, url: '' } })}
					style={{ marginTop: '10px' }}
				>
					{__('Remove Image', 'gravisain')}
				</Button>
			)}
		</PanelBody>
	);
}
