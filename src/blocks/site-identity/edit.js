import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, MediaUploadCheck, BlockControls, RichText } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import useGoogleFont from '../../controls/useGoogleFont';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		showLogo, customLogoId, customLogoUrl, logoWidth, logoShape, logoBorderRadius,
		showTitle, customTitle, showTagline, customTagline, layout, verticalAlignment,
		itemGap, linkToHome, titleTag,
		titleColor, titleTypography,
		taglineColor, taglineTypography, padding, margin
	} = attributes;

	// Load Google Fonts if selected
	useGoogleFont( titleTypography?.fontFamily );
	useGoogleFont( taglineTypography?.fontFamily );

	// Fetch site title, tagline, and logo from WordPress core store
	const { siteTitle, siteTagline, defaultLogoUrl } = useSelect( ( select ) => {
		const core = select( 'core' );
		const site = core?.getEntityRecord?.( 'root', '__unstableBase' ) || core?.getSite?.() || {};
		const title = site?.name || site?.title || __( 'Site Title', 'gravisain-blocks' );
		const tagline = site?.description || __( 'Just another WordPress site', 'gravisain-blocks' );

		let logo = '';
		const logoId = site?.logo;
		if ( logoId ) {
			const media = core?.getMedia?.( logoId );
			logo = media?.source_url || media?.media_details?.sizes?.full?.source_url || '';
		}

		return {
			siteTitle: title,
			siteTagline: tagline,
			defaultLogoUrl: logo
		};
	}, [] );

	const activeLogoUrl = customLogoUrl || defaultLogoUrl;
	const TitleTag = titleTag || 'span';

	const onSelectLogo = ( media ) => {
		setAttributes( {
			customLogoId: media.id,
			customLogoUrl: media.url || media?.sizes?.full?.url || ''
		} );
	};

	const blockProps = useBlockProps( {
		className: `gravisain-site-identity-wrapper layout-${layout} align-${verticalAlignment}`,
		style: {
			'--gravisain-si-gap': `${itemGap}px`,
			'--gravisain-si-logo-width': `${logoWidth}px`,
			'--gravisain-si-logo-radius': `${logoBorderRadius ?? 12}px`,
			'--gravisain-si-title-color': titleColor || 'inherit',
			'--gravisain-si-tagline-color': taglineColor || '#64748b',
			paddingTop: padding?.top,
			paddingRight: padding?.right,
			paddingBottom: padding?.bottom,
			paddingLeft: padding?.left,
			marginTop: margin?.top,
			marginRight: margin?.right,
			marginBottom: margin?.bottom,
			marginLeft: margin?.left,
		}
	} );

	return (
		<>
			<BlockControls>
				{ showLogo && (
					<ToolbarGroup>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectLogo }
								allowedTypes={ [ 'image' ] }
								value={ customLogoId }
								render={ ( { open } ) => (
									<ToolbarButton
										icon="format-image"
										label={ __( 'Select / Replace Logo from Media', 'gravisain-blocks' ) }
										onClick={ open }
									/>
								) }
							/>
						</MediaUploadCheck>
					</ToolbarGroup>
				) }
			</BlockControls>

			<Inspector 
				attributes={ attributes } 
				setAttributes={ setAttributes } 
				defaultLogoUrl={ defaultLogoUrl }
			/>

			<div { ...blockProps }>
				<div className="gravisain-site-identity-inner">
					{ showLogo && (
						<div className={ `gravisain-site-logo-wrap is-shape-${logoShape || 'circle'}` }>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ onSelectLogo }
									allowedTypes={ [ 'image' ] }
									value={ customLogoId }
									render={ ( { open } ) => (
										<div 
											className="gravisain-site-logo-clickable"
											onClick={ open }
											title={ __( 'Click to select logo from Media Library', 'gravisain-blocks' ) }
											style={ { cursor: 'pointer', position: 'relative' } }
										>
											{ activeLogoUrl ? (
												<img 
													src={ activeLogoUrl } 
													alt={ siteTitle } 
													className="gravisain-site-logo-img"
												/>
											) : (
												<div className="gravisain-site-logo-placeholder">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#94a3b8"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
													<span>{ __( '+ Select Logo', 'gravisain-blocks' ) }</span>
												</div>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
						</div>
					) }

					{ ( showTitle || showTagline ) && (
						<div className="gravisain-site-text-wrap">
							{ showTitle && (
								<RichText 
									tagName={ TitleTag }
									className="gravisain-site-title"
									value={ customTitle !== undefined && customTitle !== '' ? customTitle : siteTitle }
									placeholder={ siteTitle || __( 'Site Title...', 'gravisain-blocks' ) }
									onChange={ ( val ) => setAttributes( { customTitle: val } ) }
									style={ {
										fontFamily: titleTypography?.fontFamily,
										fontSize: titleTypography?.fontSize ? `${titleTypography.fontSize}px` : undefined,
										fontWeight: titleTypography?.fontWeight,
										lineHeight: titleTypography?.lineHeight,
										letterSpacing: titleTypography?.letterSpacing ? `${titleTypography.letterSpacing}px` : undefined,
										color: titleColor || undefined,
										outline: 'none'
									} }
								/>
							) }

							{ showTagline && (
								<RichText 
									tagName="p"
									className="gravisain-site-tagline"
									value={ customTagline !== undefined && customTagline !== '' ? customTagline : siteTagline }
									placeholder={ siteTagline || __( 'Site Tagline...', 'gravisain-blocks' ) }
									onChange={ ( val ) => setAttributes( { customTagline: val } ) }
									style={ {
										fontFamily: taglineTypography?.fontFamily,
										fontSize: taglineTypography?.fontSize ? `${taglineTypography.fontSize}px` : undefined,
										fontWeight: taglineTypography?.fontWeight,
										lineHeight: taglineTypography?.lineHeight,
										color: taglineColor || undefined,
										outline: 'none'
									} }
								/>
							) }
						</div>
					) }
				</div>
			</div>
		</>
	);
}
