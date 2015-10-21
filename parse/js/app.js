/*
    script for the index.html file
*/
Parse.initialize("82lMnxZmrTmGsVnGXAdxjamCwkyG7wLW9UXVde33", "84gs7HBQKk5uCSkSGdTujo8rdcYTcbmrs9A2W95X");
$(function(){
    'use strict';

    // new Task class for parse
    var Task = Parse.Object.extend('Task');
    // new query that will return all tasks ordered at createAt
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    var taskList = $('#tasks-list');

    //reference to error message alert Jquery
    var errorMessage = $('#error-message');

    var tasks = [];

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner(){
        $('.fa-spin').hide();
    }


    function clearError() {
        errorMessage.hide();
    }

    function fetchTasks() {
        tasksQuery.find().then(onData, displayError).always(hideSpinner());

    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        taskList.empty();
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(taskList);
        });
    }

    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.save().then(fetchTasks(), displayError).then(function() {
            titleInput.val('');
        });

        return false;
    });
    fetchTasks();

    window.setInterval(fetchTasks, 3000);
});