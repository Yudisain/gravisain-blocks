import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		url,
		alt,
		caption,
		aspectRatio,
		objectFit,
		borderRadius,
		borderWidth,
		borderColor,
		borderStyle,
		boxShadow,
		overlayColor,
		overlayOpacity,
		alignment,
		alignmentTablet,
		alignmentMobile,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	const currentAlignment = previewDeviceType === 'Tablet' && alignmentTablet
		? alignmentTablet
		: previewDeviceType === 'Mobile' && alignmentMobile
		? alignmentMobile
		: alignment;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-image',
			currentAlignment ? `align-${ currentAlignment }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: currentAlignment === 'left' ? 'flex-start' : currentAlignment === 'right' ? 'flex-end' : 'center',
			border: 'none',
			outline: 'none',
			boxShadow: 'none',
			background: 'transparent',
			padding: 0,
			...parseCustomCSS( customCSS ),
		},
	} );

	if ( ! url ) {
		return (
			<>
				<Inspector { ...props } />
				<div { ...blockProps }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => setAttributes( { id: media.id, url: media.url, alt: media.alt || '' } ) }
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<div 
									onClick={ open }
									style={ { 
										width: '100%', 
										height: '250px', 
										background: '#f8fafc', 
										border: '2px dashed #cbd5e1', 
										borderRadius: '8px', 
										display: 'flex', 
										flexDirection: 'column', 
										alignItems: 'center', 
										justifyContent: 'center', 
										color: '#64748b',
										cursor: 'pointer',
										transition: 'all 0.2s ease'
									} }
									onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--wp-admin-theme-color, #007cba)'; e.currentTarget.style.color = 'var(--wp-admin-theme-color, #007cba)'; }}
									onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#64748b'; }}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px', opacity: 0.5 }}>
										<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
										<circle cx="8.5" cy="8.5" r="1.5"></circle>
										<polyline points="21 15 16 10 5 21"></polyline>
									</svg>
									<div style={{ fontWeight: 600, fontSize: '15px', color: 'currentColor', marginBottom: '8px' }}>
										{ __( 'Advanced Image', 'gravisain' ) }
									</div>
									<div style={{ fontSize: '13px', marginBottom: '16px' }}>
										{ __( 'Click here to select or upload an image.', 'gravisain' ) }
									</div>
								</div>
							) }
						/>
					</MediaUploadCheck>
				</div>
			</>
		);
	}

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<div
					className="gravisain-image-wrapper"
					style={ {
						aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
						borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
						borderWidth: borderWidth ? `${ borderWidth }px` : undefined,
						borderColor: borderColor || undefined,
						borderStyle: borderWidth ? borderStyle : undefined,
						boxShadow: boxShadow !== 'none' ? boxShadow : undefined,
						overflow: 'hidden',
						position: 'relative',
						width: '100%',
						maxWidth: '100%',
					} }
				>
					<img
						src={ url }
						alt={ alt }
						style={ {
							width: '100%',
							height: aspectRatio !== 'auto' ? '100%' : 'auto',
							objectFit: aspectRatio !== 'auto' ? objectFit : undefined,
							display: 'block',
						} }
					/>
					{ overlayColor && overlayOpacity > 0 && (
						<div
							className="gravisain-image-overlay"
							style={ {
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: overlayColor,
								opacity: overlayOpacity / 100,
								pointerEvents: 'none',
							} }
						/>
					) }
				</div>

				<RichText
					tagName="figcaption"
					className="gravisain-image-caption"
					value={ caption }
					onChange={ ( val ) => setAttributes( { caption: val } ) }
					placeholder={ __( 'Write a caption...', 'gravisain' ) }
				/>
			</div>
		</>
	);
}
