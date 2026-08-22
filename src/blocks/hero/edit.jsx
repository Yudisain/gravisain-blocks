import { useBlockProps } from '@wordpress/block-editor';
import { Section } from '../../components/Section.jsx';
import { Container } from '../../components/Container.jsx';
import Inspector from './components/Inspector.jsx';
import Content from './components/Content.jsx';
import Media from './components/Media.jsx';
import parseCustomCSS from '../../controls/parseCustomCSS';
import useGoogleFont from '../../controls/useGoogleFont';
import { getHeroCSSVariables } from './utils';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { 
		layout, background, overlay, innerContainerMaxWidth, anchor, customClassName, customCSS,
		titleTypography, eyebrowTypography, descriptionTypography, primaryButtonTypography, secondaryButtonTypography
	} = attributes;

	// Load Google Fonts in the editor
	useGoogleFont( titleTypography?.fontFamily );
	useGoogleFont( eyebrowTypography?.fontFamily );
	useGoogleFont( descriptionTypography?.fontFamily );
	useGoogleFont( primaryButtonTypography?.fontFamily );
	useGoogleFont( secondaryButtonTypography?.fontFamily );

	const cssVars = getHeroCSSVariables( attributes );
	
	const blockProps = useBlockProps( {
		className: `gravisain-hero hero-layout-${ layout } ${ customClassName || '' }`.trim(),
		style: {
			...parseCustomCSS(customCSS)
		}
	} );

	// Build CSS variables string
	const cssVarEntries = Object.entries( cssVars )
		.filter( ( [ , val ] ) => val !== undefined && val !== null && val !== '' )
		.map( ( [ key, val ] ) => `${ key }: ${ val };` )
		.join( '\n\t\t\t' );

	const blockId = `block-${ clientId }`;

	const dynamicEditorCSS = `
		#${ blockId } {
			${ cssVarEntries }
		}

		/* Force override Gutenberg styles */
		#${ blockId } .hero-eyebrow {
			font-family: var(--gravisain-hero-eyebrow-ff, inherit) !important;
			font-size: var(--gravisain-hero-eyebrow-fs, 0.875rem) !important;
			font-weight: var(--gravisain-hero-eyebrow-fw, 600) !important;
			line-height: var(--gravisain-hero-eyebrow-lh, 1.2) !important;
			letter-spacing: var(--gravisain-hero-eyebrow-ls, 0.12em) !important;
			color: var(--gravisain-hero-eyebrow-color, var(--wp--preset--color--primary, #2563eb)) !important;
		}
		#${ blockId } .hero-title {
			font-family: var(--gravisain-hero-title-ff, inherit) !important;
			font-size: var(--gravisain-hero-title-fs, clamp(2rem, 5vw, 3.5rem)) !important;
			font-weight: var(--gravisain-hero-title-fw, 800) !important;
			line-height: var(--gravisain-hero-title-lh, 1.2) !important;
			letter-spacing: var(--gravisain-hero-title-ls, normal) !important;
			color: var(--gravisain-hero-title-color, inherit) !important;
		}
		#${ blockId } .hero-title mark,
		#${ blockId } .hero-title .gravisain-highlight {
			background: transparent;
			color: var(--gravisain-highlight-color, var(--wp--preset--color--primary, #2563eb));
			font-weight: inherit;
		}
		#${ blockId } .hero-description {
			font-family: var(--gravisain-hero-desc-ff, inherit) !important;
			font-size: var(--gravisain-hero-desc-fs, clamp(1.05rem, 2vw, 1.25rem)) !important;
			font-weight: var(--gravisain-hero-desc-fw, 400) !important;
			line-height: var(--gravisain-hero-desc-lh, 1.6) !important;
			letter-spacing: var(--gravisain-hero-desc-ls, normal) !important;
			color: var(--gravisain-hero-desc-color, inherit) !important;
		}

		/* Primary Button — force all style properties to update in editor */
		#${ blockId } .gravisain-button.primary-btn {
			padding-top: var(--gravisain-hero-btn1-pt, 0.875rem) !important;
			padding-right: var(--gravisain-hero-btn1-pr, 1.75rem) !important;
			padding-bottom: var(--gravisain-hero-btn1-pb, 0.875rem) !important;
			padding-left: var(--gravisain-hero-btn1-pl, 1.75rem) !important;
			font-family: var(--gravisain-hero-btn1-ff, inherit) !important;
			font-size: var(--gravisain-hero-btn1-fs, 1rem) !important;
			font-weight: var(--gravisain-hero-btn1-fw, 600) !important;
			line-height: var(--gravisain-hero-btn1-lh, 1.2) !important;
			letter-spacing: var(--gravisain-hero-btn1-ls, normal) !important;
			border-radius: var(--gravisain-hero-btn1-radius, 8px) !important;
		}
		#${ blockId } .gravisain-button.primary-btn.gravisain-button--primary {
			background-color: var(--gravisain-hero-btn1-bg, var(--wp--preset--color--primary, #2563eb)) !important;
			color: var(--gravisain-hero-btn1-color, #ffffff) !important;
		}
		#${ blockId } .gravisain-button.primary-btn.gravisain-button--outline {
			background-color: transparent !important;
			color: var(--gravisain-hero-btn1-color, inherit) !important;
			border: 2px solid currentColor !important;
		}
		#${ blockId } .gravisain-button.primary-btn.gravisain-button--link {
			background-color: transparent !important;
			color: var(--gravisain-hero-btn1-color, inherit) !important;
			border: none !important;
			padding: 0 !important;
		}

		/* Secondary Button — force all style properties to update in editor */
		#${ blockId } .gravisain-button.secondary-btn {
			padding-top: var(--gravisain-hero-btn2-pt, 0.875rem) !important;
			padding-right: var(--gravisain-hero-btn2-pr, 1.75rem) !important;
			padding-bottom: var(--gravisain-hero-btn2-pb, 0.875rem) !important;
			padding-left: var(--gravisain-hero-btn2-pl, 1.75rem) !important;
			font-family: var(--gravisain-hero-btn2-ff, inherit) !important;
			font-size: var(--gravisain-hero-btn2-fs, 1rem) !important;
			font-weight: var(--gravisain-hero-btn2-fw, 600) !important;
			line-height: var(--gravisain-hero-btn2-lh, 1.2) !important;
			letter-spacing: var(--gravisain-hero-btn2-ls, normal) !important;
			border-radius: var(--gravisain-hero-btn2-radius, 8px) !important;
		}
		#${ blockId } .gravisain-button.secondary-btn.gravisain-button--primary {
			background-color: var(--gravisain-hero-btn2-bg, var(--wp--preset--color--secondary, #64748b)) !important;
			color: var(--gravisain-hero-btn2-color, #ffffff) !important;
		}
		#${ blockId } .gravisain-button.secondary-btn.gravisain-button--outline {
			background-color: transparent !important;
			color: var(--gravisain-hero-btn2-color, inherit) !important;
			border: 2px solid currentColor !important;
		}
		#${ blockId } .gravisain-button.secondary-btn.gravisain-button--link {
			background-color: transparent !important;
			color: var(--gravisain-hero-btn2-color, inherit) !important;
			border: none !important;
			padding: 0 !important;
		}
	`;

	return (
		<>
			<style>{ dynamicEditorCSS }</style>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />

			<Section
				{ ...blockProps }
				id={ anchor || blockId }
				background={ background }
				overlay={ overlay }
			>
				<Container maxWidth="xl" className="hero-container" style={ { maxWidth: innerContainerMaxWidth || undefined } }>
					<div className={ `hero-layout hero-layout-${ layout }` }>
						<Content attributes={ attributes } setAttributes={ setAttributes } />

						{ layout !== '1-column' && (
							<Media attributes={ attributes } setAttributes={ setAttributes } />
						) }
					</div>
				</Container>
			</Section>
		</>
	);
}
