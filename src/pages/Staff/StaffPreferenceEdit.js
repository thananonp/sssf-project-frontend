import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router";
import {useField} from "../../hooks";
import React from "react";
import {gql} from "@apollo/client/core";
import {useMutation, useQuery} from "@apollo/client";
import {connect} from "react-redux";
import {ErrorMessage, LoadingSpinner, ReturnStaff} from "../Components";
import {requireStaff} from "../../helpers/utils";

const PREFERENCE = gql`
    query {
        preference{
            id
            fineRate
            borrowableDay
        }
    }
`

const EDIT_PREFERENCE = gql`
    mutation EditPreference(
        $id:ID!,
        $fineRate: Int,
        $borrowableDay: Int
    ){
        editPreference(
            id:  $id,
            fineRate:$fineRate,
            borrowableDay:$borrowableDay
        ) {
            id
            fineRate
            borrowableDay
        }
    }
`

const StaffPreferenceEdit = (props) => {
    const history = useHistory()
    const borrowableDay = useField('number')
    const fineRate = useField('number')
    const [EditPreference] = useMutation(EDIT_PREFERENCE, {
        onCompleted: (data) => {
            alert("Preference saved")
            window.location.reload(false);
        }, onError: (error) => {
            window.alert(error)
        }
    })
    const {loading, error, data} = useQuery(PREFERENCE, {
        onCompleted: (data) => {
            fineRate.setValue(data.preference.fineRate)
            borrowableDay.setValue(data.preference.borrowableDay)
        }, onError: (error) => {
            window.alert(error)
        }
    });

    const updateInfo = (e) => {
        e.preventDefault()
        console.log({
            id: data.preference.id,
            fineRate: fineRate.value,
            borrowableDay: borrowableDay.value
        })
        EditPreference({
                variables: {
                    id: data.preference.id,
                    fineRate: Number(fineRate.value),
                    borrowableDay: Number(borrowableDay.value)
                }
            }
        )
    }

    const resetForm = () => {
        fineRate.setValue(data.preference.fineRate)
        borrowableDay.setValue(data.preference.borrowableDay)
    }

    requireStaff(props, history)
    if (loading) return (<LoadingSpinner/>);
    if (error) return <ErrorMessage error={error}/>
    return (
        <Container>
            <ReturnStaff/>
            <h1>Edit Preference</h1>
            <Form onSubmit={updateInfo} onReset={resetForm}>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Fine Rate</Form.Label>
                    <Form.Control min="1" max="20" type={fineRate.type} placeholder="Fine rate" value={fineRate.value}
                                  onChange={fineRate.onChange}/>
                    <Form.Label>Minimum fine = 1 , Maximum fine = 20</Form.Label>

                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Borrowable Day</Form.Label>
                    <Form.Control min="1" max="7" type={borrowableDay.type} placeholder="Borrowable Day"
                                  value={borrowableDay.value}
                                  onChange={borrowableDay.onChange}/>
                    <Form.Label>Minimum day = 1 , Maximum day = 7</Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="secondary" type="reset">
                    Reset
                </Button>
            </Form>
        </Container>
    )

}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const connectedStaffPreferenceEdit = connect(mapStateToProps, null)(StaffPreferenceEdit)
export default connectedStaffPreferenceEdit