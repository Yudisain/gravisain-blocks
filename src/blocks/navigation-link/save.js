import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { label, url, opensInNewTab, isActive } = attributes;
	const hasActive = Boolean( isActive );
	
	const blockProps = useBlockProps.save( {
		className: `gravisain-nav-link-item${ hasActive ? ' is-active' : '' }`
	} );

	if ( ! label && ! url ) {
		return null;
	}

	return (
		<li { ...blockProps }>
			<a 
				href={ url || '#' } 
				className={ hasActive ? 'gravisain-nav-link is-active' : 'gravisain-nav-link' }
				aria-current={ hasActive ? 'page' : undefined }
				target={ opensInNewTab ? '_blank' : undefined }
				rel={ opensInNewTab ? 'noopener noreferrer' : undefined }
			>
				<RichText.Content tagName="span" className="gravisain-nav-link-label" value={ label } />
			</a>
		</li>
	);
}
