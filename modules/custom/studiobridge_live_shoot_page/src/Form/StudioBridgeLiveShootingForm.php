<?php

/**
* @file
* Contains Drupal\studiobridge_live_shoot_page\StudioBridgeLiveShootingForm
*
* @Note : As of now this are only development code
*/

namespace Drupal\studiobridge_live_shoot_page\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use \Drupal\node\Entity\Node;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Entity;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Database\Connection;

class StudioBridgeLiveShootingForm extends FormBase {
  /**
  * The database service.
  *
  * @var \Drupal\Core\Database\Connection
  */
  protected $database;

  protected $nodeStorage;

  protected $userStorage;

  protected $current_user;

  protected $StudioProducts;

  protected $StudioSessions;

  protected $StudioCommons;

  protected $StudioImgs;

  protected $entityQuery;

  /**
  * The state.
  *
  * @var \Drupal\Core\State\StateInterface
  */
  protected $state;


  /*
  * {@inheritdoc}
  */
  public static function create(ContainerInterface $container) {
    return new static($container->get('database'), $container->get('entity_type.manager'), $container);
  }

  /**
  * {@doc}
  */
  public function __construct(Connection $database, $entity_manager, $container) {
    $this->database = $database;
    $this->nodeStorage = $entity_manager->getStorage('node');
    $this->userStorage = $entity_manager->getStorage('user');
    $this->current_user = $container->get('current_user');

    $this->StudioProducts = $container->get('studio.products');
    $this->StudioSessions = $container->get('studio.sessions');
    $this->StudioImgs =  $container->get('studio.imgs');

    $this->state = $container->get('state');

    $this->entityQuery = $container->get('entity.query');
  }

  /**
  * Returns a unique string identifying the form.
  *
  * @return string
  *   The unique string identifying the form.
  */
  public function getFormId() {
    return 'studiobridge_live_shoot_form';
  }

  /**
  * Form constructor.
  *
  * @param array $form
  *   An associative array containing the structure of the form.
  * @param \Drupal\Core\Form\FormStateInterface $form_state
  *   The current state of the form.
  *
  * @return array
  *   The form structure.
  */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $uid = $this->currentUser()->id();

    // current open session
    $session_id = $this->StudioSessions->openSessionRecent(array('open', 'pause'));

    // if no session found then redirect to some other page
    if (!$session_id) {
      drupal_set_message('No open sessions found', 'warning');
      return new RedirectResponse(base_path() . 'view-sessions2');
    }

    $new_or_old_product_nid = 0;

    $identifier_hidden = $this->state->get('last_scan_product_' . $uid . '_' . $session_id, FALSE);

    if(!$identifier_hidden){
      $record = $this->StudioProducts->getLastScannedProduct($session_id, 0);
      if($record){
        $identifier_hidden = $record['identifier'];
      }
    }

    $this->StudioSessions->AddEndTimeToSession($session_id,1,1);

    // todo : identifier might available in query
    // todo : get default product (current open product last)
    if (!empty($_GET['identifier']) && isset($_GET['reshoot']) && ($identifier_hidden != $_GET['identifier'])) {
      $identifier_hidden = $_GET['identifier'];

      $result = $this->StudioProducts->getProductByIdentifier($_GET['identifier']);

      if ($result) {
        $new_or_old_product_nid = reset($result);
      }
      else {
        drupal_set_message('Invalid identifier', 'warning');
        return new RedirectResponse(base_path());
      }

      if ($new_or_old_product_nid) {

        $last_scan_product = $this->state->get('last_scan_product_' . $uid . '_' . $session_id, FALSE);

        if(!$last_scan_product){
          $record = $this->StudioProducts->getLastScannedProduct($session_id, 0);
          if($record){
            $last_scan_product = $record['identifier'];
          }
        }

        $this->StudioProducts->AddEndTimeToProduct($session_id, FALSE, $last_scan_product);


        $this->state->set('last_scan_product_nid' . $uid . '_' . $session_id, $new_or_old_product_nid);

        $this->StudioProducts->updateProductState($_GET['identifier'], 'open');


        $this->state->set('last_scan_product_' . $uid . '_' . $session_id, $_GET['identifier']);

        $this->StudioProducts->insertProductImportRecord($_GET['identifier'], $new_or_old_product_nid, $session_id, 0);

        $product_obj = $this->nodeStorage->load($new_or_old_product_nid);


        // Add product to session.
        $this->StudioSessions->UpdateLastProductToSession($session_id, $product_obj);

        // Add reshoot product to session.
        $this->StudioSessions->addReshootProductToSession($session_id, $product_obj);

        // Add product to session; todo : double check workflow other things are working fine.
        $this->StudioProducts->addProductToSession($session_id, $product_obj);

        $this->StudioProducts->AddStartTimeToProduct($session_id, $new_or_old_product_nid);

        // if reshoot that means product under scan state closing ofter above process was done.
        $this->state->set('productscan_' . $session_id, FALSE);

        // todo test all functions are
        return new RedirectResponse(base_path() . 'live-shooting-page1');

      }


    }
    else {
      $result = $this->StudioProducts->getProductByIdentifier($identifier_hidden);
      if ($result) {
        $new_or_old_product_nid = reset($result);
      }
    }

