<?php
/**
 * Plugin Name: CMS Federation for Apollo
 * Description: Enables Apollo Federation v2 support and maps User entities for the TechLead blog.
 * Version: 1.0
 */

add_action('graphql_register_types', function() {
    
    // 1. Extend the User type as an external entity
    register_graphql_type('User', [
        'description' => 'A federated user entity from the users-subgraph',
        'interfaces'  => ['Node'],
        'fields'      => [
            'id' => [ 'type' => 'ID' ],
        ],
        // Federation v2 key
        'federation' => [
            'keys' => [
                [ 'fields' => 'id' ]
            ],
            'extends' => true,
        ],
    ]);

    // 2. Ensure Post is an entity
    register_graphql_field('Post', 'id', [
        'type' => 'ID',
        'resolve' => function($post) {
            return $post->ID;
        }
    ]);

    // Note: The wp-graphql-federations plugin usually handles the _service query
    // and the @key directive for registered types.
});

// Map the WordPress Author ID to the Federated User ID
add_filter('graphql_post_object_author_response', function($author, $post) {
    // In our architecture, the WordPress User ID is the same as the Postgres User ID (or we map it)
    // For simplicity, we assume they match or we return the WP ID as the federated ID.
    return $author;
}, 10, 2);
