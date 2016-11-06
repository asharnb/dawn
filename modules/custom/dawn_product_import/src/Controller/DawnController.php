<?php

/**
 * @file
 * Contains \Drupal\dawn_product_import\Controller\DawnController.
 */

namespace Drupal\dawn_product_import\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class DawnController.
 *
 * @package Drupal\dawn_product_import\Controller
 */
class DawnController extends ControllerBase {
  /**
   * Action.
   *
   * @return string
   *   Return Hello string.
   */
  public function action() {
    return [
        '#type' => 'markup',
        '#markup' => $this->t('Implement method: action')
    ];
  }

}
