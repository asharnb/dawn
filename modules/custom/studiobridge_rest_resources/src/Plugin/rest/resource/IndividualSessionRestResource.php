<?php

/**
 * @file
 * Contains \Drupal\studiobridge_rest_resources\Plugin\rest\resource\studiobridge_rest_resources.
 *
 * @author KrishnaKanth
 */

namespace Drupal\studiobridge_rest_resources\Plugin\rest\resource;

use Drupal\Core\Session\AccountProxyInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Psr\Log\LoggerInterface;
use \Drupal\node\Entity\Node;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


/**
 * Provides a resource to get view modes by entity and bundle.
 *
 * @RestResource(
 *   id = "individual_session_rest_resource",
 *   label = @Translation("[StudioBridge] Individual session information"),
 *   uri_paths = {
 *     "canonical" = "/studio/session/{id}/{random}"
 *   }
 * )
 */
class IndividualSessionRestResource extends ResourceBase {
  /**
   * A current user instance.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $currentUser;

  /**
   * Constructs a Drupal\rest\Plugin\ResourceBase object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\LoggerInterface $logger
   *   A logger instance.
   * @param \Drupal\Core\Session\AccountProxyInterface $current_user
   *   A current user instance.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    array $serializer_formats,
    LoggerInterface $logger,
    AccountProxyInterface $current_user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);

    $this->currentUser = $current_user;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('rest'),
      $container->get('current_user')
    );
  }

  /**
   * Responds to GET requests.
   * Returns a node properties for specified nid.
   *
   * @param id
   *   Node nid.
   *
   * @return \Drupal\rest\ResourceResponse
   *   Node object on successful response, or exception.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   *   Throws exception expected.
   */
    public function get($id, $random) {
        if ($id && $random) {
            // todo : based on requirement, limit fields to be displayed.
            $node = Node::load($id);
            if ($node) {
                $concept = '';
                $color = '';

                $concept = $node->field_concept_name->getValue();
                if ($concept) {
                    $concept = $concept[0]['value'];
                }
                $color = $node->field_color_variant->getValue();
                if ($color) {
                    $color = $color[0]['value'];
                }
                if (!empty($node)) {
                    $resp = array('id' => $id, 'concept' => $concept, 'color' => $color);
                    return new ResourceResponse($resp);
                }
            }

            throw new NotFoundHttpException(t('Session entry with ID @id was not found', array('@id' => $id)));
        }

        throw new BadRequestHttpException(t('No Session entry ID was provided'));
    }

}
