import express from "express";
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'
import roleController from '../controller/roleController';
import categoryController from '../controller/categoryController';
import articleController from '../controller/articleController';

const router = express.Router();

/**
 * 
 * @param {*} app 
 * 
 */

// const testMiddleware = (req, res, next) => {
//     console.log('calling a middleware');
//     next();
// }



const initApiRoutes = (app) => {
    //path, handler
    //api test
    // GET -R, POST -C, PUT -U, DELETE -D
    // router.get("/test-api", apiController.testApi);

    // Public news routes
    router.get('/news/articles', articleController.listPublic); // ?page=&limit=&categoryId=&keyword=
    router.get('/news/articles/:slug', articleController.getBySlugPublic);
    router.get('/news/categories', categoryController.list);

    router.all('*', checkUserJWT, checkUserPermission);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);

    router.get("/account", userController.getUserAccount);

    //user routes
    router.get("/user/read", userController.readFunc); //page=?&limit=?
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    //roles routes
    router.get("/role/read", roleController.readFunc);
    router.post("/role/create", roleController.createFunc);
    router.put("/role/update", roleController.updateFunc);
    router.delete("/role/delete", roleController.deleteFunc);
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup);
    router.post("/role/assign-to-group", roleController.assignRoleToGroup);

    //group routes
    router.get("/group/read", groupController.readFunc);

    // Admin news routes
    router.post('/news/category', categoryController.create);
    router.put('/news/category/:id', categoryController.update);
    router.delete('/news/category/:id', categoryController.remove);

    router.post('/news/article', articleController.create);
    router.put('/news/article/:id', articleController.update);
    router.delete('/news/article/:id', articleController.remove);

    return app.use("/api/v1/", router);
}

export default initApiRoutes;