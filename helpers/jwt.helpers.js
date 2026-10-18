import jsonwebtoken from "jsonwebtoken";
import "dotenv/config"

export const genToken = (User) =>{
    return jsonwebtoken.sign({
        id: User._id,
        userName: User.userName,
        role:User.role,
        Purchase: User.Purchase,
        doTransactions : User.doTransactions,
        Usage : User.Usage},
        process.env.SECRET,{expiresIn:"7d"}
)
}