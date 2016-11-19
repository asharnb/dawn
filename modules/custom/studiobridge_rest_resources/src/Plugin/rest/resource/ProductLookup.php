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
*   id = "product_lookup",
*   label = @Translation("Product lookup"),
*   uri_paths = {
*     "canonical" = "/product/lookup/{GTIN}"
*   }
* )
*/
class ProductLookup extends ResourceBase {
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
public function get($GTIN_num) {

  //return new ResourceResponse($_GET);

  \Drupal::service('page_cache_kill_switch')->trigger();

  $product_data = array();


  $current_product_val = objectToArraypl(db_query("select * from production_data
  WHERE product_gtin='$GTIN_num'
  ")->fetchAll());


  //load all the nodes from the result
  if ($current_product_val) {

    $current_product = $current_product_val[0];
    // $products = $this->getProduct($result);

    $GTIN_val = $current_product['product_gtin'];
    if ($GTIN_val) {
      $$product_gtin = $GTIN_val;
    }


    $product_title_val = $current_product['product_title'];
    if ($product_title_val) {
      $product_title = $product_title_val;
    }

    $product_supsku_val = $current_product['product_supplier_sku'];
    if ($product_supsku_val) {
      $product_supsku = $product_supsku_val;
    }


    $product_category_val = $current_product['product_category'];
    if ($product_category_val) {
      $product_category = $product_category_val;
    }

    $product_color_val = $current_product['product_color_name'];
    if ($product_color_val) {
      $product_color = $product_color_val;
    }

    $product_size_val = $current_product['product_size'];
    if ($product_size_val) {
      $product_size = $product_size_val;
    }

    $product_jira_val = $current_product['product_jira_number'];
    if ($product_jira_val) {
      $product_jira = $product_jira_val;
    }

    $product_seller_val = $current_product['product_seller_name'];
    if ($product_seller_val) {
      $product_seller = $product_seller_val;
    }

    $product_brand_val = $current_product['product_brand_name'];
    if ($product_brand_val) {
      $product_brand = $product_brand_val;
    }

    // var_dump($current_product);
    // die();

    $data = array(
      'base_product' => $product_supsku,
      'brand' => $product_brand,
      'title' => $product_title,
      'gender' => 'Male',
      'department' => $product_category,
      'description' => '',
      'color_variant' => $$product_gtin,
      'color_name' => $product_color,
      'size_variant' => $$product_gtin,
      'size_name' => $product_size,
    );


      return new ResourceResponse($data);



    }
else {

  $data = array(
    'response' => 'Product not found',
  );
  return new ResourceResponse($data);




}

}

}

function objectToArraypl($data) {
    if (is_object($data))
        $data = get_object_vars($data);
    if (is_array($data))
        return array_map(__FUNCTION__, $data);
    return $data;
}
