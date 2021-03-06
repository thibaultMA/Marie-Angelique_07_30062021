module.exports=(sequelize,DataType)=>{
    const User = sequelize.define("Users",{
        name:{
            type:DataType.STRING,
            allowNull:false,
           
            validate:{
                notEmpty:true
            }
        },
        email:{
            type:DataType.STRING,
            allowNull:false,
            unique: true,
            validate:{
                notEmpty:true
            }
        },
        password:{
            type:DataType.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        niveau:{
            type:DataType.INTEGER,
            allowNull:false,
            defaultValue:0,
            validate:{
                notEmpty:true
            }
        },

    },{
        classMethods:{
            associate:(models)=>{
                models.Users.hasMany(models.Message,models.Commentaire)
            }
        }
    })
    return User;
}