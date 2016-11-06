<?php

/**
 * @file
 * Contains \Drupal\dawn_product_import\Tests\DawnController.
 */

namespace Drupal\dawn_product_import\Tests;

use Drupal\simpletest\WebTestBase;

/**
 * Provides automated tests for the dawn_product_import module.
 */
class DawnControllerTest extends WebTestBase {
  /**
   * {@inheritdoc}
   */
  public static function getInfo() {
    return array(
      'name' => "dawn_product_import DawnController's controller functionality",
      'description' => 'Test Unit for module dawn_product_import and controller DawnController.',
      'group' => 'Other',
    );
  }

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();
  }

  /**
   * Tests dawn_product_import functionality.
   */
  public function testDawnController() {
    // Check that the basic functions of module dawn_product_import.
    $this->assertEquals(TRUE, TRUE, 'Test Unit Generated via App Console.');
  }

}
