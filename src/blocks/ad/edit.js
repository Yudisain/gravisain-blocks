import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		adType,
		adCode,
		bannerUrl,
		bannerAlt,
		bannerLink,
		bannerLinkTarget,
		showLabel,
		adLabel,
		alignment,
		alignmentTablet,
		alignmentMobile,
		maxWidth,
		minHeight,
		borderRadius,
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
		className: [
			'gravisain-ad',
			currentAlignment ? `align-${ currentAlignment }` : '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-ad-max-width': maxWidth > 0 ? `${ maxWidth }px` : undefined,
			'--gravisain-ad-min-height': minHeight > 0 ? `${ minHeight }px` : undefined,
			'--gravisain-ad-radius': borderRadius ? `${ borderRadius }px` : undefined,
			display: 'flex',
			flexDirection: 'column',
			alignItems: currentAlignment === 'left' ? 'flex-start' : currentAlignment === 'right' ? 'flex-end' : 'center',
			outline: 'none',
			boxShadow: 'none',
			background: 'transparent',
			padding: 0,
		},
	} );

	const isBanner = adType === 'banner';
	const isEmpty = isBanner ? ! bannerUrl : ! adCode;

	const renderLabel = () =>
		showLabel && adLabel ? <div className="gravisain-ad-label">{ adLabel }</div> : null;

	// Empty state placeholder.
	if ( isEmpty ) {
		return (
			<>
				<Inspector { ...props } />
				<div { ...blockProps }>
					{ isBanner ? (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => setAttributes( { bannerId: media.id, bannerUrl: media.url, bannerAlt: media.alt || '' } ) }
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<div
										onClick={ open }
										className="gravisain-ad-placeholder"
										role="button"
										tabIndex={ 0 }
										onKeyPress={ ( e ) => {
											if ( e.key === 'Enter' || e.key === ' ' ) {
												open();
											}
										} }
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="gravisain-ad-placeholder-icon">
											<rect x="3" y="3" width="18" height="18" rx="2"></rect>
											<circle cx="8.5" cy="8.5" r="1.5"></circle>
											<polyline points="21 15 16 10 5 21"></polyline>
										</svg>
										<span className="gravisain-ad-placeholder-title">
											{ __( 'Advertisement Banner', 'gravisain-blocks' ) }
										</span>
										<span className="gravisain-ad-placeholder-text">
											{ __( 'Click to select or upload a banner image.', 'gravisain-blocks' ) }
										</span>
									</div>
								) }
							/>
						</MediaUploadCheck>
					) : (
						<div className="gravisain-ad-placeholder">
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="gravisain-ad-placeholder-icon">
								<path d="M3 11l13-5.5v13L3 13v-2z"></path>
								<path d="M6.5 12v5.2a1 1 0 001 1h1.2a1 1 0 001-1V12"></path>
								<path d="M18.5 9.2c1.4.7 2 1.6 2 2.8s-.6 2.1-2 2.8"></path>
							</svg>
							<span className="gravisain-ad-placeholder-title">
								{ __( 'Advertisement / Ad Space', 'gravisain-blocks' ) }
							</span>
							<span className="gravisain-ad-placeholder-text">
								{ __( 'Paste your ad network code (e.g. Google AdSense) in the block settings.', 'gravisain-blocks' ) }
							</span>
						</div>
					) }
				</div>
			</>
		);
	}

	// Editor preview (does not execute live ad scripts to keep the editor fast & clean).
	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				{ renderLabel() }
				<div className="gravisain-ad-container">
					{ isBanner ? (
						bannerLink ? (
							<a
								className="gravisain-ad-banner-link"
								href={ bannerLink }
								target={ bannerLinkTarget }
								rel={ bannerLinkTarget === '_blank' ? 'noopener noreferrer' : undefined }
							>
								<img src={ bannerUrl } alt={ bannerAlt } className="gravisain-ad-banner-image" />
							</a>
						) : (
							<img src={ bannerUrl } alt={ bannerAlt } className="gravisain-ad-banner-image" />
						)
					) : (
						<div className="gravisain-ad-code-preview">
							<span className="gravisain-ad-code-preview-badge">{ __( 'Ad Code', 'gravisain-blocks' ) }</span>
							<code>{ adCode.length > 240 ? `${ adCode.slice( 0, 240 ) }…` : adCode }</code>
						</div>
					) }
				</div>
			</div>
		</>
	);
}
