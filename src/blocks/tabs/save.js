import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		tabTitles = [],
		activeTab = 0,
		layout,
		tabAlignment,
		headerBackgroundColor,
		activeTabColor,
		activeTabTextColor,
		tabTextColor,
		contentBackgroundColor,
		contentPadding,
		borderRadius,
		borderWidth,
		borderColor,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-tabs',
			`layout-${ layout || 'horizontal' }`,
			`align-${ tabAlignment || 'left' }`,
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-tabs-header-bg': headerBackgroundColor || '#f8fafc',
			'--gravisain-tabs-active-bg': activeTabColor || '#007cba',
			'--gravisain-tabs-active-color': activeTabTextColor || '#ffffff',
			'--gravisain-tabs-color': tabTextColor || '#333333',
			'--gravisain-tabs-content-bg': contentBackgroundColor || '#ffffff',
			'--gravisain-tabs-padding': `${ contentPadding }px`,
			'--gravisain-tabs-radius': `${ borderRadius }px`,
			'--gravisain-tabs-border-width': `${ borderWidth }px`,
			'--gravisain-tabs-border-color': borderColor || '#e2e8f0',
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-tabs-header">
				<div className="gravisain-tabs-nav" role="tablist">
					{ tabTitles.map( ( tab, idx ) => {
						const isActive = idx === activeTab;
						return (
							<button
								key={ idx }
								type="button"
								role="tab"
								aria-selected={ isActive ? 'true' : 'false' }
								className={ `gravisain-tab-button ${ isActive ? 'is-active' : '' }` }
								data-tab-index={ idx }
							>
								<span className="gravisain-tab-button-title">{ tab.title }</span>
							</button>
						);
					} ) }
				</div>
			</div>

			<div className="gravisain-tabs-content-area">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
