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

    $result = db_query("select product_gtin from production_data where product_gtin='$title'")->fetchAll();
    return $result;
  }

  public function AddDawnProductDB($datasetvalue) {


    $gtin = str_replace(' ', '', $datasetvalue[0]);
    $gtin = trim($gtin);

      db_insert('production_data')
        ->fields(array(
          'id' => NULL,
          'product_gtin' => mysql_real_escape_string($gtin),
          'product_brand_name' => mysql_real_escape_string($datasetvalue[1]),
          'product_seller_name' => mysql_real_escape_string($datasetvalue[2]),
          'product_model_number' => mysql_real_escape_string($datasetvalue[3]),
          'product_title' => mysql_real_escape_string(preg_replace('/\\\//', '/',$datasetvalue[4])),
          'product_category' => mysql_real_escape_string($datasetvalue[5]),
          'product_color_name' => mysql_real_escape_string($datasetvalue[6]),
          'product_size' => mysql_real_escape_string($datasetvalue[7]),
          'product_english_copy' => mysql_real_escape_string($datasetvalue[8]),
          'product_arabic_copy' => mysql_real_escape_string($datasetvalue[9]),
          'product_detailer_status' => mysql_real_escape_string($datasetvalue[10]),
          'product_attribute_status' => mysql_real_escape_string($datasetvalue[11]),
          'product_supplier_sku' => mysql_real_escape_string($datasetvalue[12]),
          'product_gtin_validation' => mysql_real_escape_string($datasetvalue[13]),
          'product_date_received' => mysql_real_escape_string($datasetvalue[14]),
          'product_jira_number' => mysql_real_escape_string($datasetvalue[15]),
          'product_count' => mysql_real_escape_string($datasetvalue[16]),
        ))
        ->execute();
    }



    public function clearProducts() {

      $result = db_query("delete from production_data")->execute();

      $result = db_query("delete from unmapped_production_data")->execute();
      return $result;
    }



  public function AddUnmappedDawnProductDB($datasetvalue) {

    $gtin = str_replace(' ', '', $datasetvalue[0]);
    $gtin = trim($gtin);

    db_insert('unmapped_production_data')
      ->fields(array(
        'id' => NULL,
        'product_gtin' => mysql_real_escape_string($gtin),
        'product_jira_number' => mysql_real_escape_string($datasetvalue[15]),
      ))
      ->execute();

  }


}
