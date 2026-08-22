import { __ } from '@wordpress/i18n';
import { BaseControl, Button, SelectControl, RangeControl, FocalPointPicker } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import ColorControl from './ColorControl';

export default function BackgroundControl( { 
	backgroundImage,
	inheritedImage,
	backgroundPosition, 
	backgroundSize, 
	backgroundAttachment,
	backgroundOverlay,
	backgroundOverlayOpacity,
	onChangeImage,
	onChangePosition,
	onChangeSize,
	onChangeAttachment,
	onChangeOverlay,
	onChangeOverlayOpacity
} ) {
	
	// Helper to parse backgroundPosition string into {x, y} for FocalPointPicker
	const parsePosition = ( pos ) => {
		if ( !pos ) return { x: 0.5, y: 0.5 };
		
		if ( pos.includes('%') ) {
			const parts = pos.split(' ');
			if ( parts.length === 2 ) {
				return {
					x: parseFloat(parts[0]) / 100,
					y: parseFloat(parts[1]) / 100
				};
			}
		}
		
		let x = 0.5;
		let y = 0.5;
		if ( pos.includes('left') ) x = 0;
		if ( pos.includes('right') ) x = 1;
		if ( pos.includes('top') ) y = 0;
		if ( pos.includes('bottom') ) y = 1;
		
		return { x, y };
	};

	const focalPoint = parsePosition( backgroundPosition );

	const handleFocalPointChange = ( newFocalPoint ) => {
		if ( !newFocalPoint ) return;
		const x = Math.round( newFocalPoint.x * 100 );
		const y = Math.round( newFocalPoint.y * 100 );
		onChangePosition( `${x}% ${y}%` );
	};

	const sizeOptions = [
		{ label: __( 'Cover', 'gravisain' ), value: 'cover' },
		{ label: __( 'Contain', 'gravisain' ), value: 'contain' },
		{ label: __( 'Auto', 'gravisain' ), value: 'auto' },
	];

	const attachmentOptions = [
		{ label: __( 'Scroll', 'gravisain' ), value: 'scroll' },
		{ label: __( 'Fixed (Parallax)', 'gravisain' ), value: 'fixed' },
	];

	const removeImage = () => {
		onChangeImage( {} );
	};

	return (
		<div className="gravisain-background-control">
			{ ( backgroundImage?.url || inheritedImage?.url ) ? (
				<div style={{ marginBottom: '16px' }}>
					<FocalPointPicker
						label={ __( 'Background Image', 'gravisain' ) }
						url={ backgroundImage?.url || inheritedImage?.url }
						value={ focalPoint }
						onChange={ handleFocalPointChange }
					/>
					
					{ !backgroundImage?.url && inheritedImage?.url && (
						<div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', marginBottom: '8px', fontStyle: 'italic' }}>
							{ __( 'Inheriting image from larger device.', 'gravisain' ) }
						</div>
					) }

					<div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '16px' }}>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => onChangeImage( { id: media.id, url: media.url } ) }
								allowedTypes={ [ 'image' ] }
								value={ backgroundImage?.id }
								render={ ( { open } ) => (
									<Button isSecondary onClick={ open } style={{ flex: 1, justifyContent: 'center' }}>
										{ backgroundImage?.url ? __( 'Replace Image', 'gravisain' ) : __( 'Override Image', 'gravisain' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ backgroundImage?.url && (
							<Button isDestructive isLink onClick={ removeImage } style={{ flex: 1, justifyContent: 'center' }}>
								{ __( 'Remove', 'gravisain' ) }
							</Button>
						) }
					</div>

					<SelectControl
						label={ __( 'Size', 'gravisain' ) }
						value={ backgroundSize }
						options={ sizeOptions }
						onChange={ onChangeSize }
					/>
					<SelectControl
						label={ __( 'Attachment', 'gravisain' ) }
						value={ backgroundAttachment }
						options={ attachmentOptions }
						onChange={ onChangeAttachment }
					/>
				</div>
			) : (
				<BaseControl label={ __( 'Background Image', 'gravisain' ) } className="gravisain-background-image-control">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => onChangeImage( { id: media.id, url: media.url } ) }
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<Button isPrimary onClick={ open } style={{ justifyContent: 'center', width: '100%' }}>
									{ __( 'Select Image', 'gravisain' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</BaseControl>
			) }

			<hr style={{ margin: '20px 0' }} />

			<ColorControl
				label={ __( 'Background Overlay', 'gravisain' ) }
				value={ backgroundOverlay }
				onChange={ onChangeOverlay }
			/>

			{ backgroundOverlay && (
				<RangeControl
					label={ __( 'Overlay Opacity', 'gravisain' ) }
					value={ backgroundOverlayOpacity }
					onChange={ onChangeOverlayOpacity }
					min={ 0 }
					max={ 100 }
				/>
			) }
		</div>
	);
}
