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
  $result_content_gtin = objectToArrayDashboard(db_query("select count(id) as count from production_data
  ")->fetchAll());

  $result_content_completion = objectToArrayDashboard(db_query("select count(id) as count from production_data
  WHERE product_detailer_status='Completed' AND
  (product_attribute_status='Completed-PIC' OR
  product_attribute_status='Completed-Detailer' OR
  product_attribute_status='Completed-Outsource') AND
  product_english_copy='Completed'
  ")->fetchAll());

//MISSING: STUDIO and Overall

  $result_content_detailer_complete = objectToArrayDashboard(db_query("select count(id) as count from production_data
  WHERE product_detailer_status='Completed'")->fetchAll());

  $result_content_attribute_complete = objectToArrayDashboard(db_query("select count(id) as count from production_data
  WHERE (product_attribute_status='Completed-PIC' OR
  product_attribute_status='Completed-Detailer' OR
  product_attribute_status='Completed-Outsource')
  ")->fetchAll());

  $result_english_complete = objectToArrayDashboard(db_query("select count(id) as count from production_data
  WHERE product_english_copy='Completed'")->fetchAll());

  $result_arabic_complete = objectToArrayDashboard(db_query("select count(id) as count from production_data
  WHERE product_arabic_copy='Completed'")->fetchAll());


  $result_studio_gtin = objectToArrayDashboard(db_query("select count(id) as count from studio_data
  ")->fetchAll());


  $result_studio_gtin_unmapped = objectToArrayDashboard(db_query("select count(id) as count from unmapped_studio_data
  ")->fetchAll());


  $result_studio_sourced = objectToArrayDashboard(db_query("select count(id) as count from studio_data
  WHERE date_received_retouching <> ''
  ")->fetchAll());

  $result_studio_gtin_complete = objectToArrayDashboard(db_query("select count(id) as count from studio_data
  WHERE date_received_retouching <> ''
  ")->fetchAll());


  $result_studio_gtin_complete = objectToArrayDashboard(db_query("select count(id) as count from studio_data
  WHERE date_received_retouching <> ''
  ")->fetchAll());

  $result_studio_gtin_complete = objectToArrayDashboard(db_query("select count(id) as count from studio_data
  WHERE date_received_retouching <> ''
  ")->fetchAll());

  $result_studio_gtin_complete = objectToArrayDashboard(db_query("select count(id) as count from studio_data
  WHERE date_received_retouching <> ''
  ")->fetchAll());


  $result_overall_complete = objectToArrayDashboard(db_query("select count(pd.id) as count from production_data pd
  LEFT JOIN studio_data sd on sd.product_gtin = pd.product_gtin
  WHERE pd.product_detailer_status='Completed' AND
  (pd.product_attribute_status='Completed-PIC' OR
  pd.product_attribute_status='Completed-Detailer' OR
  pd.product_attribute_status='Completed-Outsource') AND
  pd.product_english_copy='Completed' AND
  sd.date_received_retouching <> ''
  ")->fetchAll());


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
  '#overall_complete' => $result_overall_complete,
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
