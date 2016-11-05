<?php


namespace Drupal\studio_session_operations\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Database\Connection;
use Symfony\Component\HttpFoundation\RedirectResponse;


class ImportCSV extends ControllerBase
{

  /**
  * The database service.
  *
  * @var \Drupal\Core\Database\Connection
  */
  protected $database;

  protected $nodeStorage;

  protected $userStorage;

  public $total_mapped;

  /*
  * {@inheritdoc}
  */


public function __construct(Connection $database)
{
  $this->database = $database;
  $this->nodeStorage = $this->entityTypeManager()->getStorage('node');
  $this->userStorage = $this->entityTypeManager()->getStorage('user');
}

public static function create(ContainerInterface $container)
  {
    return new static(
    $container->get('database'),
    $container->get('studio.products')
  );
}


function ImportProduction(){
  ini_set('max_execution_time', 300);
  $csvfile = "https://docs.google.com/spreadsheets/d/1gdbU40z5z0ePqyKaHYIg2mI7wIVhwfNcTRf79dFCj6k/pub?gid=0&single=true&output=csv";
  $total_mapped = 0;
  $total_unmapped = 0;


  $Products = \Drupal::service('studio.products');
  //get the csv file
  $handle = fopen($csvfile,"r");

  //loop through the csv file and insert into nodes
  do {
      if ($data[0]) {
        //check if is a duplicate
        $duplicate_check = $Products->getProductbyGTIN($data[0]);

        //if not a duplicate, add into node
        if ($duplicate_check){



        } else{

          $values = array(
            'nid' => NULL,
            'type' => 'product_new',
            'title' => $data[0],
            'field_brand_name' => $data[1],
            'field_seller_name' => $data[2],
            'field_model_number' => $data[3],
            'field_product_title' => $data[4],
            'field_product_category' => $data[5],
            'field_product_color' => $data[6],
            'field_product_size' => $data[7],
            'field_product_copy_english' => $data[8],
            'field_product_copy_arabic' => $data[9],
            'field_detailer_status' => $data[10],
            'field_attribute_status' => $data[11],
            'field_supplier_sku' => $data[12],
            'field_date_received' => $data[14],
            'field_jira_reference' => $data[15],
            'field_jira_reference' => $data[15],
          );
          // Create new node entity.
          $node = $this->nodeStorage->create($values);
          // Save unmapped node entity.
          $node->save();

        }

      }
  } while ($data = fgetcsv($handle,1000,",",'"'));

  return[
    '#markup' => $total_unmapped,

  ];


}


}
