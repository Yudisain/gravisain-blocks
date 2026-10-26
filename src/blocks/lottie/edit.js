import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		url,
		trigger,
		loop,
		speed,
		width,
		height,
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
			'gravisain-lottie',
			currentAlignment ? `align-${ currentAlignment }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-lottie-width': `${ width }px`,
			'--gravisain-lottie-height': `${ height }px`,
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
							onSelect={ ( media ) => setAttributes( { url: media.url } ) }
							allowedTypes={ [ 'application/json' ] }
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
										<polygon points="23 7 16 12 23 17 23 7"></polygon>
										<rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
									</svg>
									<div style={{ fontWeight: 600, fontSize: '15px', color: 'currentColor', marginBottom: '8px' }}>
										{ __( 'Lottie Animation', 'gravisain-blocks' ) }
									</div>
									<div style={{ fontSize: '13px', marginBottom: '16px' }}>
										{ __( 'Click here to upload a JSON file.', 'gravisain-blocks' ) }
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
				<div className="gravisain-lottie-preview-box" style={ { width: `${ width }px`, height: `${ height }px` } }>
					<div className="gravisain-lottie-badge">
						<span className="dashicons dashicons-video-alt3" />
						<span>{ __( 'Lottie Animation', 'gravisain-blocks' ) }</span>
						<small>{ trigger.toUpperCase() }</small>
					</div>
					<div className="gravisain-lottie-url">{ url }</div>
				</div>
			</div>
		</>
	);
}
