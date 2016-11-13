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
          'product_jira_number'=>mysql_real_escape_string($datasetvalue[0]),
          'product_gtin'=>mysql_real_escape_string($datasetvalue[1]),
          'product_category'=>mysql_real_escape_string($datasetvalue[2]),
          'product_seller_name'=>mysql_real_escape_string($datasetvalue[3]),
          'product_brand'=>mysql_real_escape_string($datasetvalue[4]),
          'product_images_status'=>mysql_real_escape_string($datasetvalue[5]),
          'product_model_shoot'=>mysql_real_escape_string($datasetvalue[6]),
          'product_images_received'=>mysql_real_escape_string($datasetvalue[7]),
          'date_received_studio'=>mysql_real_escape_string($datasetvalue[8]),
          'reshoot_required'=>mysql_real_escape_string($datasetvalue[9]),
          'agency_name'=>mysql_real_escape_string($datasetvalue[10]),
          'number_of_images'=>mysql_real_escape_string($datasetvalue[11]),
          'date_sent_retouching'=>mysql_real_escape_string($datasetvalue[12]),
          'date_received_retouching'=>mysql_real_escape_string($datasetvalue[13]),
          'qc_person'=>mysql_real_escape_string($datasetvalue[14]),
          'upload_date'=>mysql_real_escape_string($datasetvalue[15]),
          'photographer'=>mysql_real_escape_string($datasetvalue[16]),
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
          'product_gtin' => mysql_real_escape_string($gtin),
          'product_jira_number' => mysql_real_escape_string($datasetvalue[0]),
        ))
        ->execute();

    }


    public function clearProducts() {

      $result = db_query("delete from studio_data")->execute();

      $result = db_query("delete from unmapped_studio_data")->execute();
      return $result;
    }
}
