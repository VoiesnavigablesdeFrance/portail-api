const { error } = require("@axe-core/cli/dist/src/lib/utils");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.login = (req, res) => {
    const userAdmin = {
        user: 'Admin',
        password: '$2b$10$LWmsJ2iB4VvIWKNP0Rw0E.pBoLsmocYGHi8OyD2PIWMiNkI52mfFi'
    }

    const userLog = req.body;
    bcrypt.compare(userLog.password, userAdmin.password, function(err,result){
        if(result && userAdmin.user === userLog.user){
            
            const createTokenFromJson = (jsonData, options = {})=>{
                try{
                    const secretKey = "test"
                    const token = jwt.sign(jsonData, secretKey, options)
                    return token
                }catch{
                    console.log("Error : ", error.message)
                    return null
                }
            }

            const jsonData = {role : "admin"}
            const token = createTokenFromJson(jsonData)

            return res.status(200).json({message : 'Valid connection', token: token})
        }
        else{
            return res.status(400).json({message: 'Invalid connection'})
        }
    })


}