import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { label, url, opensInNewTab } = attributes;
	
	const blockProps = useBlockProps.save( {
		className: 'gravisain-nav-link-item'
	} );

	if ( ! label && ! url ) {
		return null;
	}

	return (
		<li { ...blockProps }>
			<a 
				href={ url || '#' } 
				className="gravisain-nav-link"
				target={ opensInNewTab ? '_blank' : undefined }
				rel={ opensInNewTab ? 'noopener noreferrer' : undefined }
			>
				<RichText.Content tagName="span" className="gravisain-nav-link-label" value={ label } />
			</a>
		</li>
	);
}
