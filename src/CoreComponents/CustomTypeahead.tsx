import { CustomTypeaheadType } from "@/Types/CoreComponents";
import { FC } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller } from "react-hook-form";
import { Col, Label } from "reactstrap";

const CustomTypeahead: FC<CustomTypeaheadType> = ({ errors, control, title ,name}) => {
  return (
    <Col md="6">
      <div className="input-box">
        <Label>{title}</Label>
        <Controller name={name} control={control} render={({ field }) => <Typeahead {...field} multiple id={`${name}-typeahead`} options={[]} onChange={(selected) => field.onChange(selected)} selected={field.value || []} placeholder={`Add ${title}`} allowNew newSelectionPrefix="Add a new tag: " labelKey={(option) => (typeof option === "string" ? option : option.label)} />} />
        {errors && <p className="text-danger">{errors.message}</p>}
      </div>
    </Col>
  );
};

export default CustomTypeahead;
