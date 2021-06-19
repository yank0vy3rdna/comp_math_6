// @ts-ignore
import Select from 'react-select';
import React from "react";
import './Select.css'

function SelectItem(props: any) {
    return (
        <div className="Select">
            <Select onChange={props.onSelectHandler} options={props.options}
                    value={props.selectedOption}/>
        </div>
    );
}

export default SelectItem;
