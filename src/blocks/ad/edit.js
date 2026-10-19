import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		adType,
		adSenseClient,
		adSenseSlot,
		adSenseFormat,
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

	const isAdSense = adType === 'adsense' || adType === 'code';
	const isBanner = adType === 'banner';

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

	const isEmpty = isBanner ? ! bannerUrl : ( ! adSenseClient || ! adSenseSlot );

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
								<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
								<line x1="8" y1="21" x2="16" y2="21"></line>
								<line x1="12" y1="17" x2="12" y2="21"></line>
							</svg>
							<span className="gravisain-ad-placeholder-title">
								{ __( 'Google AdSense Ad Space', 'gravisain-blocks' ) }
							</span>
							<span className="gravisain-ad-placeholder-text">
								{ __( 'Configure your Publisher ID and Slot ID in the block settings to activate this ad unit.', 'gravisain-blocks' ) }
							</span>
						</div>
					) }
				</div>
			</>
		);
	}

	// Editor preview (visual placeholder without running live third-party scripts).
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
						<div className="gravisain-ad-unit-preview">
							<div className="gravisain-ad-unit-badge">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z"/>
								</svg>
								{ __( 'Google AdSense Unit', 'gravisain-blocks' ) }
							</div>
							<div className="gravisain-ad-unit-info">
								<div className="gravisain-ad-unit-row">
									<span className="gravisain-ad-unit-label">{ __( 'Publisher:', 'gravisain-blocks' ) }</span>
									<span className="gravisain-ad-unit-val">{ adSenseClient }</span>
								</div>
								<div className="gravisain-ad-unit-row">
									<span className="gravisain-ad-unit-label">{ __( 'Slot ID:', 'gravisain-blocks' ) }</span>
									<span className="gravisain-ad-unit-val">{ adSenseSlot }</span>
								</div>
								{ adSenseFormat && (
									<div className="gravisain-ad-unit-row">
										<span className="gravisain-ad-unit-label">{ __( 'Format:', 'gravisain-blocks' ) }</span>
										<span className="gravisain-ad-unit-val">{ adSenseFormat }</span>
									</div>
								) }
							</div>
						</div>
					) }
				</div>
			</div>
		</>
	);
}
