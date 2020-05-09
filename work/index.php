<?php

session_start();

require_once(__DIR__ . '/functions.php');
require_once(__DIR__ . '/todo.php');

// get todos
$todoApp = new \MyApp\Todo();
$todos = $todoApp->getAll();

// var_dump($todos);
// exit;

?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>タスク管理</title>
  <link rel="stylesheet" href="./style.css">
  <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
</head>
<body>
  <div id="container">
    <h1>タスク管理</h1>
    <form action="" id="new_todo_form">
      <input type="text" id="new_todo" placeholder="新規のタスクを入力してください。">
    </form>
    <ul id="todos">
    <?php foreach ($todos as $todo): ?>
      <li id="todo_<?= h($todo['id']); ?>" data-id="<?= h($todo['id']); ?>">
        <input type="checkbox" class="update_todo" <?php if($todo['state'] === '1'){ echo 'checked';} ?>>
        <i id="star_<?= h($todo['id']); ?>" class="fas fa-star star <?php if($todo['star'] === '1'){ echo 'important';} ?>"></i>
        <span class="todo_title <?php if($todo['state'] === '1'){ echo 'done';} ?>"><?php echo h($todo['title']);?></span>
        <div class="delete_todo">×</div>
      </li>
    <?php endforeach; ?>
      <li id="todo_template" data-id="">
        <input type="checkbox" class="update_todo">
        <i class="fas fa-star star"></i>
        <span class="todo_title"></span>
        <div class="delete_todo">×</div>
      </li>
    </ul>
  </div>
  <input type="hidden" id="token" value="<?= h($_SESSION['token']); ?>">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  <script src="./todo.js"></script>
</body>
</html>