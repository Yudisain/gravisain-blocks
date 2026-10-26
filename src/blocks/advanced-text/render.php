<?php
/**
 * Advanced Text Block – Server-Side Renderer
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
$sanitize_css_value = function( $val ): ?string {
	if ( $val === null || $val === '' || $val === false ) {
		return null;
	}
	$val = trim( (string) $val );
	$val = preg_replace( '/[;{}<>"\'\\\\]/', '', $val );
	return trim( $val ) !== '' ? trim( $val ) : null;
};

$get_spacing = function( $spacing, string $side ) use ( $sanitize_css_value ): ?string {
	if ( $spacing === null || $spacing === '' || $spacing === false ) return null;
	if ( is_string( $spacing ) || is_numeric( $spacing ) ) {
		$res = is_numeric( $spacing ) ? $spacing . 'px' : (string) $spacing;
		return $sanitize_css_value( $res );
	}
	if ( is_array( $spacing ) ) {
		$val = $spacing[ $side ] ?? null;
		if ( is_numeric( $val ) ) return $val . 'px';
		return $sanitize_css_value( $val );
	}
	return null;
};

$get_typo_var = function( $val, bool $is_size = false ) use ( $sanitize_css_value ): ?string {
	if ( $val === null || $val === '' || $val === false ) return null;
	if ( is_numeric( $val ) ) return $is_size ? $val . 'px' : (string) $val;
	if ( is_string( $val ) ) {
		if ( $is_size && is_numeric( $val ) ) return $val . 'px';
		return $sanitize_css_value( $val );
	}
	return null;
};

/**
 * Sanitize font weight to only allow numeric 100-900 or valid CSS keywords.
 */
