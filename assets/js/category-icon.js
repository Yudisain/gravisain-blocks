/**
 * Gravisain Blocks - Category Header Icon Injector & Alphabetical Sorter
 *
 * 1. Automatically injects ONE geometric SVG icon next to the "GRAVISAIN BLOCKS" category header.
 * 2. Automatically sorts all blocks under "GRAVISAIN BLOCKS" (both Free & Pro) alphabetically (A-Z).
 */
(function () {
	'use strict';

	function injectGravisainCategoryIcon() {
		const headers = document.querySelectorAll('.block-editor-inserter__panel-header');
		headers.forEach((header) => {
			const text = header.textContent || '';
			if (text.includes('GRAVISAIN') || text.includes('Gravisain')) {
				// Prevent duplicate icon wrappers
				const existingWrappers = header.querySelectorAll('.gravisain-cat-icon-wrapper');
				if (existingWrappers.length > 1) {
					for (let i = 1; i < existingWrappers.length; i++) {
						existingWrappers[i].remove();
					}
				}
				if (existingWrappers.length === 0) {
					const iconWrap = document.createElement('span');
					iconWrap.className = 'gravisain-cat-icon-wrapper';
					iconWrap.style.display = 'inline-flex';
					iconWrap.style.alignItems = 'center';
					iconWrap.style.marginLeft = '8px';
					iconWrap.innerHTML =
						'<svg class="gravisain-custom-cat-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="26" height="26" fill="none" stroke="#4f46e5" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"><rect x="42" y="42" width="428" height="428" rx="60" stroke-width="24"/><path d="M256 65 L420 217"/><path d="M256 65 L92 209"/><path d="M92 305 L256 447"/><path d="M420 305 L256 447"/><path d="M92 209 L256 353"/><path d="M160 222 H420"/><path d="M256 222 V347"/><path d="M275 222 L385 335"/></svg>';
					header.appendChild(iconWrap);
				}
			}
		});
	}

	function getItemTitle(el) {
		const titleEl = el.querySelector(
			'.block-editor-block-types-list__item-title, .block-editor-block-card__title, .components-truncate, button span, span'
		);
		if (titleEl && titleEl.textContent) {
			return titleEl.textContent.trim();
		}
		return el.textContent ? el.textContent.trim() : '';
	}

	function sortGravisainBlocksAlphabetically() {
		// Find all block list containers in inserter
		const lists = document.querySelectorAll(
			'.block-editor-inserter__panel .block-editor-block-types-list, .block-editor-inserter__panel-content .block-editor-block-types-list, .block-editor-block-types-list'
		);

		lists.forEach((list) => {
			// Find closest parent panel
			const panel = list.closest('.block-editor-inserter__panel, .block-editor-inserter__panel-content');
			if (!panel) return;

			const header = panel.querySelector('.block-editor-inserter__panel-header');
			if (!header) return;

			const text = header.textContent || '';
			if (!text.includes('GRAVISAIN') && !text.includes('Gravisain')) {
				return;
			}

			if (list.children.length > 1) {
				const items = Array.from(list.children);
				let needsSort = false;

				for (let i = 0; i < items.length - 1; i++) {
					const titleA = getItemTitle(items[i]);
					const titleB = getItemTitle(items[i + 1]);
					if (titleA.localeCompare(titleB, undefined, { sensitivity: 'base', numeric: true }) > 0) {
						needsSort = true;
						break;
					}
				}

				if (needsSort) {
					items.sort((a, b) => {
						const titleA = getItemTitle(a);
						const titleB = getItemTitle(b);
						return titleA.localeCompare(titleB, undefined, { sensitivity: 'base', numeric: true });
					});
					items.forEach((item) => list.appendChild(item));
				}
			}
		});
	}

	function handleInserterUpdates() {
		injectGravisainCategoryIcon();
		sortGravisainBlocksAlphabetically();
	}

	// Observe DOM mutations when Gutenberg Block Inserter (+) panel opens or updates
	const observer = new MutationObserver(() => {
		handleInserterUpdates();
	});

	if (typeof document !== 'undefined') {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', () => {
				observer.observe(document.body, { childList: true, subtree: true });
			});
		} else {
			observer.observe(document.body, { childList: true, subtree: true });
		}
	}
})();
