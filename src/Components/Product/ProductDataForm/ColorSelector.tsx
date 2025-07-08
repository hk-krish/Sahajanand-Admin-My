import { ColorPicker } from "antd";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller } from "react-hook-form";
import { Col, InputGroup, InputGroupText, Label } from "reactstrap";

const ColorInput = ({ control, errors }: any) => {
  return (
    <Col md="6">
      <div className="input-box">
        <Label>{"Color"}</Label>
        <InputGroup>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <>
                <InputGroupText className="list-light-primary">
                  <ColorPicker
                    defaultValue="#1677ff"
                    onChange={(color) => {
                      field.onChange([...(field.value || []), color.toHexString()]);
                    }}
                  />
                </InputGroupText>
                <Typeahead {...field} multiple id="color-typeahead" options={[]} onChange={(selected) => field.onChange(selected)} selected={field.value || []} placeholder="Add Color" allowNew newSelectionPrefix="Add a new tag: " labelKey={(option) => (typeof option === "string" ? option : option.label)} />
              </>
            )}
          />
          {errors.color && <p className="text-danger">{errors.color.message}</p>}
        </InputGroup>
      </div>
    </Col>
  );
};

export default ColorInput;
