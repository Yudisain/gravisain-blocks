const fs = require('fs');
const path = require('path');

function normalizeFintechHtml(content) {
	let output = content;

	// 1. Normalize buttons container
	// Replace "alignment":"center" with "justifyContent":"center"
	output = output.replace(
		/<!-- wp:gravisain\/buttons (\{.*?\}) -->\s*<div class="[^"]*wp-block-gravisain-buttons[^"]*" style="([^"]*)">/g,
		(match, attrsStr, styleStr) => {
			let attrs = {};
			try { attrs = JSON.parse(attrsStr); } catch (e) {}
			const jc = attrs.alignment === 'center' ? 'center' : (attrs.justifyContent || 'flex-start');
			const gap = attrs.gap !== undefined ? attrs.gap : 16;
			const newAttrs = {
				layout: attrs.layout || 'horizontal',
				justifyContent: jc,
				gap: gap
			};
			// extract margin-bottom if present in styleStr
			const mbMatch = styleStr.match(/margin-bottom:\s*([^;]+)/);
			const mb = mbMatch ? mbMatch[1].trim() : undefined;
			if (mb) {
				newAttrs.margin = { bottom: mb };
			}
			const style = `--buttons-justify:${jc};--buttons-gap:${gap}px;` +
				(mb ? `margin-bottom:${mb};--gravisain-buttons-margin-bottom:${mb};` : '') +
				`display:flex;flex-direction:row;flex-wrap:wrap;justify-content:${jc};gap:${gap}px`;
			return `<!-- wp:gravisain/buttons ${JSON.stringify(newAttrs)} -->\n\t\t<div class="wp-block-gravisain-buttons gravisain-buttons-wrapper is-layout-horizontal" style="${style}">`;
		}
	);

	// 2. Normalize advanced-button
	// Ensure buttonStyle is used instead of variant, and inner text is wrapped in <span class="gravisain-btn-text">
	output = output.replace(
		/<!-- wp:gravisain\/advanced-button (\{.*?\}) -->\s*<div class="[^"]*wp-block-gravisain-advanced-button[^"]*">\s*<a href="([^"]*)" class="([^"]*)" style="([^"]*)">([\s\S]*?)<\/a>\s*<\/div>\s*<!-- \/wp:gravisain\/advanced-button -->/g,
		(match, attrsStr, url, cls, styleStr, innerText) => {
			let attrs = {};
			try { attrs = JSON.parse(attrsStr); } catch (e) {}

			const bStyle = attrs.variant === 'outline' || attrs.buttonStyle === 'outline' ? 'outline' : 'fill';
			const isFill = bStyle === 'fill';
			const text = attrs.text || innerText.replace(/<[^>]+>/g, '').trim();

			const newAttrs = {
				text: text,
				url: attrs.url || url || '#',
				buttonStyle: bStyle,
				backgroundColor: attrs.backgroundColor || (isFill ? '#042718' : 'transparent'),
				textColor: attrs.textColor || (isFill ? '#ffffff' : '#042718'),
				borderRadius: attrs.borderRadius !== undefined ? attrs.borderRadius : 30,
				padding: attrs.padding || { top: '16px', right: '32px', bottom: '16px', left: '32px' },
				typography: attrs.typography || { fontSize: 16, fontWeight: 700 }
			};
			if (attrs.hoverBackgroundColor) newAttrs.hoverBackgroundColor = attrs.hoverBackgroundColor;
			if (attrs.borderColor) newAttrs.borderColor = attrs.borderColor;

			const finalBg = newAttrs.backgroundColor;
			const finalColor = newAttrs.textColor;
			const finalBorder = newAttrs.borderColor || (isFill ? 'transparent' : finalColor);
			const p = newAttrs.padding;
			const fs = (newAttrs.typography && newAttrs.typography.fontSize) ? `${newAttrs.typography.fontSize}px` : '16px';
			const fw = (newAttrs.typography && newAttrs.typography.fontWeight) ? newAttrs.typography.fontWeight : 700;
			const br = `${newAttrs.borderRadius}px`;
			const bw = isFill ? '1px' : '2px';

			const btnStyle = `--btn-bg:${finalBg};--btn-color:${finalColor};--btn-hover-bg:${newAttrs.hoverBackgroundColor || finalBg};--btn-hover-color:${finalColor};--btn-border-color:${finalBorder};--btn-hover-border-color:${finalBorder};--btn-icon-gap:8px;background-color:${finalBg};color:${finalColor};border-color:${finalBorder};border-width:${bw};border-style:solid;border-radius:${br};padding-top:${p.top};padding-right:${p.right};padding-bottom:${p.bottom};padding-left:${p.left};font-size:${fs};font-weight:${fw};line-height:1.2;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;box-sizing:border-box;width:100%`;

			return `<!-- wp:gravisain/advanced-button ${JSON.stringify(newAttrs)} -->\n\t\t\t<div class="wp-block-gravisain-advanced-button gravisain-advanced-button"><a href="${newAttrs.url}" class="gravisain-btn gravisain-advanced-button-inner gravisain-btn-${bStyle} gravisain-btn-md" style="${btnStyle}"><span class="gravisain-btn-text">${text}</span></a></div>\n\t\t\t<!-- /wp:gravisain/advanced-button -->`;
		}
	);

	// 3. Normalize column wrappers that have extra inline card styling
	// Move custom styles into an inner wrapper div so wp-block-gravisain-column is 100% clean
	output = output.replace(
		/<!-- wp:gravisain\/column(\s+\{.*?\})?\s*-->\s*<div class="wp-block-gravisain-column gravisain-column" style="min-width:0;box-sizing:border-box;([^"]+)">([\s\S]*?)<\/div>\s*<!-- \/wp:gravisain\/column -->/g,
		(match, attrsStr, extraStyles, innerContent) => {
			let attrs = {};
			if (attrsStr) {
				try { attrs = JSON.parse(attrsStr.trim()); } catch (e) {}
			}
			// Clean attrs of non-standard "alignment"
			if (attrs.alignment) {
				delete attrs.alignment;
			}
			const cleanAttrsComment = Object.keys(attrs).length > 0
				? `<!-- wp:gravisain/column ${JSON.stringify(attrs)} -->`
				: `<!-- wp:gravisain/column -->`;

			return `${cleanAttrsComment}\n\t<div class="wp-block-gravisain-column gravisain-column" style="min-width:0;box-sizing:border-box">\n\t\t<div style="${extraStyles}">\n${innerContent.trim()}\n\t\t</div>\n\t</div>\n\t<!-- /wp:gravisain/column -->`;
		}
	);

	// Normalize columns with alignment: center in attributes
	output = output.replace(
		/<!-- wp:gravisain\/column \{"alignment":"center"\}\s*-->\s*<div class="wp-block-gravisain-column gravisain-column" style="min-width:0;box-sizing:border-box;text-align:center">([\s\S]*?)<\/div>\s*<!-- \/wp:gravisain\/column -->/g,
		(match, innerContent) => {
			return `<!-- wp:gravisain/column -->\n\t<div class="wp-block-gravisain-column gravisain-column" style="min-width:0;box-sizing:border-box">\n\t\t<div style="text-align:center">\n${innerContent.trim()}\n\t\t</div>\n\t</div>\n\t<!-- /wp:gravisain/column -->`;
		}
	);

	// 4. Normalize advanced-heading
	output = output.replace(
		/<!-- wp:gravisain\/advanced-heading (\{.*?\}) -->([\s\S]*?)<!-- \/wp:gravisain\/advanced-heading -->/g,
		(match, attrsStr, innerHtml) => {
			let attrs = {};
			try { attrs = JSON.parse(attrsStr); } catch (e) {}
			if (attrs.showDivider === undefined) {
				attrs.showDivider = false;
			}
			const tag = attrs.headingTag || 'h2';
			const align = attrs.textAlign || 'left';
			const content = attrs.content || '';
			const eyebrow = attrs.eyebrow || '';
			const desc = attrs.description || '';
			const titleColor = attrs.titleColor || '#042718';

			// Heading style matching save.js exactly
			const headingStyle = `text-align:${align};font-weight:800;text-transform:none;color:${titleColor};--gravisain-highlight-color:#2563eb;background-image:none;-webkit-background-clip:border-box;background-clip:border-box`;

			// Extract outer div style from innerHtml
			const styleMatch = innerHtml.match(/<div class="[^"]*" style="([^"]*)">/);
			const outerStyle = styleMatch ? styleMatch[1] : '';

			const alignClass = align === 'center' ? 'has-text-align-center' : (align === 'right' ? 'has-text-align-right' : 'has-text-align-left');

			let rendered = `<div class="gravisain-advanced-heading ${alignClass}" style="${outerStyle}">`;
			if (eyebrow) {
				rendered += `<span class="gravisain-heading-eyebrow">${eyebrow}</span>`;
			}
			rendered += `<${tag} class="gravisain-heading-title" style="${headingStyle}">${content}</${tag}>`;
			if (desc) {
				rendered += `<p class="gravisain-heading-description">${desc}</p>`;
			}
			rendered += `</div>`;

			return `<!-- wp:gravisain/advanced-heading ${JSON.stringify(attrs)} -->\n\t\t${rendered}\n\t\t<!-- /wp:gravisain/advanced-heading -->`;
		}
	);

	// 5. Normalize row-layout gap and compensation
	output = output.replace(
		/<!-- wp:gravisain\/row-layout (\{.*?\}) -->\s*<div\s+([^>]*?)style="([^"]*)"([^>]*)><div class="gravisain-row-layout-inner">/g,
		(match, attrsStr, beforeStyle, styleStr, afterStyle) => {
			let attrs = {};
			try { attrs = JSON.parse(attrsStr); } catch (e) {}
			const cols = attrs.columns || 1;
			const rGap = attrs.rowGap || attrs.gap || 30;

			let styles = styleStr.split(';').map(s => s.trim()).filter(Boolean);
			let styleMap = {};
			styles.forEach(s => {
				const idx = s.indexOf(':');
				if (idx > -1) {
					styleMap[s.substring(0, idx).trim()] = s.substring(idx + 1).trim();
				}
			});

			// Ensure grid template
			if (!styleMap['--gravisain-grid-template']) {
				styleMap['--gravisain-grid-template'] = cols === 1 ? '1fr' : (cols === 2 ? '1fr 1fr' : '1fr 1fr 1fr');
			}
			// Ensure row gap
			if (!styleMap['--gravisain-row-gap']) {
				styleMap['--gravisain-row-gap'] = `${rGap}px`;
			}
			// Ensure gap compensation
			if (!styleMap['--gravisain-gap-compensation']) {
				styleMap['--gravisain-gap-compensation'] = cols > 1 ? `calc(${rGap}px * ${cols - 1} / ${cols})` : '0px';
			}

			// Reconstruct style string
			const newStyle = Object.entries(styleMap).map(([k, v]) => `${k}:${v}`).join(';');
			return `<!-- wp:gravisain/row-layout ${attrsStr} -->\n<div ${beforeStyle}style="${newStyle}"${afterStyle}><div class="gravisain-row-layout-inner">`;
		}
	);

	return output;
}

// Process all HTML files in starter-templates/fintech
const fintechDir = 'd:/VS CODE GRAVISAIN/starter-templates/fintech';
const files = fs.readdirSync(fintechDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
	const filePath = path.join(fintechDir, file);
	const content = fs.readFileSync(filePath, 'utf8');
	const normalized = normalizeFintechHtml(content);
	fs.writeFileSync(filePath, normalized, 'utf8');
	console.log(`Normalized: ${file}`);
});
