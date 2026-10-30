<?php
/**
 * Advanced Heading Block – Server-Side Renderer
 *
 * Using render.php bypasses wp_kses filtering on the style attribute,
 * which would otherwise strip out CSS custom properties (--gravisain-*).
 *
 * @package Gravisain\Blocks
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML (unused for this leaf block).
 * @var WP_Block $block      Block object.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound

// ── Helper functions ────────────────────────────────────────────────────────

/**
 * Sanitize an arbitrary CSS property value to prevent CSS declaration injection.
 */
$sanitize_css_value = function ( $val ): ?string {
	if ( $val === null || $val === '' || $val === false ) {
		return null;
	}
	$val = trim( (string) $val );
	$val = preg_replace( '/[;{}<>"\'\\\\]/', '', $val );
	return trim( $val ) !== '' ? trim( $val ) : null;
};

/**
 * Extract a spacing value (supports object with sides or a flat scalar).
 */
$get_spacing = function ( $spacing, string $side ) use ( $sanitize_css_value ): ?string {
	if ( $spacing === null || $spacing === '' || $spacing === false ) {
		return null;
	}

	if ( is_string( $spacing ) || is_numeric( $spacing ) ) {
		$res = is_numeric( $spacing ) ? $spacing . 'px' : (string) $spacing;
		return $sanitize_css_value( $res );
	}
	if ( is_array( $spacing ) ) {
		$val = $spacing[ $side ] ?? null;
		if ( is_numeric( $val ) ) {
			return $val . 'px';
		}
		return $sanitize_css_value( $val );
	}
	return null;
};

/**
 * Convert a typography value to a CSS string.
 *
 * @param mixed $val       Raw value.
 * @param bool  $is_size   True ⇒ append "px" for bare numbers.
 */
$get_typo_var = function ( $val, bool $is_size = false ) use ( $sanitize_css_value ): ?string {
	if ( $val === null || $val === '' || $val === false ) {
		return null;
	}
	if ( is_numeric( $val ) ) {
		return $is_size ? $val . 'px' : (string) $val;
	}
	if ( is_string( $val ) ) {
		if ( $is_size && is_numeric( $val ) ) {
			return $val . 'px';
		}
		return $sanitize_css_value( $val );
	}
	return null;
};

/**
 * Sanitize font weight to only allow numeric 100-900 or valid CSS keywords.
 */
$sanitize_font_weight = function ( $fw ): ?string {
	if ( empty( $fw ) ) {
		return null;
	}
	$fw = trim( (string) $fw );
	if ( preg_match( '/^(normal|bold|bolder|lighter|[1-9]00)$/i', $fw ) ) {
		return strtolower( $fw );
	}
	return null;
};

/**
 * Sanitize a CSS color value (hex, rgb/rgba, hsl/hsla, var(), or keyword).
 */
$sanitize_css_color = function ( $color ): ?string {
	if ( ! is_string( $color ) ) {
		return null;
	}
	$color = trim( $color );
	if ( '' === $color || false !== strpos( $color, 'gradient' ) ) {
		return null;
	}
	if ( preg_match( '/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/', $color ) ) {
		return $color;
	}
	if ( preg_match( '/^(rgba?|hsla?)\(\s*([0-9]{1,3}%?|[0-9]*\.?[0-9]+)\s*,\s*([0-9]{1,3}%?|[0-9]*\.?[0-9]+)\s*,\s*([0-9]{1,3}%?|[0-9]*\.?[0-9]+)(\s*,\s*([0-9]*\.?[0-9]+%?))?\s*\)$/i', $color ) ) {
		return $color;
	}
	if ( preg_match( '/^var\(--[a-zA-Z0-9_-]+\)$/', $color ) ) {
		return $color;
	}
	$named = array( 'transparent', 'currentcolor', 'inherit', 'initial', 'black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua', 'orange' );
	if ( in_array( strtolower( $color ), $named, true ) ) {
		return strtolower( $color );
	}
	return null;
};

/**
 * Sanitize a CSS gradient value to prevent declaration injection.
 */
