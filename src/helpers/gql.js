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

export const CHANGE_PASSWORD_USER = gql`
    mutation ChangePasswordUser(
        $id: ID!,
        $password: String!
    ){
        changePasswordUser(
            id:  $id,
            password:  $password
        ) {
            id
            email
        }
    }
`
export const CHANGE_PASSWORD_STAFF = gql`
    mutation ChangePasswordStaff(
        $id: ID!,
        $password: String!
    ){
        changePasswordStaff(
            id:  $id,
            password:  $password
        ) {
            id
            email
        }
    }
`