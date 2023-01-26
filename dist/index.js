"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

_dotenv["default"].config();

var todos = [{
  id: 1,
  title: 'some title',
  completed: false,
  priority: 3
}, {
  id: 2,
  title: 'some title',
  completed: false,
  priority: 2
}];
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get('/status', function (req, res) {
  res.send({
    status: 'Project11 Active'
  });
});
app.get('/todos', function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'Retrieved all todos',
    data: todos
  });
});
app.get('/todos/:id', function (req, res) {
  var matchTodo = todos.find(function (todo) {
    return todo.id === parseInt(req.params.id, 10);
  });

  if (matchTodo) {
    return res.status(200).json({
      status: 200,
      message: 'Fetched todo successful',
      data: matchTodo
    });
  }

  res.sendStatus(404);
});
app["delete"]('/todos/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);
  var newTodo = todos.find(function (todo) {
    return todo.id === id;
  });
  todos.splice(todos.indexOf(newTodo), 1);
  res.sendStatus(204);
}); // HOMEWORK: create a route to modify one todo

app.patch('/todos/:todoId', function (req, res) {
  var todoId = parseInt(req.params.todoId, 10);
  var updatedTodo = req.body; // eslint-disable-next-line no-restricted-syntax

  var _iterator = _createForOfIteratorHelper(todos),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var todo = _step.value;

      if (todo.id === todoId) {
        todo.id = parseInt(updatedTodo.id, 10) || todo.id;
        todo.title = updatedTodo.title || todo.title;
        todo.completed = updatedTodo.completed || todo.completed;
        todo.priority = updatedTodo.priority || todo.priority;
        return res.json({
          status: 200,
          message: 'todo updated successfully',
          data: todo
        });
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  res.status(404).json({
    status: 404,
    message: 'No found with the given id'
  });
});
app.post('/todos', function (req, res) {
  var todo = {
    id: parseInt(req.body.id, 10),
    title: req.body.title,
    priority: parseInt(req.body.priority, 10),
    completed: req.body.completeds
  };
  todos.push(todo);
  res.status(201).json({
    status: 201,
    message: 'Todo successfully created',
    data: todo
  });
});
app.listen(process.env.PORT, function () {
  // eslint-disable-next-line no-console
  console.log("App running on PORT: ".concat(process.env.PORT));
});
var _default = app;
exports["default"] = _default;