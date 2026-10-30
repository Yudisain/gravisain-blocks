<?php
/**
 * Pattern: Corporate Law Firm & Legal Advisors - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_law_content = PatternRegistry::get_template_content( 'law-firm' );
if ( empty( $gravisain_blocks_law_content ) ) {
	return array();
}

return array(
	'slug'        => 'gravisain-blocks/law-firm-home',
	'title'       => __( 'Corporate Law Firm & Legal Advisors — Full Homepage', 'gravisain-blocks' ),
	'categories'  => array( 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ),
	'description' => __( 'An authoritative, distinguished legal defense and corporate law firm homepage built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_law_content,
);
