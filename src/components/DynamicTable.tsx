import React from 'react'
import './DynamicTable.css'


function Table(props: { data: object[], header: string[] }) {
    let data = props.data
    let header = props.header

    const renderHeader = () => {
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return data && data.map((i) => {
            return (
                <tr>
                    {header.map((headline)=>{
                        return <td>{            // @ts-ignore
                            i[headline]}</td>
                    })}
                </tr>
            )
        })
    }

    return (
        <>
            <table id='table_data'>
                <thead>
                <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                {renderBody()}
                </tbody>
            </table>
        </>
    )
}


export default Table