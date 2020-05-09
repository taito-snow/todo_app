$(function() {
    'use strict';

    $('#new_todo').focus();

    // update state
    $('#todos').on('click', '.update_todo', function() {
        // idを取得
        var id = $(this).parent('li').data('id');
        // ajex処理
        $.post('_ajex.php', {
            id: id,
            mode: 'update',
            token: $('#token').val()
        }, function(res) {
            if (res.state === '1') {
                $('#todo_'+id).find('.todo_title').addClass('done');
            } else {
                $('#todo_'+id).find('.todo_title').removeClass('done');

            }
        });
    });

    // update star
    $('#todos').on('click', '.star', function() {
        // idを取得
        var id = $(this).parent('li').data('id');
        // ajex処理
        $.post('_ajex.php', {
            id: id,
            mode: 'update_star',
            token: $('#token').val()
        }, function(res) {
            if (res.star === '1') {
                $('#star_'+id).addClass('important');
            } else {
                $('#star_'+id).removeClass('important');
            }
        });
    });

    // delete
    $('#todos').on('click', '.delete_todo', function() {
        // idを取得
        var id = $(this).parent('li').data('id');
        // ajex処理
        if (confirm('削除して良いですか?')) {
            $.post('_ajex.php', {
                id: id,
                mode: 'delete',
                token: $('#token').val()
            }, function() {
                $('#todo_'+id).fadeOut(800);
            });
        }
    });

    // create
    $('#new_todo_form').on('submit', function() {
        // titleを取得
        var title = $('#new_todo').val();
        // ajex処理
        $.post('_ajex.php', {
            title: title,
            mode: 'create',
            token: $('#token').val()
        }, function(res) {
            // liを追加
            var $li = $('#todo_template').clone();
            $li
              .attr('id', 'todo_' + res.id)
              .data('id', res.id)
              .find('.todo_title').text(title);
            $li.find('.star').attr('id', 'star_' + res.id);
            $('#todos').prepend($li.fadeIn());
            $('#new_todo').val('').focus();
        });
        return false;
    });

});