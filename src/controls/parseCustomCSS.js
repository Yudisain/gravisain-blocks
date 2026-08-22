/**
 * Parses simple custom CSS string (property: value;) into a React inline style object.
 * Used for customCSS / Additional CSS block option.
 */
export default function parseCustomCSS( cssString ) {
	if ( ! cssString || typeof cssString !== 'string' ) {
		return {};
	}

	const styleObj = {};
	cssString.split( ';' ).forEach( ( declaration ) => {
		const parts = declaration.split( ':' );
		if ( parts.length >= 2 ) {
			const prop = parts[ 0 ].trim();
			const val = parts.slice( 1 ).join( ':' ).trim();
			if ( prop && val ) {
				if ( prop.startsWith( '--' ) ) {
					styleObj[ prop ] = val;
				} else {
					// Convert kebab-case (e.g., color, font-size) to camelCase
					const camelProp = prop.replace( /-([a-z])/g, ( g ) => g[ 1 ].toUpperCase() );
					styleObj[ camelProp ] = val;
				}
			}
		}
	} );

	return styleObj;
}
