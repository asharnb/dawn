<?php

/**
* @file
* Contains \Drupal\studio_photodesk_screens\Controller\ViewSessionController.
*/

namespace Drupal\studio_qc\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Database\Connection;
use Symfony\Component\HttpFoundation\RedirectResponse;


/**
* Class ViewSessionController.
*
* @package Drupal\studio_photodesk_screens\Controller
*/
class viewAllNotifications extends ControllerBase
{

  /**
  * The database service.
  *
  * @var \Drupal\Core\Database\Connection
  */
  protected $database;

  protected $nodeStorage;

  protected $userStorage;
  /*
  * {@inheritdoc}
  */
  public static function create(ContainerInterface $container)
  {
    //$entity_manager = $container->get('entity.manager');
    return new static(
    $container->get('database')

    //$entity_manager->getStorage('node')
  );
}

public function __construct(Connection $database)
{
  $this->database = $database;
  $this->nodeStorage = $this->entityTypeManager()->getStorage('node');
  $this->userStorage = $this->entityTypeManager()->getStorage('user');

}


/**
* Content.
*/
  public function content() {
    $product_data = array();

    //return array to render
    return [
      '#theme' => 'view_qc',
      '#cache' => ['max-age' => 0],
      '#results' => $product_data,
      '#attached' => array(
        'library' => array(
          'studio_qc/live-qc-collection',
        )
      ),
    ];

  }



}