$sanitize_css_gradient = function ( $gradient ): ?string {
	if ( ! is_string( $gradient ) ) {
		return null;
	}
	$gradient = trim( $gradient );
	if ( '' === $gradient ) {
		return null;
	}
	// Reject characters and expressions that permit declaration or script injection.
	if ( preg_match( '/[;{}<>"\'\\\\]|expression|javascript|url\s*\(/i', $gradient ) ) {
		return null;
	}
	// Must match valid gradient function pattern.
	if ( ! preg_match( '/^(repeating-)?(linear|radial|conic)-gradient\s*\([a-zA-Z0-9_#%,.\s()+-]+\)$/i', $gradient ) ) {
		return null;
	}
	// Ensure balanced parentheses.
	if ( substr_count( $gradient, '(' ) !== substr_count( $gradient, ')' ) ) {
		return null;
	}
	return $gradient;
};

// ── Attribute extraction ─────────────────────────────────────────────────────

$heading_tag    = $attributes['headingTag'] ?? 'h2';
$align          = $attributes['align'] ?? '';
$text_align     = $attributes['textAlign'] ?? 'left';
$text_align_tab = $attributes['textAlignTablet'] ?? '';
$text_align_mob = $attributes['textAlignMobile'] ?? '';
$eyebrow        = $attributes['eyebrow'] ?? '';
$eyebrow_pos    = $attributes['eyebrowPosition'] ?? 'above';
$eyebrow_color  = $sanitize_css_color( $attributes['eyebrowColor'] ?? '' );
$eyebrow_typo   = $attributes['eyebrowTypography'] ?? array();
$eyebrow_tab    = $attributes['eyebrowTypographyTablet'] ?? array();
$eyebrow_mob    = $attributes['eyebrowTypographyMobile'] ?? array();

$content     = $attributes['content'] ?? '';
$title_color = $sanitize_css_color( $attributes['titleColor'] ?? '' );
$title_typo  = $attributes['titleTypography'] ?? array();
$title_tab   = $attributes['titleTypographyTablet'] ?? array();
$title_mob   = $attributes['titleTypographyMobile'] ?? array();

$description = $attributes['description'] ?? '';
$desc_color  = $sanitize_css_color( $attributes['descriptionColor'] ?? '' );
$desc_typo   = $attributes['descriptionTypography'] ?? array();
$desc_tab    = $attributes['descriptionTypographyTablet'] ?? array();
$desc_mob    = $attributes['descriptionTypographyMobile'] ?? array();

$font_family     = $attributes['fontFamily'] ?? '';
$font_size       = $attributes['fontSize'] ?? 32;
$font_size_tab   = $attributes['fontSizeTablet'] ?? null;
$font_size_mob   = $attributes['fontSizeMobile'] ?? null;
$font_weight     = $sanitize_font_weight( $attributes['fontWeight'] ?? '800' ) ?: '800';
$line_height     = $attributes['lineHeight'] ?? '1.25';
$line_height_tab = $attributes['lineHeightTablet'] ?? null;
$line_height_mob = $attributes['lineHeightMobile'] ?? null;
$letter_spacing  = $attributes['letterSpacing'] ?? '0px';
$letter_sp_tab   = $attributes['letterSpacingTablet'] ?? null;
$letter_sp_mob   = $attributes['letterSpacingMobile'] ?? null;
$text_transform  = $attributes['textTransform'] ?? 'none';
$text_color      = $sanitize_css_color( $attributes['textColor'] ?? '' ) ?: '#0f172a';
$highlight_color = $sanitize_css_color( $attributes['highlightColor'] ?? '' ) ?: '#2563eb';
$enable_gradient = $attributes['enableTextGradient'] ?? false;
$text_gradient   = $attributes['textGradient'] ?? '';
$show_divider    = $attributes['showDivider'] ?? true;
$divider_width   = $attributes['dividerWidth'] ?? 48;
$divider_height  = $attributes['dividerHeight'] ?? 4;
$divider_color   = $sanitize_css_color( $attributes['dividerColor'] ?? '' ) ?: '#2563eb';
$divider_style   = $attributes['dividerStyle'] ?? 'solid';
$divider_flip    = $attributes['dividerFlip'] ?? false;
$divider_spacing = $attributes['dividerSpacing'] ?? 14;
$padding         = $attributes['padding'] ?? null;
$padding_tab     = $attributes['paddingTablet'] ?? null;
$padding_mob     = $attributes['paddingMobile'] ?? null;
$margin          = $attributes['margin'] ?? null;
$margin_tab      = $attributes['marginTablet'] ?? null;
$margin_mob      = $attributes['marginMobile'] ?? null;
$max_width       = $attributes['maxWidth'] ?? '100%';
$breakout        = $attributes['breakoutPadding'] ?? false;
$anchor          = $attributes['anchor'] ?? '';
$custom_class    = $attributes['customClassName'] ?? '';
$custom_css_raw  = $attributes['customCSS'] ?? '';

