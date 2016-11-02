<?php

/**
 * @file
 * Contains \Drupal\studiobridge_commons\Controller\NotificationActionController.
 */

namespace Drupal\studiobridge_commons\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Class NotificationActionController.
 *
 * @package Drupal\studiobridge_commons\Controller
 */
class NotificationActionController extends ControllerBase {
  /**
   * Hello.
   *
   * @return string
   *   Return Hello string.
   */
  public function action($id) {

    $StudioNotifications = \Drupal::service('studio.notifications');
    $StudioNotifications->UpdateNotificationStatus($id, 'closed');
    $link = $_GET['link'];

    $url_object = \Drupal::service('path.validator')->getUrlIfValid($link);
    $url_object->setAbsolute();
    $url = $url_object->toString();
    return (new RedirectResponse($url))->send();
  }

}
