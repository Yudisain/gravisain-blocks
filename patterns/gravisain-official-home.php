<?php
/**
 * Pattern: Undagital x Gravisain Official Architectural Landing Page
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_official_content = PatternRegistry::get_template_content( 'gravisain-official' );
if ( empty( $gravisain_official_content ) ) {
	return [];
}

return [
	'slug'        => 'gravisain-blocks/gravisain-official-home',
	'title'       => __( 'Gravisain Official — Architectural Ecosystem Homepage', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ],
	'description' => __( 'The official high-performance architectural landing page for Undagital x Gravisain built 100% with native Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_official_content,
];
