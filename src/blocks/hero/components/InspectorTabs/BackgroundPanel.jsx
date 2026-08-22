import { __ } from '@wordpress/i18n';
import { PanelBody, Button, RangeControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import ColorControl from '../../../../controls/ColorControl';

export default function BackgroundPanel({ attributes, setAttributes }) {
	const { background = {}, overlay = {} } = attributes;

	return (
		<PanelBody title={__('Background & Overlay', 'gravisain')} initialOpen={false}>
			<ColorControl
				label={__('Background Color', 'gravisain')}
				value={background.color}
				onChange={(color) => setAttributes({ background: { ...background, color } })}
			/>
			
			<div style={{ marginBottom: 16 }}>
				<p style={{ marginBottom: 8, fontWeight: 600 }}>{__('Background Image', 'gravisain')}</p>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(mediaObj) =>
							setAttributes({ background: { ...background, image: mediaObj.url } })
						}
						allowedTypes={['image']}
						render={({ open }) => (
							<Button variant="secondary" onClick={open} style={{ width: '100%', justifyContent: 'center' }}>
								{background.image ? __('Replace Image', 'gravisain') : __('Select Image', 'gravisain')}
							</Button>
						)}
					/>
				</MediaUploadCheck>
				{background.image && (
					<Button
						variant="link"
						isDestructive
						onClick={() => setAttributes({ background: { ...background, image: '' } })}
						style={{ marginTop: '10px' }}
					>
						{__('Remove Image', 'gravisain')}
					</Button>
				)}
			</div>

			<ColorControl
				label={__('Overlay Color', 'gravisain')}
				value={overlay.color}
				onChange={(color) => setAttributes({ overlay: { ...overlay, color } })}
			/>
			<RangeControl
				label={__('Overlay Opacity', 'gravisain')}
				value={overlay.opacity ? overlay.opacity * 100 : 50}
				onChange={(val) => setAttributes({ overlay: { ...overlay, opacity: val / 100 } })}
				min={0}
				max={100}
			/>
		</PanelBody>
	);
}
