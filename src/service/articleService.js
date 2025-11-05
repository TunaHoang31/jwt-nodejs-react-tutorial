import db from '../models/index';
import { Op } from 'sequelize';

const create = async (payload) => {
    try {
        const { title, slug, summary, content, thumbnail, status, publishedAt, categoryId, authorName } = payload;

        const exists = await db.Article.findOne({ where: { slug } });
        if (exists)
            return {
                EM: 'Slug đã tồn tại',
                EC: 1,
                DT: null
            };

        const category = await db.Category.findByPk(categoryId);
        if (!category)
            return {
                EM: 'Danh mục không hợp lệ',
                EC: 1,
                DT: null
            };

        const article = await db.Article.create(
            {
                title, slug, summary, content, thumbnail,
                status: status || 'draft', publishedAt, categoryId, authorName
            });
        return {
            EM: 'Tạo bài viết thành công',
            EC: 0,
            DT: article
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
        const article = await db.Article.findByPk(id);
        if (!article)
            return {
                EM: 'Không tìm thấy bài viết',
                EC: 1,
                DT: null
            };

        if (payload.slug && payload.slug !== article.slug) {
            const exists = await db.Article.findOne({ where: { slug: payload.slug } });
            if (exists)
                return {
                    EM: 'Slug đã tồn tại',
                    EC: 1,
                    DT: null
                };
        }

        if (payload.categoryId) {
            const category = await db.Category.findByPk(payload.categoryId);
            if (!category)
                return {
                    EM: 'Danh mục không hợp lệ',
                    EC: 1,
                    DT: null
                };
        }

        await article.update(payload);
        return {
            EM: 'Cập nhật bài viết thành công',
            EC: 0,
            DT: article
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
        const article = await db.Article.findByPk(id);
        if (!article)
            return {
                EM: 'Không tìm thấy bài viết',
                EC: 1,
                DT: null
            };

        await article.destroy();
        return {
            EM: 'Xóa bài viết thành công',
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

const listPublic = async ({ page = 1, limit = 10, categoryId, keyword }) => {
    try {
        const offset = (page - 1) * limit;
        const where = { status: 'published' };
        if (categoryId) {
            const ids = [Number(categoryId)];
            const children = await db.Category.findAll({ where: { parentId: Number(categoryId) }, attributes: ['id'], raw: true });
            if (children && children.length > 0) ids.push(...children.map(c => c.id));
            where.categoryId = { [Op.in]: ids };
        }
        if (keyword) where.title = { [Op.like]: `%${keyword}%` };

        const { rows, count } = await db.Article.findAndCountAll({
            where,
            include: [{ model: db.Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
            order: [['publishedAt', 'DESC'], ['id', 'DESC']],
            offset,
            limit: +limit
        });
        return {
            EM: 'Lấy danh sách bài viết',
            EC: 0,
            DT: { items: rows, total: count, page: +page, limit: +limit }
        };
    } catch (e) {
        console.log(e);
        return {
            EM: 'Lỗi dịch vụ',
            EC: 1,
            DT: { items: [], total: 0 }
        };
    }
}

const getBySlugPublic = async (slug) => {
    try {
        const article = await db.Article.findOne({
            where: { slug, status: 'published' },
            include: [{ model: db.Category, as: 'category', attributes: ['id', 'name', 'slug'] }]
        });
        if (!article) return { EM: 'Không tìm thấy bài viết', EC: 1, DT: null };
        return {
            EM: 'Lấy bài viết thành công',
            EC: 0,
            DT: article
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

module.exports = { create, update, remove, listPublic, getBySlugPublic };


