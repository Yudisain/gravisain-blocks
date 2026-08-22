import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { DesktopIcon, TabletIcon, MobileIcon } from './icons';

/**
 * ResponsiveTabControl Component
 * 
 * Standardized Gravisain device switcher (Desktop, Tablet, Mobile)
 * using square rounded buttons matching signature Gravisain design.
 */
export default function ResponsiveTabControl( { children, activeDevice, onChangeDevice } ) {
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
		if ( previewDeviceType === 'Tablet' && ( activeDevice !== undefined ? activeDevice !== 'tablet' : internalDevice !== 'tablet' ) ) {
			if ( onChangeDevice ) onChangeDevice( 'tablet' );
			else setInternalDevice( 'tablet' );
		} else if ( previewDeviceType === 'Mobile' && ( activeDevice !== undefined ? activeDevice !== 'mobile' : internalDevice !== 'mobile' ) ) {
			if ( onChangeDevice ) onChangeDevice( 'mobile' );
			else setInternalDevice( 'mobile' );
		} else if ( previewDeviceType === 'Desktop' && ( activeDevice !== undefined ? activeDevice !== 'desktop' : internalDevice !== 'desktop' ) ) {
			if ( onChangeDevice ) onChangeDevice( 'desktop' );
			else setInternalDevice( 'desktop' );
		}
	}, [ previewDeviceType ] );

	const currentDevice = activeDevice !== undefined ? activeDevice : internalDevice;

	const switchDevice = ( newDev ) => {
		if ( onChangeDevice ) {
			onChangeDevice( newDev );
		} else {
			setInternalDevice( newDev );
		}

		const capitalizedDevice = newDev === 'tablet' ? 'Tablet' : newDev === 'mobile' ? 'Mobile' : 'Desktop';
		if ( setDeviceType ) setDeviceType( capitalizedDevice );
		if ( setPostDeviceType ) setPostDeviceType( capitalizedDevice );
		if ( setSiteDeviceType ) setSiteDeviceType( capitalizedDevice );
	};

	const inlineStyles = `
		.gravisain-responsive-control-wrapper {
			box-sizing: border-box;
			margin-bottom: 16px;
		}
		.gravisain-responsive-control-header {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-bottom: 8px;
		}
		.gravisain-responsive-control-devices {
			display: flex;
			gap: 4px;
		}
		.gravisain-responsive-control-devices .gravisain-device-btn {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 26px;
			height: 26px;
			border: 1px solid #e2e8f0;
			border-radius: 4px;
			background: #f8fafc;
			color: #64748b;
			cursor: pointer;
			transition: all 0.2s ease;
			padding: 0;
			margin: 0;
			outline: none;
			box-shadow: none;
		}
		.gravisain-responsive-control-devices .gravisain-device-btn:hover {
			background: #f1f5f9;
			color: #334155;
		}
		.gravisain-responsive-control-devices .gravisain-device-btn.is-active {
			border-color: #2563eb;
			background: #eff6ff;
			color: #2563eb;
		}
		.gravisain-responsive-control-devices .gravisain-device-btn svg {
			display: block;
			width: 14px;
			height: 14px;
		}
	`;

	return (
		<div className="gravisain-responsive-control-wrapper">
			<style>{ inlineStyles }</style>
			<div className="gravisain-responsive-control-header">
				<div className="gravisain-responsive-control-devices">
					<button
						type="button"
						className={ `gravisain-device-btn ${ currentDevice === 'desktop' ? 'is-active' : '' }` }
						onClick={ () => switchDevice( 'desktop' ) }
						title={ __( 'Desktop', 'gravisain' ) }
					>
						<DesktopIcon />
					</button>
					<button
						type="button"
						className={ `gravisain-device-btn ${ currentDevice === 'tablet' ? 'is-active' : '' }` }
						onClick={ () => switchDevice( 'tablet' ) }
						title={ __( 'Tablet', 'gravisain' ) }
					>
						<TabletIcon />
					</button>
					<button
						type="button"
						className={ `gravisain-device-btn ${ currentDevice === 'mobile' ? 'is-active' : '' }` }
						onClick={ () => switchDevice( 'mobile' ) }
						title={ __( 'Mobile', 'gravisain' ) }
					>
						<MobileIcon />
					</button>
				</div>
			</div>
			<div className="gravisain-responsive-control-content">
				{ typeof children === 'function' ? children( currentDevice ) : children }
			</div>
		</div>
	);
}
