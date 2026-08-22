import { useBlockProps, RichText } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		title,
		allowedHeaders = [ false, true, true, true, false, false ],
		listStyle,
		collapsible,
		startCollapsed,
		smoothScroll,
		containerBackgroundColor,
		titleColor,
		linkColor,
		linkHoverColor,
		borderColor,
		borderRadius,
		contentPadding,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-table-of-contents',
			`list-style-${ listStyle || 'ul' }`,
			collapsible ? 'is-collapsible' : '',
			startCollapsed ? 'is-collapsed' : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-toc-bg': containerBackgroundColor || '#f8fafc',
			'--gravisain-toc-title-color': titleColor || '#1a202c',
			'--gravisain-toc-link-color': linkColor || '#007cba',
			'--gravisain-toc-hover-color': linkHoverColor || '#005a87',
			'--gravisain-toc-border-color': borderColor || '#e2e8f0',
			'--gravisain-toc-radius': `${ borderRadius }px`,
			'--gravisain-toc-padding': `${ contentPadding }px`,
			...parseCustomCSS( customCSS ),
		},
		'data-allowed': JSON.stringify( allowedHeaders ),
		'data-list-style': listStyle || 'ul',
		'data-smooth': smoothScroll ? 'true' : 'false',
	} );

	return (
		<nav { ...blockProps } aria-label={ title || 'Table of Contents' }>
			<div className="gravisain-toc-header">
				{ ! RichText.isEmpty( title ) && (
					<RichText.Content tagName="h4" className="gravisain-toc-title" value={ title } />
				) }
				{ collapsible && (
					<button type="button" className="gravisain-toc-toggle" aria-expanded={ ! startCollapsed } aria-label="Toggle Table of Contents">
						<span className="gravisain-toc-toggle-icon" />
					</button>
				) }
			</div>
			<div className="gravisain-toc-content" />
		</nav>
	);
}
