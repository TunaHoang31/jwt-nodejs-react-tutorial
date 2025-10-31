import db from '../models/index';


const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2));

        if (persists.length === 0) {
            return {
                EM: 'Tạo mới quyền hạn không thành công',
                EC: 0,
                DT: []
            }
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: `Tạo mới ${persists.length} quyền hạn thành công`,
            EC: 0,
            DT: []
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({
            order: [['id', 'DESC'],]
        })
        return {
            EM: `Lấy toàn bộ quyển thành công`,
            EC: 0,
            DT: data
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        })
        if (role) {
            await role.destroy();
        }

        return {
            EM: `Xóa quyền thành công`,
            EC: 0,
            DT: []
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    createNewRoles, getAllRoles, deleteRole
}