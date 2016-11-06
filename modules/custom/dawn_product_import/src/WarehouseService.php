<?php

/**
 * @file
 * Contains \Drupal\dawn_product_import\WarehouseService.
 */

namespace Drupal\dawn_product_import;

use Drupal\Core\State\State;
use Drupal\Core\Database\Driver\mysql\Connection;
use Drupal\Core\Entity\EntityManager;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Session\AccountProxy;

/**
 * Class WarehouseService.
 *
 * @package Drupal\dawn_product_import
 */
class WarehouseService implements WarehouseServiceInterface {

  /**
   * Drupal\Core\State\State definition.
   *
   * @var Drupal\Core\State\State
   */
  protected $state;

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
   * Drupal\Core\Entity\Query\QueryFactory definition.
   *
   * @var Drupal\Core\Entity\Query\QueryFactory
   */
  protected $entity_query;

  /**
   * Drupal\Core\Session\AccountProxy definition.
   *
   * @var Drupal\Core\Session\AccountProxy
   */
  protected $current_user;
  /**
   * Constructor.
   */
  public function __construct(State $state, Connection $database, EntityManager $entity_manager, QueryFactory $entity_query, AccountProxy $current_user) {
    $this->state = $state;
    $this->database = $database;
    $this->entity_manager = $entity_manager;
    $this->entity_query = $entity_query;
    $this->current_user = $current_user;
  }

  /*
   *
   */
  public function findWarehouseByGtin(){
    return 'Hello world!';
  }
}