    $StudioModels = \Drupal::service('studio.models');
    $models = $StudioModels->getModelsBySession($session_id);

    $identifier = $identifier_hidden;

    $form['session'] = array(
      '#type' => 'hidden',
      '#value' => $session_id,
      '#default_value' => $session_id,

    );
    $form['identifier'] = array(
      '#type' => 'textfield',
      '#default_value' => $identifier,
      '#title' => t(''),


    );

    $form['models'] = array(
      '#models' => $models,


    );

    $form['identifier_hidden'] = array(
      '#type' => 'hidden',
      '#value' => $identifier_hidden,
      '#default_value' => $identifier_hidden,
    );
    $form['identifier_nid'] = array(
      '#type' => 'hidden',
      '#value' => $new_or_old_product_nid,
      '#default_value' => $new_or_old_product_nid,
    );

    $images = array();
    $pid = $this->state->get('last_scan_product_nid' . $uid . '_' . $session_id, FALSE);

    if(!$pid){
        $record = $this->StudioProducts->getLastScannedProduct($session_id, 0);
        if($record){
          $pid = $record['pid'];
        }
    }

    if ($pid) {
      $images = $this->StudioProducts->getProductImages($pid);
    }
    else {
      $result = $this->StudioProducts->getProductByIdentifier($identifier);
      if ($result) {
        $images = $this->StudioProducts->getProductImages(reset($result));
      }
    }
    // @ashar : seperate this image container so we can apply theme formatting to it

    $form['resequence'] = array(
      '#markup' => '<a id="studio-resequence-bt" class="btn btn-xs" disabled>Resequence</a>',
    );
    $form['delete'] = array(
      '#markup' => '<a id="studio-delete-bt" class="btn btn-xs" disabled>Delete</a>',
    );
    $form['misc'] = array(
      '#markup' => '<div id="studio-img-container"></div><div id="js-holder"></div><div id="msg-up"></div>',
    );
    $form['spinner'] = array (
      '#markup' => '<span id="spinner-holder" class="hidden"><img src="/themes/studiobridge/images/spinner.gif"></span>',
    );
    $form['random_user'] = array(
      '#type' => 'button',
      '#value' => 'Apply',
      '#attributes' => array('class' => array('hidden')),
      '#ajax' => array(
        'callback' => [get_class($this), 'productGetOrUpdateCallback'],
        'event' => 'click',
        'progress' => array(
          'type' => 'throbber',
    ),

      ),
    );

    $deleted_imgs_count = $this->StudioImgs->getDeletedImgsCount($new_or_old_product_nid);

    $productdetails = $this->StudioProducts->getProductInformation($identifier_hidden);

