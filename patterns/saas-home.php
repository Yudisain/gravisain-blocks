<?php
/**
 * Pattern: AI-Powered B2B SaaS Platform - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_saas_content = PatternRegistry::get_template_content( 'saas' );
if ( empty( $gravisain_blocks_saas_content ) ) {
	return array();
}

return array(
	'slug'        => 'gravisain-blocks/saas-home',
	'title'       => __( 'B2B SaaS & AI Platform — Full Homepage', 'gravisain-blocks' ),
	'categories'  => array( 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ),
	'description' => __( 'A sleek dark-mode modern software-as-a-service homepage template built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_saas_content,
);
