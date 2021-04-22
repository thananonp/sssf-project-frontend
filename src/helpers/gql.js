import {gql} from "@apollo/client/core";

export const USER_LOGIN = gql`
    query LoginUser(
        $email:String!,
        $password:String!
    ){
        userLogin(
            email: $email,
            password: $password
        )
    }
`
export const STAFF_LOGIN = gql`
    query LoginStaff(
        $email:String!,
        $password:String!
    ){
        staffLogin(
            email: $email,
            password: $password
        )
    }
`