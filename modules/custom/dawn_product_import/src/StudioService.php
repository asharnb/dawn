<?php

/**
 * @file
 * Contains \Drupal\dawn_product_import\StudioService.
 */

namespace Drupal\dawn_product_import;

use Drupal\Core\Database\Driver\mysql\Connection;
use Drupal\Core\Entity\EntityManager;
use Drupal\Core\State\State;
use Drupal\Core\Session\AccountProxy;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * Class StudioService.
 *
 * @package Drupal\dawn_product_import
 */
class StudioService implements StudioServiceInterface {

  /**
   * Drupal\Core\Database\Driver\mysql\Connection definition.
   *
   * @var Drupal\Core\Database\Driver\mysql\Connection
   */
  protected $database;

  /**
   * Drupal\Core\Entity\EntityManager definition.
   *
   * @var Drupal\Core\Entity\EntityManager
   */
  protected $entity_manager;

  /**
   * Drupal\Core\State\State definition.
   *
   * @var Drupal\Core\State\State
   */
  protected $state;

  /**
   * Drupal\Core\Session\AccountProxy definition.
   *
   * @var Drupal\Core\Session\AccountProxy
   */
  protected $current_user;

  /**
   * Drupal\Core\Entity\Query\QueryFactory definition.
   *
   * @var Drupal\Core\Entity\Query\QueryFactory
   */
  protected $entity_query;
  /**
   * Constructor.
   */
  public function __construct(Connection $database, EntityManager $entity_manager, State $state, AccountProxy $current_user, QueryFactory $entity_query) {
    $this->database = $database;
    $this->entity_manager = $entity_manager;
    $this->state = $state;
    $this->current_user = $current_user;
    $this->entity_query = $entity_query;
  }

  /*
   *
   */
  public function findStudioByGtin(){
    return 'Hello world!';
  }

}
