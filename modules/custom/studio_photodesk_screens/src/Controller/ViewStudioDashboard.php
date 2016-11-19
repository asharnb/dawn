<?php

/**
* @file
* Contains \Drupal\studio_photodesk_screens\Controller\ViewStudioDashboard.
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
class ViewStudioDashboard extends ControllerBase
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

  $week_start_time = strtotime(date('Y-m-d', time()));
  $week_end_time =  strtotime("-60 day", $week_start_time);

  $week_start = date('Y-m-d', $week_start_time);
  $week_end = date('Y-m-d', $week_end_time);

  $week_start_studio = date('d/m/y', $week_start_time);
  $week_end_studio = date('d/m/y', $week_end_time);

//Overall Work flow
  $result_content_gtin = objectToArrayStudioDashboard(db_query("select count(id) as count from production_data
  ")->fetchAll());


  $result_content_completion = objectToArrayStudioDashboard(db_query("select count(id) as count from production_data
  WHERE product_detailer_status='Completed' AND
  (product_attribute_status='Completed-PIC' OR
  product_attribute_status='Completed-Detailer' OR
  product_attribute_status='Completed-Outsource') AND
  product_english_copy='Completed'
  ")->fetchAll());


  $result_studio_gtin = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  ")->fetchAll());


  $result_studio_gtin_unmapped = objectToArrayStudioDashboard(db_query("select count(id) as count from unmapped_studio_data
  ")->fetchAll());


  $result_studio_sourced = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  WHERE date_received_retouching <> ''
  ")->fetchAll());

  $result_studio_gtin_complete = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  WHERE date_received_retouching <> ''
  ")->fetchAll());


  $result_studio_gtin_complete = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  WHERE date_received_retouching <> ''
  ")->fetchAll());

  $result_studio_gtin_complete = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  WHERE date_received_retouching <> ''
  ")->fetchAll());

  $result_studio_gtin_complete = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  WHERE date_received_retouching <> ''
  ")->fetchAll());


  $result_overall_complete = objectToArrayStudioDashboard(db_query("select count(pd.id) as count from production_data pd
  LEFT JOIN studio_data sd on sd.product_gtin = pd.product_gtin
  WHERE pd.product_detailer_status='Completed' AND
  (pd.product_attribute_status='Completed-PIC' OR
  pd.product_attribute_status='Completed-Detailer' OR
  pd.product_attribute_status='Completed-Outsource') AND
  pd.product_english_copy='Completed' AND
  sd.date_received_retouching <> ''
  ")->fetchAll());



  $result_studio_sourced = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  WHERE product_images_status='To be Sourced' AND date_received_studio <> ''
  ")->fetchAll());

  $result_studio_shot = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  WHERE product_images_status='To Shoot' AND date_received_studio <> ''
  ")->fetchAll());

  $result_studio_model = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  WHERE product_model_shoot='Yes' AND date_received_studio <> '' AND date_received_retouching <> ''
  ")->fetchAll());


  $result_studio_still = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  WHERE product_images_status='To Shoot' AND date_received_studio <> '' AND date_received_retouching <> ''
  ")->fetchAll());


  // $result_studio_shot = objectToArrayStudioDashboard(db_query("select count(id) as count from studio_data
  // WHERE date_received_studio BETWEEN $week_start AND $week_end AND
  // product_images_status='To Shoot' OR
  // (product_images_status='To be Sourced' OR product_images_status='Approved' AND )
  //
  // ")->fetchAll());

//return array to render
return [
  '#theme' => 'view_studio_dashboard',
  '#cache' => ['max-age' => 0],
  '#content_complete' => $result_content_completion,
  '#content_GTIN' => $result_content_gtin,
  '#studio_sourced' => $result_studio_sourced,
  '#studio_shot' => $result_studio_shot,
  '#studio_GTIN_issues' => $result_studio_shot,
  '#studio_GTIN_complete' => $result_studio_gtin_complete,
  '#overall_complete' => $result_overall_complete,
  '#week_start' => $week_start,
  '#week_end' => $week_end,
  '#attached' => array(
    'library' => array(
      'studio_photodesk_screens/studiobridge-sessions'
    ),
  ),
];

}

}

function objectToArrayStudioDashboard($data) {
    if (is_object($data))
        $data = get_object_vars($data);
    if (is_array($data))
        return array_map(__FUNCTION__, $data);
    return $data;
}
