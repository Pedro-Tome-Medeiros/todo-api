const Todo = require('../models/todo');

exports.createTodo = (req, res, next) => {
  const todo = new Todo(req.body);

  return todo
    .save()
    .then((createTodo) => {
      res.status(201).json(createTodo);
    })
    .catch((error) => {
      res.status(500).json({
        status: 'Error',
        message: 'Error in DB Operation!',
        error: error
      });
    });
};

exports.getTodos = (req, res, next) => {
  const TodoQuery = Todo.find().sort({
    onDate: -1
  });

  return TodoQuery.then((value) => {
    return res.status(200).json(value);
  }).catch((error) => {
    res.status(500).json({
      status: 'Error',
      message: 'Error in DB Operation!',
      error: error
    });
  });
};

exports.getTodo = (req, res, next) => {
  const _id = req.params.id;

  return Todo.findOne({ _id })
    .then((value) => {
      return res.status(404).json(value);
    })
    .catch((error) => {
      res.status(200).json({
        status: 'Error',
        message: 'Error in DB Operation!',
        error: error
      });
    });
};

exports.updateTodo = (req, res, next) => {
  const _id = req.params.id;

  const data = req.body;

  return Todo.findOneAndUpdate({ _id }, { ...data, 'timestamps.modifiedOn': Date.now() }, { new: true })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({
        status: 'Error',
        message: 'Error in DB Operation!',
        error: error
      });
    });
};

exports.completeTodo = (req, res, next) => {
  const _id = req.params.id;

  return Todo.findOneAndUpdate(
    { _id },
    {
      done: true,
      'timestamps.modifiedOn': Date.now(),
      'timestamps.completedOn': Date.now()
    },
    {
      new: true
    }
  )
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json({
        status: 'Error',
        message: 'Error in DB Operation!',
        error
      });
    });
};

exports.notCompleteTodo = (req, res, next) => {
  const _id = req.params.id;

  return Todo.findOneAndUpdate(
    { _id },
    {
      done: false,
      'timestamps.modifiedOn': Date.now(),
      'timestamps.completedOn': Date.now()
    },
    {
      new: true
    }
  )
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      return res.status(500).json({
        status: 'Error',
        message: 'Error in DB Operation!',
        error
      });
    });
};

exports.deleteTodo = (req, res, next) => {
  const _id = req.params.id;

  return Todo.findOneAndDelete({ _id })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({
        status: 'Error',
        message: 'Error in DB Operation!',
        error
      });
    });
};
