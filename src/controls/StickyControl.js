import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { DesktopIcon, TabletIcon, MobileIcon } from './icons';

/**
 * StickyControl Component
 * 
 * Reusable Sticky Settings panel matching Kadence Blocks design:
 * - 'Make sticky' toggle
 * - 'Sticky Header Offset' with responsive device switcher (Desktop, Tablet, Mobile), reset button, and Range slider.
 */
export default function StickyControl( {
	attributes,
	setAttributes,
	panelTitle = __( 'Sticky Settings', 'gravisain' ),
	helpText = __( 'This will stick the section to viewport for the height of outer container.', 'gravisain' ),
	initialOpen = false,
} ) {
	const {
		isSticky,
		stickyDesktop = true,
		stickyTablet = true,
		stickyMobile = false,
		stickyOffset,
		stickyOffsetTablet,
		stickyOffsetMobile,
	} = attributes;
	const [ internalDevice, setInternalDevice ] = useState( 'desktop' );

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	const { __experimentalSetPreviewDeviceType: setPostDeviceType } = useDispatch( 'core/edit-post' ) || {};
	const { __experimentalSetPreviewDeviceType: setSiteDeviceType } = useDispatch( 'core/edit-site' ) || {};
	const { setDeviceType } = useDispatch( 'core/editor' ) || {};

	useEffect( () => {
		if ( previewDeviceType === 'Tablet' && internalDevice !== 'tablet' ) {
			setInternalDevice( 'tablet' );
		} else if ( previewDeviceType === 'Mobile' && internalDevice !== 'mobile' ) {
			setInternalDevice( 'mobile' );
		} else if ( previewDeviceType === 'Desktop' && internalDevice !== 'desktop' ) {
			setInternalDevice( 'desktop' );
		}
	}, [ previewDeviceType ] );

	const switchDevice = ( newDev ) => {
		setInternalDevice( newDev );
		const capitalizedDevice = newDev === 'tablet' ? 'Tablet' : newDev === 'mobile' ? 'Mobile' : 'Desktop';
		if ( setDeviceType ) setDeviceType( capitalizedDevice );
		if ( setPostDeviceType ) setPostDeviceType( capitalizedDevice );
		if ( setSiteDeviceType ) setSiteDeviceType( capitalizedDevice );
	};

	const currentOffset = internalDevice === 'desktop'
		? ( stickyOffset !== undefined && stickyOffset !== '' ? parseInt( stickyOffset, 10 ) : 0 )
		: ( internalDevice === 'tablet'
			? ( stickyOffsetTablet !== undefined && stickyOffsetTablet !== '' ? parseInt( stickyOffsetTablet, 10 ) : undefined )
			: ( stickyOffsetMobile !== undefined && stickyOffsetMobile !== '' ? parseInt( stickyOffsetMobile, 10 ) : undefined )
		);

	const handleOffsetChange = ( val ) => {
		if ( internalDevice === 'desktop' ) {
			setAttributes( { stickyOffset: val !== undefined ? val : 0 } );
		} else if ( internalDevice === 'tablet' ) {
			setAttributes( { stickyOffsetTablet: val !== undefined ? val : '' } );
		} else {
			setAttributes( { stickyOffsetMobile: val !== undefined ? val : '' } );
		}
	};

	const handleReset = () => {
		if ( internalDevice === 'desktop' ) {
			setAttributes( { stickyOffset: 0 } );
		} else if ( internalDevice === 'tablet' ) {
			setAttributes( { stickyOffsetTablet: '' } );
		} else {
			setAttributes( { stickyOffsetMobile: '' } );
		}
	};

	return (
		<PanelBody title={ panelTitle } initialOpen={ !!isSticky || initialOpen }>
			<ToggleControl
				label={ __( 'Make sticky', 'gravisain' ) }
				help={ helpText }
				checked={ !!isSticky }
				onChange={ ( val ) => setAttributes( { isSticky: val } ) }
			/>
			{ !!isSticky && (
				<>
					<div
						className="gravisain-sticky-devices-control"
						style={ {
							marginTop: '16px',
							marginBottom: '16px',
							paddingBottom: '16px',
							borderBottom: '1px solid #f1f5f9',
						} }
					>
						<span
							style={ {
								fontSize: '11px',
								fontWeight: 600,
								textTransform: 'uppercase',
								color: '#1e293b',
								letterSpacing: '0.3px',
								display: 'block',
								marginBottom: '8px',
							} }
						>
							{ __( 'Enable Sticky On', 'gravisain' ) }
						</span>
						<div style={ { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' } }>
							<button
								type="button"
								onClick={ () => setAttributes( { stickyDesktop: stickyDesktop !== undefined ? !stickyDesktop : false } ) }
								title={ __( 'Toggle sticky on desktop screens', 'gravisain' ) }
								style={ {
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: '6px',
									padding: '7px 6px',
									borderRadius: '6px',
									border: '1px solid',
									borderColor: ( stickyDesktop ?? true ) ? '#2563eb' : '#e2e8f0',
									background: ( stickyDesktop ?? true ) ? '#eff6ff' : '#ffffff',
									color: ( stickyDesktop ?? true ) ? '#2563eb' : '#64748b',
									fontWeight: ( stickyDesktop ?? true ) ? 600 : 400,
									fontSize: '12px',
									cursor: 'pointer',
									transition: 'all 0.15s ease',
								} }
							>
								<DesktopIcon />
								<span>{ __( 'Desktop', 'gravisain' ) }</span>
							</button>
							<button
								type="button"
								onClick={ () => setAttributes( { stickyTablet: stickyTablet !== undefined ? !stickyTablet : false } ) }
								title={ __( 'Toggle sticky on tablet screens', 'gravisain' ) }
								style={ {
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: '6px',
									padding: '7px 6px',
									borderRadius: '6px',
									border: '1px solid',
									borderColor: ( stickyTablet ?? true ) ? '#2563eb' : '#e2e8f0',
									background: ( stickyTablet ?? true ) ? '#eff6ff' : '#ffffff',
									color: ( stickyTablet ?? true ) ? '#2563eb' : '#64748b',
									fontWeight: ( stickyTablet ?? true ) ? 600 : 400,
									fontSize: '12px',
									cursor: 'pointer',
									transition: 'all 0.15s ease',
								} }
							>
								<TabletIcon />
								<span>{ __( 'Tablet', 'gravisain' ) }</span>
							</button>
							<button
								type="button"
								onClick={ () => setAttributes( { stickyMobile: stickyMobile !== undefined ? !stickyMobile : true } ) }
								title={ __( 'Toggle sticky on mobile screens', 'gravisain' ) }
								style={ {
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: '6px',
									padding: '7px 6px',
									borderRadius: '6px',
									border: '1px solid',
									borderColor: ( stickyMobile ?? false ) ? '#2563eb' : '#e2e8f0',
									background: ( stickyMobile ?? false ) ? '#eff6ff' : '#ffffff',
									color: ( stickyMobile ?? false ) ? '#2563eb' : '#64748b',
									fontWeight: ( stickyMobile ?? false ) ? 600 : 400,
									fontSize: '12px',
									cursor: 'pointer',
									transition: 'all 0.15s ease',
								} }
							>
								<MobileIcon />
								<span>{ __( 'Mobile', 'gravisain' ) }</span>
							</button>
						</div>
					</div>

					<div className="gravisain-sticky-offset-control">
					<div
						className="gravisain-sticky-offset-header"
						style={ {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: '8px',
						} }
					>
						<span
							style={ {
								fontSize: '11px',
								fontWeight: 600,
								textTransform: 'uppercase',
								color: '#1e293b',
								letterSpacing: '0.3px',
							} }
						>
							{ __( 'Sticky Header Offset', 'gravisain' ) }
						</span>
						<div style={ { display: 'flex', alignItems: 'center', gap: '4px' } }>
							<button
								type="button"
								onClick={ handleReset }
								title={ __( 'Reset Offset', 'gravisain' ) }
								style={ {
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '24px',
									height: '24px',
									border: '1px solid #e2e8f0',
									borderRadius: '4px',
									background: '#f8fafc',
									color: '#64748b',
									cursor: 'pointer',
									padding: 0,
									marginRight: '2px',
								} }
							>
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
									<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
									<path d="M3 3v5h5" />
								</svg>
							</button>
							<button
								type="button"
								onClick={ () => switchDevice( 'desktop' ) }
								title={ __( 'Desktop', 'gravisain' ) }
								style={ {
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '24px',
									height: '24px',
									border: '1px solid',
									borderColor: internalDevice === 'desktop' ? '#2563eb' : '#e2e8f0',
									borderRadius: '4px',
									background: internalDevice === 'desktop' ? '#eff6ff' : '#f8fafc',
									color: internalDevice === 'desktop' ? '#2563eb' : '#64748b',
									cursor: 'pointer',
									padding: 0,
								} }
							>
								<DesktopIcon />
							</button>
							<button
								type="button"
								onClick={ () => switchDevice( 'tablet' ) }
								title={ __( 'Tablet', 'gravisain' ) }
								style={ {
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '24px',
									height: '24px',
									border: '1px solid',
									borderColor: internalDevice === 'tablet' ? '#2563eb' : '#e2e8f0',
									borderRadius: '4px',
									background: internalDevice === 'tablet' ? '#eff6ff' : '#f8fafc',
									color: internalDevice === 'tablet' ? '#2563eb' : '#64748b',
									cursor: 'pointer',
									padding: 0,
								} }
							>
								<TabletIcon />
							</button>
							<button
								type="button"
								onClick={ () => switchDevice( 'mobile' ) }
								title={ __( 'Mobile', 'gravisain' ) }
								style={ {
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '24px',
									height: '24px',
									border: '1px solid',
									borderColor: internalDevice === 'mobile' ? '#2563eb' : '#e2e8f0',
									borderRadius: '4px',
									background: internalDevice === 'mobile' ? '#eff6ff' : '#f8fafc',
									color: internalDevice === 'mobile' ? '#2563eb' : '#64748b',
									cursor: 'pointer',
									padding: 0,
								} }
							>
								<MobileIcon />
							</button>
						</div>
					</div>
					<RangeControl
						value={ currentOffset }
						onChange={ handleOffsetChange }
						min={ 0 }
						max={ 400 }
						step={ 1 }
						allowReset={ false }
						withInputField={ true }
					/>
				</div>
				</>
			) }
		</PanelBody>
	);
}
