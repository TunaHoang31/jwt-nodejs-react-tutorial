import categoryService from '../service/categoryService';

const create = async (req, res) => {
    try {
        let data = await categoryService.create(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error form sever",
            EC: "-1",
            DT: ""
        });
    }
}

const update = async (req, res) => {
    try {
        let data = await categoryService.update(req.params.id, req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error form sever",
            EC: "-1",
            DT: ""
        });
    }
}

const remove = async (req, res) => {
    try {
        let data = await categoryService.remove(req.params.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error form sever",
            EC: "-1",
            DT: ""
        });
    }
}

const list = async (req, res) => {
    try {
        let data = await categoryService.list();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error form sever",
            EC: "-1",
            DT: ""
        });
    }
}

module.exports = {
    create,
    update,
    remove,
    list
};



