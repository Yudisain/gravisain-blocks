import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { DesktopIcon, TabletIcon, MobileIcon } from './icons';

const AlignLeftIcon = () => (
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="17" y1="10" x2="3" y2="10" />
		<line x1="21" y1="6" x2="3" y2="6" />
		<line x1="21" y1="14" x2="3" y2="14" />
		<line x1="17" y1="18" x2="3" y2="18" />
	</svg>
);

const AlignCenterIcon = () => (
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="18" y1="10" x2="6" y2="10" />
		<line x1="21" y1="6" x2="3" y2="6" />
		<line x1="21" y1="14" x2="3" y2="14" />
		<line x1="18" y1="18" x2="6" y2="18" />
	</svg>
);

const AlignRightIcon = () => (
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="21" y1="10" x2="7" y2="10" />
		<line x1="21" y1="6" x2="3" y2="6" />
		<line x1="21" y1="14" x2="3" y2="14" />
		<line x1="21" y1="18" x2="7" y2="18" />
	</svg>
);

export default function ResponsiveAlignmentControl( {
	device,
	setDevice,
	onDeviceChange,
	textAlign,
	textAlignTablet,
	textAlignMobile,
	onChangeDesktop,
	onChangeTablet,
	onChangeMobile,
	label = __( 'Text Alignment', 'gravisain' ),
	defaultAlign = 'left',
} ) {
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
		if ( ! device ) {
			if ( previewDeviceType === 'Tablet' && internalDevice !== 'tablet' ) {
				setInternalDevice( 'tablet' );
			} else if ( previewDeviceType === 'Mobile' && internalDevice !== 'mobile' ) {
				setInternalDevice( 'mobile' );
			} else if ( previewDeviceType === 'Desktop' && internalDevice !== 'desktop' ) {
				setInternalDevice( 'desktop' );
			}
		}
	}, [ previewDeviceType, device ] );

	const activeDev = device || internalDevice;

	const switchDevice = ( newDev ) => {
		if ( onDeviceChange ) {
			onDeviceChange( newDev );
		} else if ( setDevice ) {
			setDevice( newDev );
		} else {
			setInternalDevice( newDev );
		}

		const capitalizedDevice = newDev === 'tablet' ? 'Tablet' : newDev === 'mobile' ? 'Mobile' : 'Desktop';
		if ( setDeviceType ) setDeviceType( capitalizedDevice );
		if ( setPostDeviceType ) setPostDeviceType( capitalizedDevice );
		if ( setSiteDeviceType ) setSiteDeviceType( capitalizedDevice );
	};

	const currentAlign =
		activeDev === 'desktop'
			? ( textAlign || defaultAlign )
			: activeDev === 'tablet'
			? ( textAlignTablet || '' )
			: ( textAlignMobile || '' );

	const handleAlignChange = ( value ) => {
		if ( activeDev === 'desktop' ) {
			if ( onChangeDesktop ) onChangeDesktop( value );
		} else if ( activeDev === 'tablet' ) {
			if ( onChangeTablet ) onChangeTablet( currentAlign === value ? '' : value );
		} else {
			if ( onChangeMobile ) onChangeMobile( currentAlign === value ? '' : value );
		}
	};

	return (
		<div className="gravisain-responsive-align-control">
			<div className="gravisain-responsive-align-control__header">
				<span className="gravisain-responsive-align-control__label">
					{ label }
				</span>
				<div className="gravisain-responsive-align-control__devices">
					<button
						type="button"
						className={ `gravisain-device-btn ${ activeDev === 'desktop' ? 'is-active' : '' }` }
						onClick={ () => switchDevice( 'desktop' ) }
						title={ __( 'Desktop', 'gravisain' ) }
					>
						<DesktopIcon />
					</button>
					<button
						type="button"
						className={ `gravisain-device-btn ${ activeDev === 'tablet' ? 'is-active' : '' }` }
						onClick={ () => switchDevice( 'tablet' ) }
						title={ __( 'Tablet', 'gravisain' ) }
					>
						<TabletIcon />
					</button>
					<button
						type="button"
						className={ `gravisain-device-btn ${ activeDev === 'mobile' ? 'is-active' : '' }` }
						onClick={ () => switchDevice( 'mobile' ) }
						title={ __( 'Mobile', 'gravisain' ) }
					>
						<MobileIcon />
					</button>
				</div>
			</div>
			<div className="gravisain-responsive-align-control__tabs">
				<button
					type="button"
					className={ `gravisain-align-btn ${ ( currentAlign === 'left' || ( ! currentAlign && activeDev !== 'desktop' && ( textAlign || defaultAlign ) === 'left' ) ) ? 'is-active' : '' }` }
					onClick={ () => handleAlignChange( 'left' ) }
					title={ __( 'Left', 'gravisain' ) }
				>
					<AlignLeftIcon />
				</button>
				<button
					type="button"
					className={ `gravisain-align-btn ${ ( currentAlign === 'center' || ( ! currentAlign && activeDev !== 'desktop' && ( textAlign || defaultAlign ) === 'center' ) ) ? 'is-active' : '' }` }
					onClick={ () => handleAlignChange( 'center' ) }
					title={ __( 'Center', 'gravisain' ) }
				>
					<AlignCenterIcon />
				</button>
				<button
					type="button"
					className={ `gravisain-align-btn ${ ( currentAlign === 'right' || ( ! currentAlign && activeDev !== 'desktop' && ( textAlign || defaultAlign ) === 'right' ) ) ? 'is-active' : '' }` }
					onClick={ () => handleAlignChange( 'right' ) }
					title={ __( 'Right', 'gravisain' ) }
				>
					<AlignRightIcon />
				</button>
			</div>
		</div>
	);
}
