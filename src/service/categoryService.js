import db from '../models/index';

const create = async (payload) => {
    try {
        const { name, slug, parentId } = payload;
        const exists = await db.Category.findOne({ where: { slug } });
        if (exists) {
            return {
                EM: 'Slug đã tồn tại',
                EC: 1,
                DT: null
            };
        }
        const category = await db.Category.create({ name, slug, parentId: parentId || null });
        return {
            EM: 'Tạo danh mục thành công',
            EC: 0,
            DT: category
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'Lỗi dịch vụ',
            EC: 1,
            DT: null
        };
    }
}

const update = async (id, payload) => {
    try {
        const category = await db.Category.findByPk(id);
        if (!category)
            return {
                EM: 'Không tìm thấy danh mục',
                EC: 1,
                DT: null
            };
        const { name, slug, parentId } = payload;
        if (slug && slug !== category.slug) {
            const exists = await db.Category.findOne({ where: { slug } });
            if (exists)
                return {
                    EM: 'Slug đã tồn tại',
                    EC: 1,
                    DT: null
                };
        }
        await category.update({ name, slug, parentId: parentId || null });
        return {
            EM: 'Cập nhật danh mục thành công',
            EC: 0,
            DT: category
        };

    } catch (e) {
        console.log(e);
        return {
            EM: 'Lỗi dịch vụ',
            EC: 1,
            DT: null
        };
    }
}

const remove = async (id) => {
    try {
        const category = await db.Category.findByPk(id);
        if (!category)
            return {
                EM: 'Không tìm thấy danh mục',
                EC: 1,
                DT: null
            };
        const child = await db.Category.findOne({ where: { parentId: id } });
        if (child)
            return {
                EM: 'Vui lòng xóa danh mục con trước',
                EC: 1,
                DT: null
            };
        const article = await db.Article.findOne({ where: { categoryId: id } });
        if (article)
            return {
                EM: 'Danh mục đang có bài viết',
                EC: 1,
                DT: null
            };
        await category.destroy();
        return {
            EM: 'Xóa danh mục thành công',
            EC: 0,
            DT: null
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'Lỗi dịch vụ',
            EC: 1,
            DT: null
        };
    }
}

const list = async () => {
    try {
        const categories = await db.Category.findAll({ order: [['id', 'ASC']] });
        return {
            EM: 'Lấy danh mục thành công',
            EC: 0,
            DT: categories
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'Lỗi dịch vụ',
            EC: 1,
            DT: []
        };
    }
}

module.exports = { create, update, remove, list };


