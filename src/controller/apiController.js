import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: "API is working!"
    }
    );
};

const handleRegister = async (req, res) => {
    try {
        //req.bode email phone username password 
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters", // error 
                EC: "1",
                DT: ""

            })
        }
        if (req.body.password && req.body.password.length < 6) {
            return res.status(200).json({
                EM: "Mật khẩu phải có ít nhất 6 kí tự", // error 
                EC: "1",
                DT: ""

            })
        }
        //service create user
        let data = await loginRegisterService.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM, // error 
            EC: data.EC,
            DT: ""

        })

    } catch (e) {
        return res.status(500).json({
            EM: "error form sever", // error message
            EC: "-1",
            DT: ""
        })
    }

}

const handleLogin = async (req, res) => {
    // console.log('check login from react', req.body);
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        // set cookies
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }

        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: "error form sever", // error message
            EC: "-1",
            DT: ""
        })
    }
}
const handleLogout = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: 'clear cookies done!', // error message
            EC: 0,
            DT: ''
        });
    } catch (error) {
        return res.status(500).json({
            EM: "error form sever", // error message
            EC: "-1",
            DT: ""
        })
    }
}

module.exports = {
    testApi, handleRegister, handleLogin, handleLogout
};