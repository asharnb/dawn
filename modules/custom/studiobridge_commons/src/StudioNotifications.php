<?php

/**
 * @file
 * Contains \Drupal\studiobridge_commons\StudioNotifications.
 */

namespace Drupal\studiobridge_commons;

use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Database\Connection;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use \Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;
use Drupal\Core\State\StateInterface;


/**
 * Class StudioNotifications.
 *
 * @package Drupal\studiobridge_commons
 */
class StudioNotifications implements StudioNotificationsInterface {
  /**
   * The database service.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * The node storage service.
   */
  protected $nodeStorage;

  /**
   * The user storage service.
   */
  protected $userStorage;

  /**
   * The entity type manager service.
   */
  protected $entityTypeManager;

  /**
   * The current user service.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $currentUser = array();

  /**
   * The entity query factory.
   *
   * @var \Drupal\Core\Entity\Query\QueryFactory
   */
  protected $queryFactory;

  /**
   * The state.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * The user storage service.
   */
  protected $fileStorage;

  protected $StudioQc;

  /**
   * Constructor.
   */
  public function __construct(Connection $database, EntityTypeManager $entityTypeManager, AccountProxyInterface $current_user, QueryFactory $query_factory, StateInterface $state) {

    $this->entityTypeManager = $entityTypeManager;

    $this->nodeStorage = $entityTypeManager->getStorage('node');
    $this->userStorage = $entityTypeManager->getStorage('user');
    $this->fileStorage = $entityTypeManager->getStorage('file');

    $this->database = $database;
    $this->currentUser = $current_user;
    $this->queryFactory = $query_factory;
    $this->state = $state;

    $this->StudioQc = \Drupal::service('studio.qc');

  }

  /*
    * Helper function, to insert notification into {studio_notifications} table.
    *
    * @param message
    *   message.
    * @param link
    *   link to redirect to take action.
    * @param to_uid
    *   reliever uid.
    */
  public function AddNotification($message, $link, $to_uid, $status='open') {
    $uid = $this->currentUser->id();
    $this->database->insert('studio_notifications')
      ->fields(array(
        'uid' => $uid,
        'message' => $message,
        'link' => $link,
        'to_uid' => $to_uid,
        'created' => REQUEST_TIME,
        'status' => $status
      ))
      ->execute();
  }

  /*
   * Helper function, to delete notification from {studio_notifications} table.
   *
   * @param id
   *   id of {studio_file_transfers} table row.
   */
  public function DeleteNotification($id) {
    $this->database->delete('studio_notifications')
      ->condition('fid', $id)
      ->execute();
  }


  /*
   * Helper function, to get notification by user id.
   *
   * @param uid
   *
   */
  public function GetNotificationsByUser($uid, $limit = 5, $fields= array('id','message','link','created')){
    $result = $this->database->select('studio_notifications', 'sn')
      ->fields('sn', $fields)
      ->condition('sn.to_uid', $uid)->range(0, $limit)->orderBy('sn.id', 'desc');
    return $result->execute()->fetchAll();
  }

  /*
 * Helper function, to get notification by user id.
 *
 * @param uid
 *
 */
  public function GetNotificationsByUserAndStatus($uid, $status='open', $limit = 5, $fields= array('id','message','link','created')){
    $result = $this->database->select('studio_notifications', 'sn')
      ->fields('sn', $fields)
      ->condition('sn.to_uid', $uid)
      ->condition('sn.status', $status)->range(0, $limit)->orderBy('sn.id', 'desc');
    return $result->execute()->fetchAll();
  }

  /*
   * Helper function, to update notification
   *
   * @param id
   *  id of notification
   * @param status
   *  status of notification
   */
  public function UpdateNotificationStatus($id, $status){
    $fields = array(
      'status' => $status,
    );

    $this->database->update('studio_notifications')
      ->fields($fields)
      ->condition('id', $id)->execute();
  }

}
