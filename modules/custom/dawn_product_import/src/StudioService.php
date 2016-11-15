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
    $result = db_query("select product_gtin from studio_data where product_gtin='$title'")->fetchAll();
    return $result;
  }


  /*
   *
   */
   public function AddStudioProductDB($datasetvalue) {


     $gtin = str_replace(' ', '', $datasetvalue[1]);
     $gtin = trim($gtin);


     db_insert('studio_data')
       ->fields(array(
          'id' => NULL,
          'product_jira_number'=>($datasetvalue[0]),
          'product_gtin'=>($datasetvalue[1]),
          'product_category'=>($datasetvalue[2]),
          'product_seller_name'=>($datasetvalue[3]),
          'product_brand'=>($datasetvalue[4]),
          'product_images_status'=>($datasetvalue[5]),
          'product_model_shoot'=>($datasetvalue[6]),
          'product_images_received'=>($datasetvalue[7]),
          'date_received_studio'=>($datasetvalue[8]),
          'reshoot_required'=>($datasetvalue[9]),
          'agency_name'=>($datasetvalue[10]),
          'number_of_images'=>($datasetvalue[11]),
          'date_sent_retouching'=>($datasetvalue[12]),
          'date_received_retouching'=>($datasetvalue[13]),
          'qc_person'=>($datasetvalue[14]),
          'upload_date'=>($datasetvalue[15]),
          'photographer'=>($datasetvalue[16]),
       ))
       ->execute();
   }



   /*
    *
    */
    public function AddUnmappedStudioProductDB($datasetvalue) {

      $gtin = str_replace(' ', '', $datasetvalue[1]);
      $gtin = trim($gtin);

      db_insert('unmapped_studio_data')
        ->fields(array(
          'id' => NULL,
          'product_gtin' => ($gtin),
          'product_jira_number' => ($datasetvalue[0]),
        ))
        ->execute();

    }


    public function clearProducts() {

      $result = db_query("delete from studio_data")->execute();

      $result = db_query("delete from unmapped_studio_data")->execute();
      return $result;
    }
}
