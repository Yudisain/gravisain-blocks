import { renderToString } from 'react-dom/server';
import React from 'react';

// Mock WP globals
global.wp = {
	element: require('@wordpress/element'),
	blockEditor: {
		useBlockProps: {
			save: (props) => props
		},
		RichText: {
			Content: ({ tagName: Tag = 'div', className, style, value }) => (
				<Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: value }} />
			)
		},
		InnerBlocks: {
			Content: () => <div className="inner-blocks-mock" />
		}
	}
};

import saveRowLayout from './row-layout/save';

const attributesHero = {"align":"full","columns":2,"layoutPreset":"50-50","alignItems":"center","padding":{"top":"10rem","right":"5%","bottom":"10rem","left":"5%"},"backgroundColor":"#000000","backgroundImage":{"url":"https://s.w.org/images/core/5.8/sea.jpg?v=hero"},"backgroundAttachment":"fixed","backgroundOverlay":"#000000","backgroundOverlayOpacity":20,"stackOn":"tablet"};

console.log(renderToString(saveRowLayout({ attributes: attributesHero })));
