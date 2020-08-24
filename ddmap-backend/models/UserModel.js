
const User = require('./').User

class UserModel {

    //유저 생성 
    async saveUserByLocalId(data){

        await User.create({
        id: data.id, 
        profile_icon: data.profile_icon, 
        nic_name: data.nic_name,
        gender: data.gender, 
        password: data.password 
        
        })
    } 

    async findUserByLocalId(id){

        const user = await User.findOne({
            where: {
                id
            },
            raw : true 
        })
        return user 
    }

    // async saveUserByLocal(data) {

    //     await User.create({
    //         id: data.id,
    //         profile_icon: data.profile_icon,
    //         nic_name : data.nic_name,
    //         gender : data.gender, 
    //         password : data.password
    //     })

    // }

}

module.exports = UserModel