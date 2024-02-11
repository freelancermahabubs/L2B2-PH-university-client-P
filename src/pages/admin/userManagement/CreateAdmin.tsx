import {Controller, FieldValues, SubmitHandler} from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import {Button, Col, Divider, Form, Input, Row} from "antd";
import PHSelect from "../../../components/form/PHSelect";
import {bloodGroupOptions, genderOptions} from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";

import {useAddAdminMutation} from "../../../redux/features/admin/userManagement.api";
import {TResponse} from "../../../types";
import {toast} from "sonner";

//! This is only for development
//! Should be removed
const studentDefaultValues = {
  designation: "Admin",
  name: {
    firstName: "I am ",
    middleName: "Admin",
    lastName: "Number 1",
  },
  gender: "male",

  bloogGroup: "A+",

  contactNo: "1235678",
  emergencyContactNo: "987-654-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",
};

const CreateAdmin = () => {
  const [addAdmin, {data, error}] = useAddAdminMutation();

  console.log({data, error});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const adminData = {
      password: "admin123",
      admin: data,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.image);

    try {
      const res = (await addAdmin(formData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, {id: toastId});
      } else {
        toast.success("Admin created", {id: toastId});
      }
    } catch (err) {
      toast.error("Something went wrong", {id: toastId});
    }

    //! This is for development
    //! Just for checking
    console.log(Object.fromEntries(formData));
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHDatePicker name="dateOfBirth" label="Date of birth" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood group"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <Controller
                name="image"
                render={({field: {onChange, value, ...field}}) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{span: 12}} lg={{span: 8}}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