    if ($productdetails) {
      $session = $this->nodeStorage->load($session_id);
      $session_products = $session->field_product->getValue();
      $pids = array();
      $p_drafts = array();
      $unm = array();
      if($session_products){
        foreach($session_products as $v){
          $pids[] = $v['target_id'];
        }
      }


      if($pids){

        $p_drafts = $this->entityQuery->get('node')
          ->condition('type', array('unmapped_products','products'), 'IN')
          ->condition('field_draft',1)
          ->condition('nid',$pids,'IN')
          ->count()->execute();

        $unm = $this->entityQuery->get('node')
          ->condition('type', 'unmapped_products')
          ->condition('nid',$pids,'IN')
          ->count()->execute();

      }

      $product_state =  '';
      if($new_or_old_product_nid){
        $product_obj = $this->nodeStorage->load($new_or_old_product_nid);
        // Get product state.
        $product_state = 'New';
        $duplicates = $this->StudioProducts->checkProductDuplicate($new_or_old_product_nid, array('sessions'));
        if(count($duplicates) > 1){
          $product_state = 'Reshoot';
        }
        $field_draft = $product_obj->field_draft->getValue();
        if($field_draft){
          if($field_draft[0]['value']){
            $product_state = 'Dropped';
          }
        }
      }

      $form['productdetails'] = array(
        '#concept' => $productdetails['concept'],
        '#styleno' => $productdetails['styleno'],
        '#colorvariant' => $productdetails['colorvariant'],
        '#gender' => $productdetails['gender'],
        '#color' => $productdetails['color'],
        '#description' => $productdetails['description'],
        '#identifier' => $identifier,
        '#image_count' => $productdetails['image_count'],
        '#image_count_deleted' => $deleted_imgs_count,
        '#total_products' => count($session_products),
        '#dropped_products' => $p_drafts,
        '#unmapped_products' => $unm,
        '#product_state' => $product_state,
      );
    }

    $array_images = array();
    $i = 1;

    if(!empty($images)){
      foreach ($images as $fid => $src) {

        $array_images[] = array(
          'url' => $src['uri'],
          'name' => $src['name'],
          'fid' => $fid,
          'id' => $i,
          'tag' => $src['tag'],
        );
        $i++;


      }
    }

    $form['images'] = array(
      '#images' => $array_images,

    );
    $form['#attributes'] = array();

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $v = $form_state->getValues();
    $form_state->setRebuild(TRUE);

