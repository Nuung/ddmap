
class UserModel {

    //유저 생성 
    async saveUserByLocal(data){

        await User.create({
        id: data.id, 
        profile_icon: data.profile_icon, 
        nic_name: data.nic_name,
        gender: data.gender, 
        password: data.password 
        
        })
    } 

    async findUserByLocalId(localId){

        const user = await User.findOne({
            where: {
                localId
            },
            raw : true 
        })
        return user 
    }

    async saveUserByLocal(data) {

        await User.create({
            id: data.id,
            profile_icon: data.profile_icon,
            nic_name : data.nic_name,
            gender : data.gender, 
            password : data.password
        })

    }

}

module.exports = UserModel