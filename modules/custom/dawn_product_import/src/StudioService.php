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
use Drupal\node\Entity\Node;

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
  public function getStudioProductByGTIN($title) {
    $result = $this->entity_query->get('node')
      ->condition('type', 'studio_products')
      ->condition('title', $title)
      ->range(0, 1)
      ->execute();
    return $result;
  }


  /*
   *
   */
   public function AddStudioProduct($datasetvalue) {

     $values = array(
       'nid' => NULL,
       'type' => 'studio_products',
       'title' => $datasetvalue[1],
       'field_status_image_recieved' => $datasetvalue[5],
       'field_model_shoot_required' => $datasetvalue[6],
       'field_all_images_received' => $datasetvalue[7],
       'field_date_images_received' => $datasetvalue[8],
       'field_reshoot_required' => $datasetvalue[9],
       'field_agency_name' => $datasetvalue[10],
       'field_date_sent_retouching' => $datasetvalue[12],
       'field_date_received_retouching' => $datasetvalue[13],
       'field_qc_person' => $datasetvalue[14],
     );
     // Create new node entity.
     $node = Node::create($values);
     // Save unmapped node entity.
     $node->save();

   }

   /*
    *
    */
    public function AddUnmappedStudioProduct($datasetvalue) {

      $values = array(
        'nid' => NULL,
        'type' => 'unmapped_studio_products',
        'title' => $datasetvalue[1]
      );
      // Create new node entity.
      $node = Node::create($values);
      // Save unmapped node entity.
      $node->save();

    }
}
