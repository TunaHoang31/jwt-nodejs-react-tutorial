import articleService from '../service/articleService';

const create = async (req, res) => {
    const data = await articleService.create(req.body);
    return res.status(data.EC === 0 ? 200 : 400).json(data);
}

const update = async (req, res) => {
    const data = await articleService.update(req.params.id, req.body);
    return res.status(data.EC === 0 ? 200 : 400).json(data);
}

const remove = async (req, res) => {
    const data = await articleService.remove(req.params.id);
    return res.status(data.EC === 0 ? 200 : 400).json(data);
}

const listPublic = async (req, res) => {
    const { page, limit, categoryId, keyword } = req.query;
    const data = await articleService.listPublic({ page, limit, categoryId, keyword });
    return res.status(data.EC === 0 ? 200 : 400).json(data);
}

const getBySlugPublic = async (req, res) => {
    const data = await articleService.getBySlugPublic(req.params.slug);
    return res.status(data.EC === 0 ? 200 : 400).json(data);
}

module.exports = { create, update, remove, listPublic, getBySlugPublic };