// ── Build CSS custom properties ──────────────────────────────────────────────

$css_vars = array();

// Spacing
$sides = array( 'top', 'right', 'bottom', 'left' );
foreach ( $sides as $side ) {
	$v = $get_spacing( $padding, $side );
	if ( $v ) {
		$css_vars[ "--gravisain-padding-{$side}" ] = $v;
	}
	$v = $get_spacing( $padding_tab, $side );
	if ( $v ) {
		$css_vars[ "--gravisain-padding-{$side}-tablet" ] = $v;
	}
	$v = $get_spacing( $padding_mob, $side );
	if ( $v ) {
		$css_vars[ "--gravisain-padding-{$side}-mobile" ] = $v;
	}
	$v = $get_spacing( $margin, $side );
	if ( $v ) {
		$css_vars[ "--gravisain-margin-{$side}" ] = $v;
	}
	$v = $get_spacing( $margin_tab, $side );
	if ( $v ) {
		$css_vars[ "--gravisain-margin-{$side}-tablet" ] = $v;
	}
	$v = $get_spacing( $margin_mob, $side );
	if ( $v ) {
		$css_vars[ "--gravisain-margin-{$side}-mobile" ] = $v;
	}
}

// Typography Helper
$format_font_family = function ( ?string $font ): ?string {
	if ( empty( $font ) || $font === 'inherit' ) {
		return null;
	}
	// Strip characters that could cause CSS injection.
	$font = preg_replace( '/[;{}<>"\'\\\\]/', '', (string) $font );
	$font = trim( $font );
	if ( empty( $font ) ) {
		return null;
	}
	if ( false !== strpos( $font, ',' ) ) {
		$parts = array_map(
			function ( $part ) {
				$part  = trim( $part );
				$lower = strtolower( $part );
				if ( in_array( $lower, array( 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace' ), true ) || 0 === strpos( $part, '-' ) || 0 === strpos( $lower, 'blink' ) ) {
						return esc_attr( $part );
				}
				return '"' . esc_attr( $part ) . '"';
			},
			explode( ',', $font )
		);
		return implode( ', ', $parts );
	}
	return '"' . esc_attr( $font ) . '", sans-serif';
};

$add_typo_vars = function ( string $prefix, $typo_obj, array $fallback = array() ) use ( &$css_vars, $format_font_family, $get_typo_var, $sanitize_font_weight ) {
	if ( ! is_array( $typo_obj ) ) {
		$typo_obj = array();
	}
	$font = $typo_obj['fontFamily'] ?? ( $fallback['fontFamily'] ?? null );
	$ff   = $format_font_family( $font );
	if ( $ff ) {
		$css_vars[ "--gravisain-heading-{$prefix}-ff" ] = $ff;
	}

	$fs = $typo_obj['fontSize'] ?? ( $fallback['fontSize'] ?? null );
	$v  = $get_typo_var( $fs, true );
	if ( $v ) {
		$css_vars[ "--gravisain-heading-{$prefix}-fs" ] = $v;
	}

	$fw = $typo_obj['fontWeight'] ?? ( $fallback['fontWeight'] ?? null );
	$fw = $sanitize_font_weight( $fw );
	if ( $fw ) {
		$css_vars[ "--gravisain-heading-{$prefix}-fw" ] = $fw;
	}

	$lh = $typo_obj['lineHeight'] ?? ( $fallback['lineHeight'] ?? null );
	$v  = $get_typo_var( $lh, false );
	if ( $v ) {
		$css_vars[ "--gravisain-heading-{$prefix}-lh" ] = $v;
	}

	$ls = $typo_obj['letterSpacing'] ?? ( $fallback['letterSpacing'] ?? null );
	$v  = $get_typo_var( $ls, true );
	if ( $v ) {
		$css_vars[ "--gravisain-heading-{$prefix}-ls" ] = $v;
	}
};

// Eyebrow
if ( ! empty( $eyebrow_color ) ) {
	$css_vars['--gravisain-heading-eyebrow-color'] = $eyebrow_color;
}
$add_typo_vars( 'eyebrow', $eyebrow_typo );
$add_typo_vars( 'eyebrow-tablet', $eyebrow_tab );
$add_typo_vars( 'eyebrow-mobile', $eyebrow_mob );

// Title
$final_title_color                           = ! empty( $title_color ) ? $title_color : ( $text_color ?: '#0f172a' );
$css_vars['--gravisain-heading-title-color'] = $final_title_color;

$add_typo_vars(
	'title',
	$title_typo,
	array(
		'fontFamily'    => $font_family,
		'fontSize'      => $font_size,
		'fontWeight'    => $font_weight,
		'lineHeight'    => $line_height,
		'letterSpacing' => $letter_spacing,
	)
);
$add_typo_vars(
	'title-tablet',
	$title_tab,
	array(
		'fontSize'      => $font_size_tab,
		'lineHeight'    => $line_height_tab,
		'letterSpacing' => $letter_sp_tab,
	)
);
$add_typo_vars(
	'title-mobile',
	$title_mob,
	array(
		'fontSize'      => $font_size_mob,
		'lineHeight'    => $line_height_mob,
		'letterSpacing' => $letter_sp_mob,
	)
);

// Description
if ( ! empty( $desc_color ) ) {
	$css_vars['--gravisain-heading-desc-color'] = $desc_color;
}
$add_typo_vars( 'desc', $desc_typo );
$add_typo_vars( 'desc-tablet', $desc_tab );
$add_typo_vars( 'desc-mobile', $desc_mob );

// Legacy fallbacks
$ff = $format_font_family( $font_family );
if ( $ff ) {
	$css_vars['--gravisain-ff'] = $ff;
}

$v = $get_typo_var( $font_size, true );
if ( $v ) {
	$css_vars['--gravisain-fs'] = $v;
}
$v = $get_typo_var( $font_size_tab, true );
if ( $v ) {
	$css_vars['--gravisain-fs-tablet'] = $v;
}
$v = $get_typo_var( $font_size_mob, true );
if ( $v ) {
	$css_vars['--gravisain-fs-mobile'] = $v;
}
$v = $get_typo_var( $line_height );
if ( $v ) {
	$css_vars['--gravisain-lh'] = $v;
}
$v = $get_typo_var( $line_height_tab );
if ( $v ) {
	$css_vars['--gravisain-lh-tablet'] = $v;
}
$v = $get_typo_var( $line_height_mob );
if ( $v ) {
	$css_vars['--gravisain-lh-mobile'] = $v;
}
$v = $get_typo_var( $letter_spacing, true );
if ( $v ) {
	$css_vars['--gravisain-ls'] = $v;
}
$v = $get_typo_var( $letter_sp_tab, true );
if ( $v ) {
	$css_vars['--gravisain-ls-tablet'] = $v;
}
$v = $get_typo_var( $letter_sp_mob, true );
if ( $v ) {
	$css_vars['--gravisain-ls-mobile'] = $v;
}

if ( $max_width && $max_width !== '100%' ) {
	$css_vars['max-width'] = esc_attr( $max_width );
}

// Build style string
$style_parts  = array_map(
	fn( $k, $v ) => esc_attr( $k ) . ':' . esc_attr( $v ),
	array_keys( $css_vars ),
	array_values( $css_vars )
);
$style_string = implode( ';', $style_parts );

// Explicit margin overrides (ensures left, right, top, bottom take effect reliably against Gutenberg layout constraints)
$m_top    = $css_vars['--gravisain-margin-top'] ?? null;
$m_bottom = $css_vars['--gravisain-margin-bottom'] ?? null;
$m_left   = $css_vars['--gravisain-margin-left'] ?? null;
$m_right  = $css_vars['--gravisain-margin-right'] ?? null;

if ( $m_top !== null && $m_top !== '' ) {
	$style_string .= ';margin-top:' . esc_attr( $m_top ) . ' !important;margin-block-start:' . esc_attr( $m_top ) . ' !important';
}
if ( $m_bottom !== null && $m_bottom !== '' ) {
	$style_string .= ';margin-bottom:' . esc_attr( $m_bottom ) . ' !important;margin-block-end:' . esc_attr( $m_bottom ) . ' !important';
}
if ( $align !== 'full' ) {
	if ( $m_left !== null && $m_left !== '' ) {
		$style_string .= ';margin-left:' . esc_attr( $m_left ) . ' !important';
	}
	if ( $m_right !== null && $m_right !== '' ) {
		$style_string .= ';margin-right:' . esc_attr( $m_right ) . ' !important';
	}
}

// Explicit padding overrides
$p_top    = $css_vars['--gravisain-padding-top'] ?? null;
$p_bottom = $css_vars['--gravisain-padding-bottom'] ?? null;
$p_left   = $css_vars['--gravisain-padding-left'] ?? null;
$p_right  = $css_vars['--gravisain-padding-right'] ?? null;

if ( $p_top !== null && $p_top !== '' ) {
	$style_string .= ';padding-top:' . esc_attr( $p_top ) . ' !important';
}
if ( $p_bottom !== null && $p_bottom !== '' ) {
	$style_string .= ';padding-bottom:' . esc_attr( $p_bottom ) . ' !important';
}
if ( $p_left !== null && $p_left !== '' ) {
	$style_string .= ';padding-left:' . esc_attr( $p_left ) . ' !important';
}
if ( $p_right !== null && $p_right !== '' ) {
	$style_string .= ';padding-right:' . esc_attr( $p_right ) . ' !important';
}

if ( $max_width && $align !== 'full' ) {
	$style_string .= ';max-width:' . esc_attr( $max_width ) . ' !important';
}

// ── CSS classes ───────────────────────────────────────────────────────────────

$classes = array(
	'gravisain-advanced-heading',
	'has-text-align-' . $text_align,
);
if ( $align ) {
	$classes[] = 'align' . $align;
}
if ( $text_align_tab ) {
	$classes[] = 'has-tablet-text-align-' . $text_align_tab;
}
if ( $text_align_mob ) {
	$classes[] = 'has-mobile-text-align-' . $text_align_mob;
}
if ( $breakout ) {
	$classes[] = 'has-breakout-padding';
}
if ( $custom_class ) {
	$classes[] = $custom_class;
}

$class_string = implode( ' ', array_map( 'esc_attr', $classes ) );

// ── Heading inner style ───────────────────────────────────────────────────────

$heading_style_parts   = array();
$heading_style_parts[] = 'text-align:' . esc_attr( $text_align );
$heading_style_parts[] = 'font-weight:' . esc_attr( $font_weight ?: '800' );
$heading_style_parts[] = 'text-transform:' . esc_attr( $text_transform ?: 'none' );

$sanitized_text_gradient = ( $enable_gradient && $text_gradient ) ? $sanitize_css_gradient( $text_gradient ) : null;
if ( $sanitized_text_gradient ) {
	$heading_style_parts[] = 'color:transparent';
	$heading_style_parts[] = 'background-image:' . $sanitized_text_gradient;
	$heading_style_parts[] = '-webkit-background-clip:text';
	$heading_style_parts[] = 'background-clip:text';
} else {
	$heading_style_parts[] = 'color:' . esc_attr( $final_title_color );
	$heading_style_parts[] = 'background-image:none';
}

$heading_style_parts[] = '--gravisain-highlight-color:' . esc_attr( $highlight_color ?: '#2563eb' );
$heading_style_string  = implode( ';', $heading_style_parts );

$tag_name = in_array( $heading_tag, array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ), true ) ? $heading_tag : 'h2';

// ── ID attribute ──────────────────────────────────────────────────────────────

$id_attr = $anchor ? 'id="' . esc_attr( $anchor ) . '"' : '';

?>
<div class="<?php echo esc_attr( $class_string ); ?>" style="<?php echo esc_attr( $style_string ); ?>" <?php echo $anchor ? 'id="' . esc_attr( $anchor ) . '"' : ''; ?>>

	<?php if ( $eyebrow && $eyebrow_pos === 'above' ) : ?>
		<span class="gravisain-heading-eyebrow"><?php echo wp_kses_post( $eyebrow ); ?></span>
	<?php endif; ?>

	<<?php echo esc_attr( $tag_name ); ?>
		class="gravisain-heading-title"
		style="<?php echo esc_attr( $heading_style_string ); ?>"
	><?php echo wp_kses_post( $content ); ?></<?php echo esc_attr( $tag_name ); ?>>

	<?php if ( $eyebrow && $eyebrow_pos === 'below' ) : ?>
		<span class="gravisain-heading-eyebrow below"><?php echo wp_kses_post( $eyebrow ); ?></span>
	<?php endif; ?>

	<?php
	if ( $show_divider ) :
		$d_margin_left  = in_array( $text_align, array( 'center', 'right' ), true ) ? 'auto' : '0';
		$d_margin_right = $text_align === 'center' ? 'auto' : '0';
		$d_margin_top   = ( $divider_spacing !== 14 ) ? 'margin-top: ' . absint( $divider_spacing ) . 'px;' : '';
		$d_width        = absint( $divider_width ?: 48 );
		$d_height       = absint( $divider_height ?: 4 );
		$d_color        = esc_attr( $divider_color ?: '#2563eb' );
		$d_flip_style   = $divider_flip ? 'transform: scaleX(-1); transform-origin: center center;' : '';

		if ( 'solid' === $divider_style ) :
			?>
			<div
				class="gravisain-heading-divider is-style-solid"
				style="
					width: <?php echo esc_attr( $d_width ); ?>px;
					height: <?php echo esc_attr( $d_height ); ?>px;
					background-color: <?php echo esc_attr( $d_color ); ?>;
					margin-left: <?php echo esc_attr( $d_margin_left ); ?>;
					margin-right: <?php echo esc_attr( $d_margin_right ); ?>;
					<?php echo esc_attr( $d_margin_top ); ?>
				"
			></div>
			<?php
		elseif ( 'double' === $divider_style ) :
			$border_thick = max( 1, (int) floor( $d_height / 3 ) );
			?>
			<div
				class="gravisain-heading-divider is-style-double"
				style="
					width: <?php echo esc_attr( $d_width ); ?>px;
					height: <?php echo esc_attr( $d_height ); ?>px;
					border-top: <?php echo esc_attr( $border_thick ); ?>px solid <?php echo esc_attr( $d_color ); ?>;
					border-bottom: <?php echo esc_attr( $border_thick ); ?>px solid <?php echo esc_attr( $d_color ); ?>;
					background: transparent;
					margin-left: <?php echo esc_attr( $d_margin_left ); ?>;
					margin-right: <?php echo esc_attr( $d_margin_right ); ?>;
					<?php echo esc_attr( $d_margin_top ); ?>
				"
			></div>
		<?php elseif ( 'dotted' === $divider_style ) : ?>
			<div
				class="gravisain-heading-divider is-style-dotted"
				style="
					width: <?php echo esc_attr( $d_width ); ?>px;
					height: 0px;
					border-top: <?php echo esc_attr( $d_height ); ?>px dotted <?php echo esc_attr( $d_color ); ?>;
					background: transparent;
					margin-left: <?php echo esc_attr( $d_margin_left ); ?>;
					margin-right: <?php echo esc_attr( $d_margin_right ); ?>;
					<?php echo esc_attr( $d_margin_top ); ?>
				"
			></div>
		<?php elseif ( 'dashed' === $divider_style ) : ?>
			<div
				class="gravisain-heading-divider is-style-dashed"
				style="
					width: <?php echo esc_attr( $d_width ); ?>px;
					height: 0px;
					border-top: <?php echo esc_attr( $d_height ); ?>px dashed <?php echo esc_attr( $d_color ); ?>;
					background: transparent;
					margin-left: <?php echo esc_attr( $d_margin_left ); ?>;
					margin-right: <?php echo esc_attr( $d_margin_right ); ?>;
					<?php echo esc_attr( $d_margin_top ); ?>
				"
			></div>
			<?php
		else :
			$view_box  = '0 0 500 20';
			$svg_inner = '';
			$stroke_w  = max( 2, min( $d_height, 8 ) );

			switch ( $divider_style ) {
				case 'brush':
					$view_box  = '0 0 500 20';
					$svg_inner = '<path d="M 2 13 C 35 9 95 4.5 210 4.5 C 315 4.5 410 7 498 9.5 C 440 12 340 15 220 15.5 C 110 16 45 15.5 2 13 Z" fill="' . $d_color . '" />';
					break;
				case 'brush-swoop':
					$view_box  = '0 0 500 24';
					$svg_inner = '<path d="M 3 6 C 70 12 160 17 260 16 C 350 15 430 11 497 4 C 440 12 350 20 250 20 C 150 20 65 14 3 6 Z" fill="' . $d_color . '" />';
					break;
				case 'curved':
					$view_box  = '0 0 500 20';
					$svg_inner = '<path d="M 2 16 C 140 4 360 4 498 16 C 360 6.5 140 6.5 2 16 Z" fill="' . $d_color . '" />';
					break;
				case 'wave':
					$view_box  = '0 0 500 20';
					$svg_inner = '<path d="M 0 10 Q 25 1 50 10 T 100 10 T 150 10 T 200 10 T 250 10 T 300 10 T 350 10 T 400 10 T 450 10 T 500 10" fill="none" stroke="' . $d_color . '" stroke-width="' . $stroke_w . '" stroke-linecap="round" stroke-linejoin="round" />';
					break;
				case 'zigzag':
					$view_box  = '0 0 500 20';
					$svg_inner = '<path d="M 0 10 L 25 2 L 50 18 L 75 2 L 100 18 L 125 2 L 150 18 L 175 2 L 200 18 L 225 2 L 250 18 L 275 2 L 300 18 L 325 2 L 350 18 L 375 2 L 400 18 L 425 2 L 450 18 L 475 2 L 500 10" fill="none" stroke="' . $d_color . '" stroke-width="' . $stroke_w . '" stroke-linecap="round" stroke-linejoin="round" />';
					break;
				default:
					$view_box  = '0 0 500 20';
					$svg_inner = '<path d="M 2 13 C 35 9 95 4.5 210 4.5 C 315 4.5 410 7 498 9.5 C 440 12 340 15 220 15.5 C 110 16 45 15.5 2 13 Z" fill="' . $d_color . '" />';
					break;
			}
			?>
			<div
				class="gravisain-heading-divider is-style-<?php echo esc_attr( $divider_style ); ?>"
				style="
					width: <?php echo esc_attr( $d_width ); ?>px;
					height: <?php echo esc_attr( $d_height ); ?>px;
					background: transparent;
					line-height: 0;
					margin-left: <?php echo esc_attr( $d_margin_left ); ?>;
					margin-right: <?php echo esc_attr( $d_margin_right ); ?>;
					<?php echo esc_attr( $d_margin_top ); ?>
				"
			>
				<svg
					class="gravisain-divider-svg"
					viewBox="<?php echo esc_attr( $view_box ); ?>"
					preserveAspectRatio="none"
					style="width: 100%; height: 100%; display: block; overflow: visible; <?php echo esc_attr( $d_flip_style ); ?>"
					aria-hidden="true"
					focusable="false"
				>
					<?php echo $svg_inner; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</svg>
			</div>
		<?php endif; ?>
	<?php endif; ?>

	<?php if ( ! empty( $description ) ) : ?>
		<p class="gravisain-heading-description"><?php echo wp_kses_post( $description ); ?></p>
	<?php endif; ?>

</div>
