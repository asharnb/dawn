<?php

/**
* @file
* Contains \Drupal\warehouse_checkin\Controller.
*/

namespace Drupal\warehouse_checkin\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Database\Connection;
use Symfony\Component\HttpFoundation\RedirectResponse;


/**
* Class ViewSessionController.
*
* @package Drupal\studio_photodesk_screens\Controller
*/
class ViewAllContainersController extends ControllerBase
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
  //$this->formBuilder = $form_builder;
  //$this->userStorage = $this->entityManager()->getStorage('user');
  $this->nodeStorage = $this->entityTypeManager()->getStorage('node');
  $this->userStorage = $this->entityTypeManager()->getStorage('user');

}


/**
* Content.
*/
public function content()
{

  // Get current logged in user.
  $user = \Drupal::currentUser();
  // Get uid of user.
  $uid = $user->id();

  //get all nodes of session type
  $result = \Drupal::entityQuery('node')
  ->condition('type', 'container')
  //->condition('type', 'products')
  ->sort('created', 'DESC')
  ->range(0, 10000)
  ->execute();

  //load all the nodes from the result
  $containers = $this->nodeStorage->loadMultiple($result);




//return array to render
return [
  '#theme' => 'view_all_containers',
  '#cache' => ['max-age' => 0],
  '#results' => $containers,
  '#attached' => array(
    'library' => array(
      'warehouse_checkin/containers'
    ),
  ),
];

}



}
