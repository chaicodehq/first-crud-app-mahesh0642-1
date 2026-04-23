import { Todo } from "../models/todo.model.js";

/**
 * TODO: Create a new todo
 * - Extract data from req.body
 * - Create todo in database
 * - Return 201 with created todo
 */
export async function createTodo(req, res, next) {
  try {
    // Your code here
    const data = req.body;
    const todo = await Todo.create(data);

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: List todos with pagination and filters
 * - Support query params: page, limit, completed, priority, search
 * - Default: page=1, limit=10
 * - Return: { data: [...], meta: { total, page, limit, pages } }
 */
export async function listTodos(req, res, next) {
  try {
    let { page = 1, limit = 10, completed, priority, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const query = {};

    // completed filter
    if (completed === "true") query.completed = true;
    if (completed === "false") query.completed = false;

    // priority filter
    if (priority) {
      query.priority = priority;
    }

    //FIXED search (THIS WAS BREAKING EVERYTHING)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const todos = await Todo.find(query)
      .sort({ createdAt: -1 }) // required for tests
      .skip(skip)
      .limit(limit);

    const total = await Todo.countDocuments(query);

    res.status(200).json({
      data: todos,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Get single todo by ID
 * - Return 404 if not found
 */
export async function getTodo(req, res, next) {
  try {
    // Your code here
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
return res.status(404).json({
  error: {
    message: "Todo not found",
  },
});
    }
    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Update todo by ID
 * - Use findByIdAndUpdate with { new: true, runValidators: true }
 * - Return 404 if not found
 */
export async function updateTodo(req, res, next) {
  try {
    // Your code here
    const { id } = req.params;
    const updates = req.body;

    const todo = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({
        error: {
          message: "Todo not found",
        },
      });
    }
    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Toggle completed status
 * - Find todo, flip completed, save
 * - Return 404 if not found
 */
export async function toggleTodo(req, res, next) {
  try {
    // Your code here
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        error: {
          message: "Todo not found",
        },
      });
    }

    todo.completed = !todo.completed;
    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Delete todo by ID
 * - Return 204 (no content) on success
 * - Return 404 if not found
 */
export async function deleteTodo(req, res, next) {
  try {
    // Your code here
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        error: {
          message: "Todo not found",
        },
      });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
