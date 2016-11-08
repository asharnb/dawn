<?php

/**
 * @file
 * Contains \Drupal\dawn_product_import\ProductService.
 */

namespace Drupal\dawn_product_import;

use Drupal\Core\Database\Driver\mysql\Connection;
use Drupal\Core\Session\AccountProxy;
use Drupal\Core\Entity\EntityManager;
use Drupal\Core\State\State;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\node\Entity\Node;

/**
 * Class ProductService.
 *
 * @package Drupal\dawn_product_import
 */
class ProductService implements ProductServiceInterface {

  /**
   * Drupal\Core\Database\Driver\mysql\Connection definition.
   *
   * @var Drupal\Core\Database\Driver\mysql\Connection
   */
  protected $database;

  /**
   * Drupal\Core\Session\AccountProxy definition.
   *
   * @var Drupal\Core\Session\AccountProxy
   */
  protected $current_user;

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
   * The entity query factory.
   *
   * @var \Drupal\Core\Entity\Query\QueryFactory
   */
  protected $queryFactory;

  /**
   * Drupal\Core\Entity\Query\QueryFactory definition.
   *
   * @var Drupal\Core\Entity\Query\QueryFactory
   */
  protected $entity_query;
  /**
   * Constructor.
   */
  public function __construct(Connection $database, AccountProxy $current_user, EntityManager $entity_manager, State $state, QueryFactory $entity_query) {
    $this->database = $database;
    $this->current_user = $current_user;
    $this->entity_manager = $entity_manager;
    $this->state = $state;
    $this->entity_query = $entity_query;
  }

  /*
   *
   */
   public function getProductByGTIN($title) {
     $result = $this->entity_query->get('node')
       ->condition('type', 'dawn_products')
       ->condition('title', $title)
       ->range(0, 1)
       ->execute();
     return $result;
   }



   public function AddDawnProduct($datasetvalue) {

     $values = array(
       'nid' => NULL,
       'type' => 'dawn_products',
       'title' => $datasetvalue[0],
       'field_product_brand' => $datasetvalue[1],
       'field_product_seller' => $datasetvalue[2],
       'field_product_model_number' => $datasetvalue[3],
       'field_product_title' => $datasetvalue[4],
       'field_product_category' => $datasetvalue[5],
       'field_product_color_name' => $datasetvalue[6],
       'field_product_size' => $datasetvalue[7],
       'field_product_english_copy' => $datasetvalue[8],
       'field_product_arabic_copy' => $datasetvalue[9],
       'field_product_detailer_status' => $datasetvalue[10],
       'field_product_attribute_status' => $datasetvalue[11],
       'field_product_supplier_sku' => $datasetvalue[12],
       'field_product_date_received' => $datasetvalue[14],
       'field_product_jira_number' => $datasetvalue[15],
     );
     // Create new node entity.
     $node = Node::create($values);
     // Save unmapped node entity.
     $node->save();

   }

   public function AddUnmappedDawnProduct($datasetvalue) {

     $values = array(
       'nid' => NULL,
       'type' => 'unmapped_dawn_products',
       'title' => $datasetvalue[0],
     );
     // Create new node entity.
     $node = Node::create($values);
     // Save unmapped node entity.
     $node->save();

   }

}
