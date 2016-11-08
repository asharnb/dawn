<?php

/**
* @file
* Contains \Drupal\studio_photodesk_screens\Controller\ViewDashboard.
*/

namespace Drupal\studio_photodesk_screens\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Database\Connection;
use Symfony\Component\HttpFoundation\RedirectResponse;


/**
* Class ViewSessionController.
*
* @package Drupal\studio_photodesk_screens\Controller
*/
class ViewDashboard extends ControllerBase
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


// /**
// * Content.
// */
// public function content()
// {
//
//   // Get current logged in user.
//   $user = \Drupal::currentUser();
//   // Get uid of user.
//   $uid = $user->id();
//   $session_data[] = '';
//   $group = '';
//   $day_start = strtotime(date('Y-m-d 00:00:00', time()));
//   $day_end = strtotime(date('Y-m-d 23:59:59', time()));
//
//   //check if user is admin
//     $is_admin = $user->hasPermission('Administrator');
//     $roles = $user->getRoles();
//
//     // check user has studio_mis_coordinator role
//     $is_mis = false;
//     if(in_array('studio_mis_coordinator', $roles)){
//       $is_mis = true;
//     }
//     if($is_admin || $is_mis){
//       $query = \Drupal::entityQuery('node');
//       $result = $query
//         ->condition('type', 'sessions')
//         ->condition('created', array($day_start, $day_end), 'BETWEEN')
//         ->sort('created', 'DESC')
//         ->range(0, 10000)
//         ->execute();
//     }else{
//       $query = \Drupal::entityQuery('node');
//       $usergroup = $query->orConditionGroup()
//       ->condition('field_photographer', $uid)
//       ->condition('field_vm', $uid)
//       ->condition('field_stylish', $uid);
//       $result = $query
//         ->condition('type', 'sessions')
//         ->condition('created', array($day_start, $day_end), 'BETWEEN')
//         ->condition($usergroup)
//         ->sort('created', 'DESC')
//         ->range(0, 10000)
//         ->execute();
//     }
//
//
//
//   //load all the nodes from the result
//   $sessions = $this->nodeStorage->loadMultiple($result);
//
//
//   //if results are not empty load each node and get info
//   if (!empty($sessions)) {
//     foreach ($sessions as $session) {
//
//       //get concepts
//       $products = $session->field_product->getValue();
//
//       $pid_array = '';
//       foreach($products as $p){
//         $pid_array[] = $p['target_id'];
//       }
//
//       if ($pid_array !== '') {
//         $in_q = '('.implode(',', $pid_array).')';
//         $concepts = db_query("select distinct field_concept_name_value as concept from node__field_concept_name
//         where bundle='products' AND entity_id IN $in_q")->fetchAll();
//         $mapped = db_query("select count(nid) as mappedcount from node where type='products' AND nid IN $in_q")->fetchAll();
//         $unmapped = db_query("select count(nid) as unmappedcount from node where type='unmapped_products' AND nid IN $in_q")->fetchAll();
//         $concepts = objectToArrayDashboard($concepts);
//       } else{
//         $mapped = '';
//         $unmapped = '';
//         $concepts = '';
//       }
//
//       // $session_data = '';
//       // if(!empty($in_q)){
//
//       $photographer = '';
//       $vm = '';
//       $stylist = '';
//       if(!empty($session->field_photographer->get(0)->target_id)){
//         $photographer = $this->userStorage->load($session->field_photographer->get(0)->target_id)->label();
//       }
//       if(!empty($session->field_vm->get(0)->target_id)){
//         $vm = $this->userStorage->load($session->field_vm->get(0)->target_id)->label();
//       }
//       if(!empty($session->field_stylish->get(0)->target_id)){
//         $stylist = $this->userStorage->load($session->field_stylish->get(0)->target_id)->label();
//       }
//
//
//
//       //set values into array
//       $session_data[] = array( 'id' => $session->id(),
//       'name' => $session->title->getValue(),
//       'stage' => $session->field_status->getValue(),
//       'shootdate' => $session->created->getValue(),
//       'type' => $session->field_shoot_type->getValue(),
//       'concepts' => $concepts,
//       'photographer' => $photographer,
//       'vm' => $vm,
//       'stylist' => $stylist,
//       'productcount' => $products,
//       'mapped' => $mapped,
//       'unmapped' => $unmapped,
//     );
//
//   // }
//
//   }
// }
//
// //get total mapped products
// $result_products = \Drupal::entityQuery('node')
//   ->condition('type', array('products'), 'IN')
//   ->sort('created', 'DESC')
//   ->condition('created', array($day_start, $day_end), 'BETWEEN')
//   ->range(0, 1000000)
//   ->count()->execute();
//
//
//   //get total unmapped products
//   $result_unmapped_products = \Drupal::entityQuery('node')
//     ->condition('type', array('unmapped_products'), 'IN')
//     ->sort('created', 'DESC')
//     ->condition('created', array($day_start, $day_end), 'BETWEEN')
//     ->range(0, 1000000)
//     ->count()->execute();
//
//     //get total unmapped products
//     $result_dropped_products = \Drupal::entityQuery('node')
//       ->condition('type', array('dropped_products'), 'IN')
//       ->sort('created', 'DESC')
//       ->condition('created', array($day_start, $day_end), 'BETWEEN')
//       ->range(0, 1000000)
//       ->execute();
//
// //return array to render
// return [
//   '#theme' => 'view_dashboard',
//   '#cache' => ['max-age' => 0],
//   '#results' => $session_data,
//   '#mapped' => $result_products,
//   '#unmapped' => $result_unmapped_products,
//   '#dropped' => $result_dropped_products,
//   '#attached' => array(
//     'library' => array(
//       'studio_photodesk_screens/studiobridge-sessions'
//     ),
//   ),
// ];
//
// }


