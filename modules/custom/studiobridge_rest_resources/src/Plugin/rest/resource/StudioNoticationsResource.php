<?php

/**
 * @file
 * Contains \Drupal\studiobridge_rest_resources\Plugin\rest\resource\studiobridge_rest_resources.
 */

namespace Drupal\studiobridge_rest_resources\Plugin\rest\resource;

use Drupal\Core\Session\AccountProxyInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Psr\Log\LoggerInterface;

/**
 * Provides a resource to get view modes by entity and bundle.
 *
 * @RestResource(
 *   id = "studio_notications_resource",
 *   label = @Translation("Studio notications resource"),
 *   serialization_class = "Drupal\node\Entity\Node",
 *   uri_paths = {
 *     "canonical" = "/studio/notifications/{type}",
 *     "https://www.drupal.org/link-relations/create" = "/studio/notifications/{type}/post"
 *   }
 * )
 */
class StudioNoticationsResource extends ResourceBase {
  /**
   * A current user instance.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $currentUser;

  protected $studioNotifications;

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
    AccountProxyInterface $current_user, $studioNotifications) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);

    $this->currentUser = $current_user;
    $this->studioNotifications = $studioNotifications;
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
      $container->get('current_user'),
      $container->get('studio.notifications')
    );
  }
  /**
   * Responds to POST requests.
   *
   * Returns a list of bundles for specified entity.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   *   Throws exception expected.
   */
  public function post($type, $data) {

    // You must to implement the logic of your REST Resource here.
    // Use current user after pass authentication to validate access.

    /*
    if(!$this->currentUser->hasPermission($permission)) {
        throw new AccessDeniedHttpException();
    }
    */

    // Throw an exception if it is required.
    // throw new HttpException(t('Throw an exception if it is required.'));
    return new ResourceResponse("Implement REST State POST!");
  }

  public function get($type){
    \Drupal::service('page_cache_kill_switch')->trigger();

    $uid = $this->currentUser->id();

    switch($type){

      case  'current_user_open_notifications':
        $result = $this->studioNotifications->GetNotificationsByUserAndStatus($uid, 'open');
        $result = json_decode(json_encode($result), true);

        return new ResourceResponse(array('data' => (array) $result));
        break;

      case  'current_user_all_notifications':
        $result = $this->studioNotifications->GetNotificationsByUserAndStatus($uid, 'all');
        return new ResourceResponse(array('data' => $result));
        break;

      default:

        return new ResourceResponse("Implement REST State GET!");

    }

  }

}
