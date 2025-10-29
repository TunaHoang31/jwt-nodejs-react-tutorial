import e from 'express';
import userApiService from '../service/userApiService';

const readFunc = async (req, res) => {
    try {

        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await userApiService.getUserWithPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC,
                DT: data.DT
            });


        } else {
            let data = await userApiService.getAllUser();

            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC,
                DT: data.DT
            });
        }


    } catch (error) {
        console.log(e)
        return res.status(500).json({
            EM: "error form sever", // error message
            EC: "-1",
            DT: ""
        })
    }
}

const createFunc = async (req, res) => {
    try {
        let data = await userApiService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log(e)
        return res.status(500).json({
            EM: "error form sever", // error message
            EC: "-1",
            DT: ""
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log(e)
        return res.status(500).json({
            EM: "error form sever", // error message
            EC: "-1",
            DT: ""
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        // console.log(" req.body = ", req.body)
        // // let users = await userApiService.getAllUser();
        let data = await userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log(e)
        return res.status(500).json({
            EM: "error form sever", // error message
            EC: "-1",
            DT: ""
        })
    }
}
const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: "ok", // error message
        EC: 0,
        DT: {
            access_token: req.token,
            groupWithRoles: req.user.groupWithRoles,
            email: req.user.email,
            username: req.user.username
        }
    });
}
module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getUserAccount
}