public function content()
{

  $day_start = strtotime(date('Y-m-d 00:00:00', time()));
  $day_end = strtotime(date('Y-m-d 23:59:59', time()));


//Overall Work flow

    $query_content_gtin = \Drupal::entityQuery('node');
    $result_content_gtin = $query_content_gtin
      ->condition('type', 'dawn_products')
      ->count()
      ->execute();

  $query_content_completion = \Drupal::entityQuery('node');
  $result_content_completion = $query_content_completion
    ->condition('type', 'dawn_products')
    ->condition('field_product_detailer_status', 'Completed');

  $orCondition = $query_content_completion->orConditionGroup()
    ->condition('field_product_attribute_status', 'Completed-PIC')
    ->condition('field_product_attribute_status', 'Completed-Detailer')
    ->condition('field_product_attribute_status', 'Completed-Outsource');

  $result_content_completion = $query_content_completion
    ->condition($orCondition)
    ->condition('field_product_english_copy', 'Completed')
    ->count()
    ->execute();


//MISSING: STUDIO and Overall



    $query_content_detailer_complete = \Drupal::entityQuery('node');
    $result_content_detailer_complete = $query_content_detailer_complete
      ->condition('type', 'dawn_products')
      ->condition('field_product_detailer_status', 'Completed')
      ->count()
      ->execute();

    $query_content_detailer_complete = \Drupal::entityQuery('node');
    $result_content_attribute_complete = $query_content_detailer_complete
      ->condition('type', 'dawn_products');
    $orCondition = $query_content_detailer_complete->orConditionGroup()
      ->condition('field_product_attribute_status', 'Completed-PIC')
      ->condition('field_product_attribute_status', 'Completed-Detailer')
      ->condition('field_product_attribute_status', 'Completed-Outsource');
    $result_content_attribute_complete = $query_content_detailer_complete
      ->condition($orCondition)
      ->count()
      ->execute();

    $query_english_complete = \Drupal::entityQuery('node');
    $result_english_complete = $query_english_complete
      ->condition('type', 'dawn_products')
      ->condition('field_product_english_copy', 'Completed')
      ->count()
      ->execute();

    $query_arabic_complete = \Drupal::entityQuery('node');
    $result_arabic_complete = $query_arabic_complete
      ->condition('type', 'dawn_products')
      ->condition('field_product_arabic_copy', 'Completed')
      ->count()
      ->execute();


    $query_studio_gtin = \Drupal::entityQuery('node');
    $result_studio_gtin = $query_studio_gtin
      ->condition('type', 'studio_products')
      ->count()
      ->execute();

    $query_studio_gtin_unmapped = \Drupal::entityQuery('node');
    $result_studio_gtin_unmapped = $query_studio_gtin_unmapped
      ->condition('type', 'unmapped_studio_products')
      ->count()
      ->execute();

    $query_studio_gtin_complete = \Drupal::entityQuery('node');
    $result_studio_gtin_complete = $query_studio_gtin_complete
      ->condition('type', 'studio_products')
      ->condition('field_date_received_retouching', '', '<>')
      ->count()
      ->execute();

//return array to render
return [
  '#theme' => 'view_dashboard',
  '#cache' => ['max-age' => 0],
  '#content_complete' => $result_content_completion,
  '#content_GTIN' => $result_content_gtin,
  '#content_duplicates' => '',
  '#content_detailer_complete' => $result_content_detailer_complete,
  '#content_attribute_complete' => $result_content_attribute_complete,
  '#content_english_complete' => $result_english_complete,
  '#content_arabic_complete' => $result_arabic_complete,
  '#studio_GTIN' => $result_studio_gtin,
  '#studio_GTIN_issues' => $result_studio_gtin_unmapped,
  '#studio_GTIN_complete' => $result_studio_gtin_complete,
  '#attached' => array(
    'library' => array(
      'studio_photodesk_screens/studiobridge-sessions'
    ),
  ),
];

}

}

function objectToArrayDashboard($data) {
    if (is_object($data))
        $data = get_object_vars($data);
    if (is_array($data))
        return array_map(__FUNCTION__, $data);
    return $data;
}
