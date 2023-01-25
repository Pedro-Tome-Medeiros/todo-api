const express = require('express');

const TodoController = require('../controllers/todo');

const router = express.Router();

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create.
 *     tags:
 *          - TODO 
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - title
 *           properties:
 *             title:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', TodoController.createTodo);

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Returns TODO List
 *     tags:
 *      - TODO
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: todo
 */
router.get('/', TodoController.getTodos);

/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     summary: Get TODO by id
 *     tags:
 *      - TODO
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: ID of the TODO to get
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: todo
 */

router.get('/:id', TodoController.getTodo);

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     summary: Get TODO by id
 *     tags:
 *      - TODO
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: ID of the TODO to update
 *      - in: body
 *        name: title
 *        type: object
 *        schema:
 *          type: object
 *          required:
 *              - title
 *          properties:
 *              title:
 *                  type: string
 *        
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: todo
 */
router.put('/:id', TodoController.updateTodo);

/**
 * @swagger
 * /todo/{id}/completed:
 *   patch:
 *     summary: Mark TODO as complete
 *     tags:
 *      - TODO
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true  
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: todo
 */
router.patch('/:id/completed', TodoController.completeTodo);

/**
 * @swagger
 * /todo/{id}/not-completed:
 *   patch:
 *     summary: Mark TODO as not complete
 *     tags:
 *      - TODO
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true    
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: todo
 */
router.patch('/:id/not-completed', TodoController.notCompleteTodo);

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete TODO
 *     tags:
 *      - TODO
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true   
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: todo
 */
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