    //drupal_set_message('Nothing Submitted. Just an Example.');
  }

  /*
  * Ajax callback function.
  */
  public function productGetOrUpdateCallback(array &$form, FormStateInterface $form_state) {

    // Load services as it is object context.
    $StudioProducts = \Drupal::service('studio.products');
    $StudioSessions = \Drupal::service('studio.sessions');
    $StudioImgs = \Drupal::service('studio.imgs');
    $state = \Drupal::service('state');
    $current_user = \Drupal::service('current_user');
    $enityQuery = \Drupal::service('entity.query');
    $nodeStorage = \Drupal::service('entity_type.manager')->getStorage('node');

    $uid = $current_user->id();

    // Generate new ajax response object
    $ajax_response = new AjaxResponse();

    // Get current session
    $session_id = $StudioSessions->openSessionRecent();
    // If no session found then redirect to some other page
    if (!$session_id) {
      $same_identifier = '<script>alert("Session in closed/pause state, cannot proceed. Update session and refresh the page.")</script>';
      // return ajax here.
      $ajax_response->addCommand(new HtmlCommand('#js-holder', $same_identifier));
      return $ajax_response;
    }

    $reshoot = FALSE;
    $is_unmapped_product = FALSE;

    //get last product from form
    $identifier = $form_state->getValue('identifier');

    $last_scan_product = $state->get('last_scan_product_' . $uid . '_' . $session_id, FALSE);

    if(!$last_scan_product){
      $record = $StudioProducts->getLastScannedProduct($session_id, 0);
      if($record){
        $last_scan_product = $record['identifier'];
      }
    }

    if (empty(trim($identifier))) {
      //return js with error message

      $inject_script = '<script>
      Command: toastr["error"]("No identifier has been scanned. Please scan the tags to continue.")

      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }

      </script>';
      //
      $ajax_response->addCommand(new HtmlCommand('#smartnotification', $inject_script));
      return $ajax_response;
    }

    //if identifier found in our products then skip importing.
    $result = $StudioProducts->getProductByIdentifier($identifier);

    $state->set('productscan_' . $session_id, TRUE);
    $inject_script_mapping = '';
    if (!$result) {

      // Get product from server
      $product = $StudioProducts->getProductExternal($identifier);
      $product = json_decode($product);

      // validate product
      if (isset($product->msg) || isset($product->message)) {
        // product not found on the server so save it as unmapped product.
        $un_mapped_node = $StudioProducts->createUnmappedProduct(array(), $session_id, $identifier, FALSE, 'photodesk');

        $new_or_old_product_nid = $un_mapped_node->id();
        $is_unmapped_product = TRUE;
        // todo : update product to session.
        $StudioSessions->UpdateLastProductToSession($session_id, $un_mapped_node);

        $inject_script_mapping = '<script>
        Command: toastr["error"]("No mapped product was found with that identifier. An unmapped product has been created instead")

        toastr.options = {
          "closeButton": false,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }

        </script>';
        //

      }
      else {
        // import it in our drupal.
        $new_product = $StudioProducts->createMappedProduct($product, $identifier, 'photodesk');

        $new_or_old_product_nid = $new_product->id();
        $inject_script_mapping = '<script>
        Command: toastr["success"]("New mapped product is found")

        toastr.options = {
          "closeButton": false,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }

        </script>';
      }
    }
    else {
      // todo : code for product re shoot
      $new_or_old_product_nid = reset($result);

      $db = \Drupal::database();
      $sessions_nids = $db->select('node__field_product', 'c')
      ->fields('c')
      ->condition('field_product_target_id', $new_or_old_product_nid)
      ->condition('bundle', 'sessions')
      ->execute()->fetchAll();

      $sessions_nids_in_reshoot_field = $db->select('node__field_reshoot_product', 'c')
        ->fields('c')
        ->condition('field_reshoot_product_target_id', $new_or_old_product_nid)
        ->condition('bundle', 'sessions')
        ->execute()->fetchAll();

      // todo : if count is more than 1
      if (count($sessions_nids)) {
        // $session_id
        foreach ($sessions_nids as $field) {
          if ($field->entity_id != $session_id) {
            $reshoot = TRUE;
            break;
          }
        }
      }
      if (count($sessions_nids_in_reshoot_field)) {
        // $session_id
        foreach ($sessions_nids_in_reshoot_field as $field1) {
          if ($field1->entity_id == $session_id) {
            $reshoot = FALSE;
            break;
          }
        }
      }
      // If current product is reshoot then prompt user to confirm
      if ($reshoot && $_GET['identifier'] !== $identifier) {
        $inject_script = '<script>
        swal({
          title: "Reshoot Product?",
          text: "This product already exists, do you want to reshoot this product?",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Reshoot",
          closeOnConfirm: false
        },function () {
          window.location="' . base_path() . 'live-shooting-page1?reshoot&identifier=' . $identifier . '"
        });
        var d = document.getElementById("spinner-holder");
        d.className = "hidden";

        </script>';
        // return ajax here.
        $ajax_response->addCommand(new HtmlCommand('#js-holder', $inject_script));
        return $ajax_response;
      }

      // update the current product as open status
      $StudioProducts->updateProductState($_GET['identifier'], 'open');

      $StudioProducts->AddStartTimeToProduct($session_id, $new_or_old_product_nid);
    }

    if ($last_scan_product != $identifier) {
      // todo : update last product as closed status
      $StudioProducts->updateProductState($last_scan_product, 'completted');

      $StudioProducts->AddEndTimeToProduct($session_id, FALSE, $last_scan_product);
    }


    $state->set('last_scan_product_' . $uid . '_' . $session_id, $identifier);
    $images = '';

    if ($new_or_old_product_nid) {

      $product_node = $nodeStorage->load($new_or_old_product_nid);

      // Once product is scanned update it to session
      if (!$is_unmapped_product) {
        $StudioProducts->addProductToSession($session_id, $product_node);
      }

      $state->set('last_scan_product_nid' . $uid . '_' . $session_id, $new_or_old_product_nid);

      $StudioProducts->insertProductImportRecord($identifier, $new_or_old_product_nid, $session_id, 0);

      // todo : add product to session.
      $StudioSessions->UpdateLastProductToSession($session_id, $product_node);

      // Add fullshot image to next product; if not exist
      $full_shot_img_fid = $state->get('full_shot' . '_' . $session_id, FALSE);
      if ($full_shot_img_fid) {
        $StudioImgs->FullShootImage($product_node, $full_shot_img_fid);

        $state->set('full_shot' . '_' . $session_id, FALSE);
      }
      $images = $StudioProducts->getProductImages($product_node, false, true);
    }


    $block = '<div id="imagecontainer" name="imagecontainer" class="ui-sortable">';
    $i = 1;

    if(!empty($images)){
    foreach ($images as $fid => $src) {
      $block .= '<div class="bulkviewfiles imagefile" id="warpper-img-' . $fid . '">';

      if ($src['tag'] != 1) {
        $block .= '<div class="ribbon" id="ribboncontainer"><span class="for-tag" id="seq-' . $fid . '" name="' . $i . '">' . $i . '</span></div>';
      }
      else {
        $block .= '<div class="ribbon" id="ribboncontainer"><span data-id="'.$fid.'" class="for-tag tag" id="seq-' . $fid . '" name="' . $i . '"><i class="fa fa-lg fa-barcode txt-color-white"></i></span></div>';
      }

      $block .= '<div class="scancontainer"> <div class="hovereffect">';
      $block .= '<img src="' . $src['uri'] . '" class="scanpicture" data-imageid="' . $fid . '">';
      $block .= '<div class="overlay">
      <input type="checkbox" class="form-checkbox" id="del-img-' . $fid . '" hidden value="' . $fid . '">
      <a class="info select-delete" data-id="' . $fid . '" data-click="no">Select image</a>
      </div>';

      $block .= '</div>';

      $block .= '<div class="file-name">';
      $block .= '<div id="tag-seq-img-' . $fid . '" type="hidden"></div>';

      $block .= '<div class="row">';

      $block .= '<div class="col col-sm-12">
      <span id= "' . $fid . '" >
      <a class="col-sm-4 text-info" href="/file/'.$fid.'" target="_blank"><i class="fa fa-lg fa-fw fa-search"></i></a>
      <a class="col-sm-4 studio-img-fullshot text-info"><i class="fa fa-lg fa-fw fa-copy"></i></a>
      <a class=" col-sm-4 studio-img-tag text-info" ><i class="fa fa-lg fa-fw fa-barcode"></i></a>
        </span>
        </div>';

      $block .= '</div>';
      $block .= '</div>';
      $block .= '</div>';
      $block .= '<div class="studio-img-weight"><input type="hidden" value="' . $fid . '"></div>';
      $block .= '</div>';
      $i++;
    }
  }
    $block .= '</div>';


    $ajax_response->addCommand(new HtmlCommand('#imagecontainer-wrapper', $block));
    $ajax_response->addCommand(new HtmlCommand('#studio-img-container', ''));
    $ajax_response->addCommand(new InvokeCommand('#edit-identifier-hidden', 'val', array($identifier)));
    $ajax_response->addCommand(new InvokeCommand('#edit-identifier-nid', 'val', array($new_or_old_product_nid)));
    $ajax_response->addCommand(new InvokeCommand('#edit-identifier-hidden', 'change'));


    // update in product details section   todo : later remove it @ ashar

    $productdetails = $StudioProducts->getProductInformation($identifier);

    if ($productdetails) {
      $session = $nodeStorage->load($session_id);
      $session_products = $session->field_product->getValue();

      if(strtolower($productdetails['concept']) == 'unmapped'){
        $concept_image = '<strong>Not Available</strong>';
      } else {
        $concept_image = "<img src='/themes/studiobridge/images/brands/brand_logo_".strtolower($productdetails['concept']).".png' height='20px'>";
      }


      $pids = array();
      $p_drafts = array();
      $unm = array();
      if($session_products){
        foreach($session_products as $v){
          $pids[] = $v['target_id'];
        }
      }


      if($pids){

        $p_drafts = $enityQuery->get('node')
          ->condition('type', array('unmapped_products','products'), 'IN')
          ->condition('field_draft',1)
          ->condition('nid',$pids,'IN')
          ->count()->execute();

        $unm = $enityQuery->get('node')
          ->condition('type', 'unmapped_products')
          ->condition('nid',$pids,'IN')
          ->count()->execute();
      }

      $imgs_deleted = $StudioImgs->getDeletedImgsCount($new_or_old_product_nid);


      $product_state =  'New';
      $model_alert= '';
      if($new_or_old_product_nid){
        if(is_object($product_node)){
          $product_obj = $product_node;
        }else{
          $product_obj = $nodeStorage->load($new_or_old_product_nid);
        }
        // Get product state.
        $product_state = 'New';
        $duplicates = $StudioProducts->checkProductDuplicate($new_or_old_product_nid, array('sessions'));
        if(count($duplicates) > 1){
          $product_state = 'Reshoot';
        }
        $field_draft = $product_obj->field_draft->getValue();
        if($field_draft){
          if($field_draft[0]['value']){
            $product_state = 'Dropped';
          }
        }

        $bundle = $product_obj->bundle();
        if($bundle == 'products'){
          $product_gender = $product_obj->field_gender->getValue();
          $product_gender = $product_gender[0]['value'];
          $session_model = $session->field_models->getValue();
          if(isset($session_model[0]['target_id'])){
            $model = $nodeStorage->load($session_model[0]['target_id']);
            $model_gender = $model->field_model_gender->getValue();
            $gender_matched = false;
            // 0-female 1-male
            //Men,Women,Boys,Boys,Girls  - values available in Products
            if(isset($model_gender[0]['value'])){
              $model_gender = $model_gender[0]['value'];

              if($model_gender == 0){
                if(strtolower($product_gender) == 'female' || strtolower($product_gender) == 'girls' || strtolower($product_gender) == 'women'){
                  $gender_matched = true;
                }
              }else{
                if(strtolower($product_gender) == 'male' || strtolower($product_gender) == 'boys' || strtolower($product_gender) == 'men'){
                  $gender_matched = true;
                }
              }

              if(!$gender_matched){
                $model_alert = '<script>
                swal({
                    title: "Model gender mismatch",
                    text: "Model gender not matched with product gender",
                    type: "warning",
                    showConfirmButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: true,
                    timer:5000
                });

                    </script>';
              }
            }
          }

        }

      }

      $ajax_response->addCommand(new HtmlCommand('#dd-identifier', $identifier));
      $ajax_response->addCommand(new HtmlCommand('#dd-styleno', $productdetails['styleno']));
      $ajax_response->addCommand(new HtmlCommand('#dd-concept', $concept_image));
      $ajax_response->addCommand(new HtmlCommand('#dd-colorvariant', $productdetails['colorvariant']));
      $ajax_response->addCommand(new HtmlCommand('#dd-gender', $productdetails['gender']));
      $ajax_response->addCommand(new HtmlCommand('#dd-color', $productdetails['color']));
      $ajax_response->addCommand(new HtmlCommand('#dd-description', $productdetails['description']));
      $ajax_response->addCommand(new HtmlCommand('#session-total-products', count($session_products)));

      $ajax_response->addCommand(new HtmlCommand('#liveshoot-Unmapped', $unm));
      $ajax_response->addCommand(new InvokeCommand('#liveshoot-drop', 'val', array($p_drafts)));

      $ajax_response->addCommand(new InvokeCommand('#product-img-count', 'html', array($productdetails['image_count'])));
      $ajax_response->addCommand(new InvokeCommand('#product-img-count-deleted', 'html', array($imgs_deleted)));
      $ajax_response->addCommand(new InvokeCommand('#product-state', 'html', array($product_state)));

      $ajax_response->addCommand(new HtmlCommand('#smartnotification', $inject_script_mapping.' '.$model_alert));

      $ajax_response->addCommand(new InvokeCommand('#spinner-holder', 'addClass', array('hidden')));
      //$ajax_response->addCommand(new InvokeCommand('#edit-identifier', 'removeAttr', array('disabled')));

    }

    $state->set('productscan_' . $session_id, FALSE);

    return $ajax_response;
  }

}
