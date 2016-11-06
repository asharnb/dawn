<?php


/**
* @file
* Contains \Drupal\dawn_product_import\Form\DawnCsvForm.
*/

namespace Drupal\dawn_product_import\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Database\Connection;
use Drupal\Core\Session\AccountProxy;
use GuzzleHttp\Client;
use Drupal\node\Entity\Node;


/**
* Class DawnCsvForm.
*
* @package Drupal\dawn_product_import\Form
*/
class DawnCsvForm extends FormBase {

  /**
  * Drupal\Core\Database\Driver\mysql\Connection definition.
  *
  * @var Drupal\Core\Database\Connection
  */
  protected $database;

  /**
  * Drupal\Core\Session\AccountProxy definition.
  *
  * @var Drupal\Core\Session\AccountProxy
  */
  protected $current_user;

  protected $product;

  protected $nodeStorage;

  /**
  * GuzzleHttp\Client definition.
  *
  * @var GuzzleHttp\Client
  */
  protected $http_client;

  public function __construct(
  Connection $database ,
  AccountProxy $current_user,
  Client $http_client,
  $entity_manager
  ) {
    $this->database = $database;
    $this->current_user = $current_user;
    $this->http_client = $http_client;
    $this->nodeStorage = $entity_manager->getStorage('node');
    //$this->product = \Drupal::service('dawn.product');
  }

  public static function create(ContainerInterface $container) {
    return new static(
    $container->get('database'),
    $container->get('current_user'),
    $container->get('http_client'),
    $container->get('entity_type.manager')
  );
}


/**
* {@inheritdoc}
*/
public function getFormId() {
  return 'dawn_csv_form';
}

/**
* {@inheritdoc}
*/
public function buildForm(array $form, FormStateInterface $form_state) {
  $form['product_csv_url'] = array(
    '#type' => 'textfield',
    '#title' => $this->t('Product CSV URL'),
    '#maxlength' => 250,
    '#size' => 250,
    '#description' => 'https://docs.google.com/spreadsheets/d/1gdbU40z5z0ePqyKaHYIg2mI7wIVhwfNcTRf79dFCj6k/pub?gid=0&single=true&output=csv',
    '#value' => 'https://docs.google.com/spreadsheets/d/1gdbU40z5z0ePqyKaHYIg2mI7wIVhwfNcTRf79dFCj6k/pub?gid=0&single=true&output=csv'

  );
  $form['warehouse_csv_url'] = array(
    '#type' => 'textfield',
    '#title' => $this->t('WareHouse CSV URL'),
    '#maxlength' => 250,
    '#size' => 250,
  );
  $form['studio_csv_url'] = array(
    '#type' => 'textfield',
    '#title' => $this->t('Studio CSV URL'),
    '#maxlength' => 250,
    '#size' => 250,
  );

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => 'Submit',
  );

  return $form;
}

/**
* {@inheritdoc}
*/
public function submitForm(array &$form, FormStateInterface $form_state) {
  ini_set('auto_detect_line_endings', TRUE);
  $operations = [];
  $csvfile = $form_state->getValue('product_csv_url');

  // Find which is importing ? product or warehouse or studio
  $type = 'product'; //@todo : temparory solution.

  $file = file($csvfile);
  $csv = array_map('str_getcsv', $file);
  // Remove 1st row; which is head
  array_shift($csv);

  // Split an array into chunks; to decrease no.of operations.
  $csv = array_chunk($csv,100);

  foreach($csv as $data){
  $operations[] = array(array(get_class($this), 'import_process_operation'), array($data, $type));
  }

  $batch = array(
    'title' => t('Processing Smack My Batch'),
    'operations' => $operations,
    //'progress_message' =>  t('Completed @current of @total Records from csv file.... Available placeholders are @current, @remaining, @total, @percentage, @estimate and @elapsed')
    'progress_message' =>  t('Completed @current of @total Records from csv file.... Estimation time: @estimate; @elapsed taken till now'),
    'finished' => array(get_class($this),'csv_batch_finished')
  );
  batch_set($batch);
}

function import_process_operation($dataSet, $type, &$context, $data) {


  $product =  \Drupal::service('dawn.product');
  $nodestorage = \Drupal::service('entity_type.manager');

  $context['sandbox']['progress']++;
  $context['sandbox']['current_letter'] = $dataSet[0][0];

  // Check for node that exist in the system by GTIN value.
  // If exist then update the product data & set state value.

  foreach($dataSet as $datasetvalue){
    if(is_numeric($datasetvalue[0])){

      $product_exists = $product->getProductByGTIN($datasetvalue[0]);
      if ($product_exists){
        $node = reset($product_exists)
        Node::load($nid)->delete();
      } else
      {
        //$product->AddDawnProduct($datasetvalue);

      }

      $context['message'] = $datasetvalue[0] . ' processed.';
      $context['results'][] = $datasetvalue[0];
    }
  }

}

function csv_batch_finished($success, $results, $operations) {
  if ($success) {
    $message = \Drupal::translation()->formatPlural(count($results), 'One post processed.', '@count*100 posts processed.');
  }
  else {
    $message = t('Finished with an error.');
  }

  drupal_set_message($message);

  // Providing data for the redirected page is done through $_SESSION.
  foreach ($results as $result) {
    drupal_set_message(t('Processed @title.', array('@title' => $result)));
  }
}



}
