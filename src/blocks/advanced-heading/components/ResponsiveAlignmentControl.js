import { __ } from '@wordpress/i18n';
import { DesktopIcon, TabletIcon, MobileIcon } from '../../../controls/icons';

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
} ) {
	const switchDevice = ( newDev ) => {
		if ( onDeviceChange ) {
			onDeviceChange( newDev );
		} else {
			setDevice( newDev );
		}
	};

	const currentAlign =
		device === 'desktop'
			? textAlign || 'left'
			: device === 'tablet'
			? textAlignTablet || ''
			: textAlignMobile || '';

	const handleAlignChange = ( value ) => {
		if ( device === 'desktop' ) {
			onChangeDesktop( value );
		} else if ( device === 'tablet' ) {
			onChangeTablet( currentAlign === value ? '' : value );
		} else {
			onChangeMobile( currentAlign === value ? '' : value );
		}
	};

	return (
		<div className="gravisain-responsive-align-control">
			<div className="gravisain-responsive-align-control__header">
				<span className="gravisain-responsive-align-control__label">
					{ __( 'Text Alignment', 'gravisain-blocks' ) }
				</span>
				<div className="gravisain-responsive-align-control__devices">
					<button
						type="button"
						className={ `gravisain-device-btn ${ device === 'desktop' ? 'is-active' : '' }` }
						onClick={ () => switchDevice( 'desktop' ) }
						title={ __( 'Desktop', 'gravisain-blocks' ) }
					>
						<DesktopIcon />
					</button>
					<button
						type="button"
						className={ `gravisain-device-btn ${ device === 'tablet' ? 'is-active' : '' }` }
						onClick={ () => switchDevice( 'tablet' ) }
						title={ __( 'Tablet', 'gravisain-blocks' ) }
					>
						<TabletIcon />
					</button>
					<button
						type="button"
						className={ `gravisain-device-btn ${ device === 'mobile' ? 'is-active' : '' }` }
						onClick={ () => switchDevice( 'mobile' ) }
						title={ __( 'Mobile', 'gravisain-blocks' ) }
					>
						<MobileIcon />
					</button>
				</div>
			</div>
			<div className="gravisain-responsive-align-control__tabs">
				<button
					type="button"
					className={ `gravisain-align-btn ${ currentAlign === 'left' ? 'is-active' : '' }` }
					onClick={ () => handleAlignChange( 'left' ) }
					title={ __( 'Left', 'gravisain-blocks' ) }
				>
					<AlignLeftIcon />
				</button>
				<button
					type="button"
					className={ `gravisain-align-btn ${ currentAlign === 'center' ? 'is-active' : '' }` }
					onClick={ () => handleAlignChange( 'center' ) }
					title={ __( 'Center', 'gravisain-blocks' ) }
				>
					<AlignCenterIcon />
				</button>
				<button
					type="button"
					className={ `gravisain-align-btn ${ currentAlign === 'right' ? 'is-active' : '' }` }
					onClick={ () => handleAlignChange( 'right' ) }
					title={ __( 'Right', 'gravisain-blocks' ) }
				>
					<AlignRightIcon />
				</button>
			</div>
		</div>
	);
}
