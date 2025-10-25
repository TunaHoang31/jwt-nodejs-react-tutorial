import express from "express";
import homeController from '../controller/homeController';
import apiController from '../controller/apiController';

const router = express.Router();

/**
 * 
 * @param {*} app 
 * 
 */

const initWebRoutes = (app) => {
    //path, handler
    router.get("/", homeController.handleHelloWord);
    router.get("/user", homeController.handleUserPage);
    router.post("/user/create-user", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    router.get("/update-user/:id", homeController.getUpdateUserPage);
    router.post("/user/update-user", homeController.handleUpdateUser);

    //api test
    // GET -R, POST -C, PUT -U, DELETE -D
    router.get("/api/test-api", apiController.testApi);

    return app.use("/", router);
}

export default initWebRoutes;