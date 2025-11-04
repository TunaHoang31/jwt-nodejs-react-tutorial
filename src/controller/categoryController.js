import categoryService from '../service/categoryService';

const create = async (req, res) => {
    const data = await categoryService.create(req.body);
    return res.status(data.EC === 0 ? 200 : 400).json(data);
}

const update = async (req, res) => {
    const data = await categoryService.update(req.params.id, req.body);
    return res.status(data.EC === 0 ? 200 : 400).json(data);
}

const remove = async (req, res) => {
    const data = await categoryService.remove(req.params.id);
    return res.status(data.EC === 0 ? 200 : 400).json(data);
}

const list = async (req, res) => {
    const data = await categoryService.list();
    return res.status(data.EC === 0 ? 200 : 400).json(data);
}

module.exports = { create, update, remove, list };