$sanitize_font_weight = function( $fw ): ?string {
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
$sanitize_css_color = function( $color ): ?string {
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
	$named = [ 'transparent', 'currentcolor', 'inherit', 'initial', 'black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua', 'orange' ];
	if ( in_array( strtolower( $color ), $named, true ) ) {
		return strtolower( $color );
	}
	return null;
};

/**
 * Sanitize a CSS gradient value to prevent declaration injection.
 */
$sanitize_css_gradient = function( $gradient ): ?string {
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

// ── Attributes ───────────────────────────────────────────────────────────────

$html_tag       = $attributes['htmlTag']              ?? 'p';
$content        = $attributes['content']              ?? '';
$text_align     = $attributes['textAlign']            ?? 'left';
$text_align_tab = $attributes['textAlignTablet']      ?? '';
$text_align_mob = $attributes['textAlignMobile']      ?? '';
$font_family    = $attributes['fontFamily']           ?? '';
$font_size      = $attributes['fontSize']             ?? 16;
$font_size_tab  = $attributes['fontSizeTablet']       ?? null;
$font_size_mob  = $attributes['fontSizeMobile']       ?? null;
$font_weight    = $sanitize_font_weight( $attributes['fontWeight'] ?? '400' ) ?: '400';
$line_height    = $attributes['lineHeight']           ?? '1.5';
$line_ht_tab    = $attributes['lineHeightTablet']     ?? null;
$line_ht_mob    = $attributes['lineHeightMobile']     ?? null;
$letter_sp      = $attributes['letterSpacing']        ?? '0px';
$letter_sp_tab  = $attributes['letterSpacingTablet']  ?? null;
$letter_sp_mob  = $attributes['letterSpacingMobile']  ?? null;
$text_transform = $attributes['textTransform']        ?? 'none';
$text_color     = $sanitize_css_color( $attributes['textColor'] ?? '' ) ?: '#334155';
$highlight_clr  = $sanitize_css_color( $attributes['highlightColor'] ?? '' ) ?: '#2563eb';
$enable_grad    = $attributes['enableTextGradient']   ?? false;
$text_gradient  = $attributes['textGradient']         ?? '';
$padding        = $attributes['padding']              ?? null;
$padding_tab    = $attributes['paddingTablet']        ?? null;
$padding_mob    = $attributes['paddingMobile']        ?? null;
$margin         = $attributes['margin']               ?? null;
$margin_tab     = $attributes['marginTablet']         ?? null;
$margin_mob     = $attributes['marginMobile']         ?? null;
$anchor         = $attributes['anchor']               ?? '';
$custom_class   = $attributes['customClassName']      ?? '';

// ── Build outer CSS custom properties ────────────────────────────────────────

$css_vars = [];
$sides = [ 'top', 'right', 'bottom', 'left' ];
foreach ( $sides as $side ) {
	$v = $get_spacing( $padding, $side );     if ( $v ) $css_vars[ "--gravisain-padding-{$side}" ]        = $v;
	$v = $get_spacing( $padding_tab, $side ); if ( $v ) $css_vars[ "--gravisain-padding-{$side}-tablet" ] = $v;
	$v = $get_spacing( $padding_mob, $side ); if ( $v ) $css_vars[ "--gravisain-padding-{$side}-mobile" ] = $v;
	$v = $get_spacing( $margin, $side );      if ( $v ) $css_vars[ "--gravisain-margin-{$side}" ]         = $v;
	$v = $get_spacing( $margin_tab, $side );  if ( $v ) $css_vars[ "--gravisain-margin-{$side}-tablet" ]  = $v;
	$v = $get_spacing( $margin_mob, $side );  if ( $v ) $css_vars[ "--gravisain-margin-{$side}-mobile" ]  = $v;
}

$format_font_family = function( ?string $font ): ?string {
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
		$parts = array_map( function( $part ) {
			$part  = trim( $part );
			$lower = strtolower( $part );
			if ( in_array( $lower, [ 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace' ], true ) || 0 === strpos( $part, '-' ) || 0 === strpos( $lower, 'blink' ) ) {
				return esc_attr( $part );
			}
			return '"' . esc_attr( $part ) . '"';
		}, explode( ',', $font ) );
		return implode( ', ', $parts );
	}
	return '"' . esc_attr( $font ) . '", sans-serif';
};

$ff = $format_font_family( $font_family );
if ( $ff ) $css_vars['--gravisain-ff'] = $ff;

$v = $get_typo_var( $font_size, true );  if ( $v ) $css_vars['--gravisain-fs']       = $v;
$v = $get_typo_var( $font_size_tab, true ); if ( $v ) $css_vars['--gravisain-fs-tablet'] = $v;
$v = $get_typo_var( $font_size_mob, true ); if ( $v ) $css_vars['--gravisain-fs-mobile'] = $v;
$v = $get_typo_var( $line_height );     if ( $v ) $css_vars['--gravisain-lh']       = $v;
$v = $get_typo_var( $line_ht_tab );     if ( $v ) $css_vars['--gravisain-lh-tablet'] = $v;
$v = $get_typo_var( $line_ht_mob );     if ( $v ) $css_vars['--gravisain-lh-mobile'] = $v;
$v = $get_typo_var( $letter_sp, true ); if ( $v ) $css_vars['--gravisain-ls']       = $v;
$v = $get_typo_var( $letter_sp_tab, true ); if ( $v ) $css_vars['--gravisain-ls-tablet'] = $v;
$v = $get_typo_var( $letter_sp_mob, true ); if ( $v ) $css_vars['--gravisain-ls-mobile'] = $v;

$outer_style = implode( ';', array_map(
	fn( $k, $v ) => esc_attr( $k ) . ':' . esc_attr( $v ),
	array_keys( $css_vars ),
	array_values( $css_vars )
) );

// Explicit margin overrides (ensures left, right, top, bottom take effect reliably against Gutenberg layout constraints)
$m_top    = $css_vars['--gravisain-margin-top'] ?? null;
$m_bottom = $css_vars['--gravisain-margin-bottom'] ?? null;
$m_left   = $css_vars['--gravisain-margin-left'] ?? null;
$m_right  = $css_vars['--gravisain-margin-right'] ?? null;

if ( $m_top !== null && $m_top !== '' ) {
	$outer_style .= ';margin-top:' . esc_attr( $m_top ) . ' !important;margin-block-start:' . esc_attr( $m_top ) . ' !important';
}
if ( $m_bottom !== null && $m_bottom !== '' ) {
	$outer_style .= ';margin-bottom:' . esc_attr( $m_bottom ) . ' !important;margin-block-end:' . esc_attr( $m_bottom ) . ' !important';
}
if ( $m_left !== null && $m_left !== '' ) {
	$outer_style .= ';margin-left:' . esc_attr( $m_left ) . ' !important';
}
if ( $m_right !== null && $m_right !== '' ) {
	$outer_style .= ';margin-right:' . esc_attr( $m_right ) . ' !important';
}

// Explicit padding overrides
$p_top    = $css_vars['--gravisain-padding-top'] ?? null;
$p_bottom = $css_vars['--gravisain-padding-bottom'] ?? null;
$p_left   = $css_vars['--gravisain-padding-left'] ?? null;
$p_right  = $css_vars['--gravisain-padding-right'] ?? null;

if ( $p_top !== null && $p_top !== '' ) {
	$outer_style .= ';padding-top:' . esc_attr( $p_top ) . ' !important';
}
if ( $p_bottom !== null && $p_bottom !== '' ) {
	$outer_style .= ';padding-bottom:' . esc_attr( $p_bottom ) . ' !important';
}
if ( $p_left !== null && $p_left !== '' ) {
	$outer_style .= ';padding-left:' . esc_attr( $p_left ) . ' !important';
}
if ( $p_right !== null && $p_right !== '' ) {
	$outer_style .= ';padding-right:' . esc_attr( $p_right ) . ' !important';
}

// ── Inner (text element) style ────────────────────────────────────────────────

$inner_parts = [];
$inner_parts[] = 'text-align:' . esc_attr( $text_align );
$inner_parts[] = 'font-weight:' . esc_attr( $font_weight ?: '400' );
$inner_parts[] = 'text-transform:' . esc_attr( $text_transform ?: 'none' );
$inner_parts[] = '--gravisain-highlight-color:' . esc_attr( $highlight_clr );

$sanitized_text_gradient = ( $enable_grad && $text_gradient ) ? $sanitize_css_gradient( $text_gradient ) : null;
if ( $sanitized_text_gradient ) {
	$inner_parts[] = 'color:transparent';
	$inner_parts[] = 'background-image:' . $sanitized_text_gradient;
	$inner_parts[] = '-webkit-background-clip:text';
	$inner_parts[] = 'background-clip:text';
} else {
	$inner_parts[] = 'color:' . esc_attr( $text_color ?: '#334155' );
	$inner_parts[] = 'background-image:none';
}

$inner_style = implode( ';', $inner_parts );

// ── Classes ───────────────────────────────────────────────────────────────────

$classes = [ 'gravisain-advanced-text', 'has-text-align-' . $text_align ];
if ( $text_align_tab ) $classes[] = 'has-tablet-text-align-' . $text_align_tab;
if ( $text_align_mob ) $classes[] = 'has-mobile-text-align-' . $text_align_mob;
if ( $custom_class )   $classes[] = $custom_class;
$class_string = implode( ' ', array_map( 'esc_attr', $classes ) );

$allowed_tags = [ 'p','h1','h2','h3','h4','h5','h6','div','span' ];
$tag = in_array( $html_tag, $allowed_tags, true ) ? $html_tag : 'p';

$id_attr = $anchor ? 'id="' . esc_attr( $anchor ) . '"' : '';
?>
<div class="<?php echo esc_attr( $class_string ); ?>" style="<?php echo esc_attr( $outer_style ); ?>" <?php echo $anchor ? 'id="' . esc_attr( $anchor ) . '"' : ''; ?>>
	<<?php echo esc_attr( $tag ); ?> class="gravisain-text-content" style="<?php echo esc_attr( $inner_style ); ?>"><?php echo wp_kses_post( $content ); ?></<?php echo esc_attr( $tag ); ?>>
</div>
