import { __ } from '@wordpress/i18n';
import { MediaPlaceholder, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { Image } from '../../../components/Image.jsx';

export default function Media({ attributes, setAttributes }) {
	const { media } = attributes;

	const onSelectMedia = (selectedMedia) => {
		setAttributes({ 
			media: { 
				...media, 
				url: selectedMedia.url,
				id: selectedMedia.id,
				alt: selectedMedia.alt 
			} 
		});
	};

	return (
		<div className="hero-media-wrapper">
			{media.url ? (
				<div className="hero-media-preview">
					<Image src={media.url} alt={media.alt} focalPoint={media.focalPoint} />
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectMedia}
							allowedTypes={['image', 'video']}
							value={media.id}
							render={({ open }) => (
								<Button 
									onClick={open} 
									variant="secondary" 
									className="replace-media-button"
									style={{ position: 'absolute', bottom: '10px', right: '10px' }}
								>
									{__('Replace Media', 'gravisain-blocks')}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</div>
			) : (
				<MediaPlaceholder
					onSelect={onSelectMedia}
					allowedTypes={['image', 'video']}
					multiple={false}
					labels={{ title: __('Hero Media', 'gravisain-blocks') }}
				/>
			)}
		</div>
	);
}
