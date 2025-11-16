import articleService from '../service/articleService';

const create = async (req, res) => {
    try {
        let data = await articleService.create(req.body);
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
        let data = await articleService.update(req.params.id, req.body);
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
        let data = await articleService.remove(req.params.id);
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

const listPublic = async (req, res) => {
    try {
        const { page, limit, categoryId, keyword } = req.query;
        const data = await articleService.listPublic({ page, limit, categoryId, keyword });
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

const getBySlugPublic = async (req, res) => {
    try {
        const data = await articleService.getBySlugPublic(req.params.slug);
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
    listPublic,
    getBySlugPublic
};



