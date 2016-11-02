<?php

namespace Drupal\studiobridge_commons;

use \Drupal\node\Entity\Node;


Class Sessions {

  /*
   * Helper function, to return open session for current loggedIn photographer.
   */
  public static function openSessionRecent($status=array('open')) {
    // Get current logged in user.
    $user = \Drupal::currentUser();
    // Get uid of user.
    $uid = $user->id();

    $result = \Drupal::entityQuery('node')
      ->condition('type', 'sessions')
      ->sort('created', 'DESC')
//      ->condition('field_status', 'open') // todo : poc on structure.
      ->condition('field_status', $status,'IN') // todo : poc on structure.
      ->condition('uid', $uid)
      ->range(0, 1)
      ->execute();
    if (count($result)) {
      return $node_id = reset($result);
    }
    return FALSE;
  }

  /*
   * Helper function, to get session by its author.
   *
   * @param uid
   *   User uid.
   */
  public static function getSessionByUid($uid) {
    return \Drupal::entityQuery('node')
      ->condition('type', 'sessions')
      ->sort('created', 'DESC')
      ->condition('field_status', 'open') // todo : poc on structure.
      ->condition('uid', $uid)
      ->range(0, 1)
      ->execute();
  }

  /*
   * Helper function, to return all open sessions.
   */
  public static function openSessionsAll() {
    $result = \Drupal::entityQuery('node')
      ->condition('type', 'sessions')
      ->sort('created', 'DESC')
      ->condition('field_status', 'open') // todo : poc on structure.
      ->range(0, 100)
      ->execute();
    return $result;
  }

  /*
   * Helper function, to update last scanned product to session.
   *
   * @param session_id
   *   nid of session.
   * @param product
   *   product node object.
   */
  public static function UpdateLastProductToSession($session_id, $product){

    // Load session object.
    $session = Node::load($session_id);

    $color_variant = NULL;
    $concept = NULL;

    if(is_object($product) && $session){
      // Get mapped or unmapped product.
      $bundle = $product->bundle();

      if($bundle == 'products'){

        // Get color variant.
        $product_color_variant = $product->field_color_variant->getValue();
        if($product_color_variant){
          $color_variant = $product_color_variant[0]['value'];
        }
        if(!$color_variant){
          $title = $product->title->getValue();
          if($title) {
            $color_variant = $title[0]['value'];
          }
        }

        // Get concept name.
        $product_concept = $product->field_concept_name->getValue();
        if($product_concept){
          $concept = $product_concept[0]['value'];
        }

      }elseif($bundle == 'unmapped_products'){

        // Set concept as unmapped.
        $concept = 'Unmapped';

        $field_identifier = $product->field_identifier->getValue();
        $title = $product->title->getValue();
        if ($field_identifier) {
          $color_variant = $field_identifier[0]['value'];
        }elseif ($title) {
          $color_variant = $title[0]['value'];
        }

      }

      // Set values to session.
      $session->field_color_variant->setValue($color_variant);
      $session->field_concept_name->setValue($concept);
      $session->save();
    }

  }


  /*
 * Helper function, to add reshot product to session.
 *
 * @param session_id
 *   Session node nid.
 * @param node
 *   Node object.
 */
  public static function addReshootProductToSession($session_id, $node) {
    // Load session node object.
    $session_node = Node::load($session_id);
    // Get products from session node.
    $session_products = $session_node->field_reshoot_product->getValue();
    // Get product nid.
    $product_nid = $node->id();

    // Check for this product already exist in the current session.
    // todo : other logs and property settings may come here
    $product_exist = FALSE;
    if (count($session_products)) {
      foreach ($session_products as $each) {
        if ($each['target_id'] == $product_nid) {
          $product_exist = TRUE;
          break;
        }
      }
    }
    if (!$product_exist) {
      // Prepare product array.
      $product = array(
        array(
          'target_id' => $product_nid
        )
      );

      // merge the current product to existing products.
      $products = array_merge($product, $session_products);

      // add the product to field.
      $session_node->field_reshoot_product->setValue($products);
      // save the node.
      $session_node->save();
    }
  }

  /*
   * Helper function to get session period.
   *  formula : sum of all periods time.
   *
   * @param pid
   *   Product node nid.
   */
  public static function CalculateSessionPeriod($sid) {
    $secs = 0;
    $result = db_select('studio_product_shoot_period', 'spsp')
      ->fields('spsp', array('start', 'end'))
      ->condition('spsp.sid', $sid)
      ->range(0, 1000);
    $product_period = $result->execute()->fetchAll();
    if ($product_period) {
      foreach ($product_period as $period) {
        // check still product closed or not. ie., end time 0 or timestamp
        if ($period->end) {
          $diff = $period->end - $period->start;
          $secs += $diff;
        }
      }
    }
    return $secs;
  }

}