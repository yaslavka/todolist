import React from "react";
import {FormText, Input} from "reactstrap";

function InputTodo({className, placeholder,type, name, field, form, ...props}) {
    const isInvalid = form && form.errors && form.touched[field.name] && form.errors[field.name]
    return (
        <>
            <Input type={type} name={name} className={className} placeholder={placeholder} {...field} {...props}/>
            {isInvalid && <FormText color="danger" className={className}>{isInvalid}</FormText>}
        </>
    )
}
export default InputTodo