<?php

/**
* @file
* Contains \Drupal\studiobridge_rest_resources\Plugin\rest\resource\studiobridge_rest_resources.
*/

namespace Drupal\studiobridge_rest_resources\Plugin\rest\resource;

use Drupal\Core\Session\AccountProxyInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Psr\Log\LoggerInterface;
use \Drupal\node\Entity\Node;

/**
* Provides a resource to get view modes by entity and bundle.
*
* @RestResource(
*   id = "product_and_sessions_lookup",
*   label = @Translation("Product and sessions lookup"),
*   uri_paths = {
*     "canonical" = "/screens/{type}"
*   }
* )
*/
class ProductAndSessionsLookup extends ResourceBase {
  /**
  * A current user instance.
  *
  * @var \Drupal\Core\Session\AccountProxyInterface
  */
  protected $currentUser;

  protected $nodeStorage;

  protected $studioModels;

  protected $studioQc;

  protected $studioProducts;

  /**
  * Constructs a Drupal\rest\Plugin\ResourceBase object.
  *
  * @param array $configuration
  *   A configuration array containing information about the plugin instance.
  * @param string $plugin_id
  *   The plugin_id for the plugin instance.
  * @param mixed $plugin_definition
  *   The plugin implementation definition.
  * @param array $serializer_formats
  *   The available serialization formats.
  * @param \Psr\Log\LoggerInterface $logger
  *   A logger instance.
  * @param \Drupal\Core\Session\AccountProxyInterface $current_user
  *   A current user instance.
  */
  public function __construct(
  array $configuration,
  $plugin_id,
  $plugin_definition,
  array $serializer_formats,
  LoggerInterface $logger,
  AccountProxyInterface $current_user, $entity_manager, $studioModels, $studioQc, $studioProducts) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);

    $this->nodeStorage = $entity_manager->getStorage('node');

    $this->currentUser = $current_user;

    $this->studioModels = $studioModels;

    $this->studioQc = $studioQc;

    $this->studioProducts = $studioProducts;
  }

  /**
  * {@inheritdoc}
  */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
    $configuration,
    $plugin_id,
    $plugin_definition,
    $container->getParameter('serializer.formats'),
    $container->get('logger.factory')->get('rest'),
    $container->get('current_user'),
    $container->get('entity_type.manager'),
    $container->get('studio.models'),
    $container->get('studio.qc'),
    $container->get('studio.products')
  );
}

/**
* Responds to GET requests.
*
* Returns a list of bundles for specified entity.
*
* @throws \Symfony\Component\HttpKernel\Exception\HttpException
*   Throws exception expected.
*/
public function get($type) {

  //return new ResourceResponse($_GET);

  \Drupal::service('page_cache_kill_switch')->trigger();

  $product_data = array();
  $total_count = 0;
  $total_filtererd = 0;

  $bundles = array('product_new');

  $total_count = \Drupal::entityQuery('node')
  ->condition('type', $bundles, 'IN')
  ->count()->execute();

  $order_by = $_GET['order'][0]['column'];
  $order_direction = $_GET['order'][0]['dir'];

  $query = \Drupal::entityQuery('node');

  $query_count_total = \Drupal::entityQuery('node');

    if (!empty($_GET['search']['value'])) {
        $value = $_GET['search']['value'];


        $query = \Drupal::entityQuery('node');
        $query_count_filter = \Drupal::entityQuery('node');

        $query->condition('type', $bundles, 'IN');
        $query_count_filter->condition('type', $bundles, 'IN');

        // Or condition for product fields
        $orCondition = $query->orConditionGroup();
        $orCondition->condition('title', db_like($value) . '%', 'LIKE');
        $orCondition->condition('field_product_title', db_like($value) . '%', 'LIKE');
        $orCondition->condition('field_jira_reference', db_like($value) . '%', 'LIKE');
        $orCondition->condition('field_product_category', db_like($value) . '%', 'LIKE');

        $query->condition($orCondition);
        $query_count_filter->condition($orCondition);


        $query->range($_GET['start'], $_GET['length']);
        //$query_count_filter->range($_GET['start'], $_GET['length']);

        //$query->sort($order_field, strtoupper($order_direction));
        $result = $query->execute();


        $total_filtered = $query_count_filter->count()->execute();


    } else {

        $result = \Drupal::entityQuery('node')
        ->condition('type', $bundles, 'IN')
        ->range($_GET['start'], $_GET['length'])
        ->execute();

        $total_filtered = $total_count;

    }


  //load all the nodes from the result
  if ($result) {

    $products = $this->getProducts($result);


    //if results are not empty load each node and get info
    if ($products) {

      $data = array(
        'draw' => intval($_GET['draw']),
        'recordsTotal' => $total_count,
        'recordsFiltered' => $total_filtered,
        'data' =>
        $products,
      );

      return new ResourceResponse($data);
    } else{

      $data = array(
        'draw' => intval($_GET['draw']),
        'recordsTotal' => 0,
        'recordsFiltered' => 0,
        'data' => '',
      );
      return new ResourceResponse($data);

    }


  // Throw an exception if it is required.
  // throw new HttpException(t('Throw an exception if it is required.'));
  return new ResourceResponse("Implement REST State GET!");
} else {

  $data = array(
    'draw' => intval($_GET['draw']),
    'recordsTotal' => 0,
    'recordsFiltered' => 0,
    'data' => '',
  );
  return new ResourceResponse($data);




}


}

public function getProducts($result) {

  $products = Node::loadMultiple($result);
  $total_images = 0;
  $data = array();


  foreach ($products as $current_product) {

      $pid = $current_product->id();

      $GTIN_val = $current_product->title->getValue();
      if ($GTIN_val) {
        $GTIN = $GTIN_val[0]['value'];
      }


      $product_title_val = $current_product->field_product_title->getValue();
      if ($product_title_val) {
        $product_title = $product_title_val[0]['value'];
      }

      $product_category_val = $current_product->field_product_category->getValue();
      if ($product_category_val) {
        $product_category = $product_category_val[0]['value'];
      }

      $product_color_val = $current_product->field_product_color->getValue();
      if ($product_color_val) {
        $product_color = $product_color_val[0]['value'];
      }

      $product_size_val = $current_product->field_product_size->getValue();
      if ($product_size_val) {
        $product_size = $product_size_val[0]['value'];
      }

      $product_jira_val = $current_product->field_jira_reference->getValue();
      if ($product_jira_val) {
        $product_jira = $product_jira_val[0]['value'];
      }

      $product_seller_val = $current_product->field_seller_name->getValue();
      if ($product_seller_val) {
        $product_seller = $product_seller_val[0]['value'];
      }

      $view_link = '<a class="btn btn-xs " href="/view-product/' . $pid . '">View</a>';

      $data[] = array(
        $GTIN,
        $product_title,
        $product_category,
        $product_seller,
        $product_color,
        $product_size,
        $product_jira,
      );


  }


  return $data;
}





}
