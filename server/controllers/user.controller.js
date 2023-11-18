/**
* Name: group 3 
* Date: 17th November 2023
* Description: controller for users 
 */
import User from '../models/user.model.js'
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js'

/**
 * creating new user
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const create = async (req, res) => {
    const user = new User(req.body); // Creating a new user instance with data from the request body.
    try {
        await user.save(); // Saving the new user to the database.
        return res.status(200).json({
            message: "Successfully signed up!"
    })
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
        })
}
};

/**
 * query for finding all users.
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const list = async (req, res) => {
    try {
        let users = await User.find().select('name  email  updated  created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
        });
    }
};

/**
 * query for finding users by ID
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const userByID = async (req, res, next, id) => { 
    try {
    let user = await User.findById(id) 
    if (!user)
    return res.status('400').json({ 
    error: "User not found"
    })
    req.profile = user 
    next()
    } catch (err) {
    return res.status('400').json({ 
    error: "Could not retrieve user"
    }); 
    }
};

/**
 * CRUD operation Reading data 
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const read = (req, res) => {
    req.profile.hashed_password = undefined 
	req.profile.salt = undefined
	return res.json(req.profile) 
};

/**
 * CRUD operation Update data
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const update = async (req, res) => { 
    try {
        let user = req.profile; // req.profile contains the user to be updated
        user = extend(user, req.body); // extend is used to update the user object
        user.updated = Date.now() 
        await user.save()
        user.hashed_password = undefined 
        user.salt = undefined
        res.json(user); // Sending the updated user as a JSON response
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};


/**
 * CRUD operation Remove data
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const remove = async (req, res) => { 
try {
let user = req.profile
let deletedUser = await user.remove() 
deletedUser.hashed_password = undefined 
deletedUser.salt = undefined
res.json(deletedUser) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
export default {create, list, userByID, read, update, remove}
