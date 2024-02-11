import React from "react";
import {Button, Col, Divider, Modal, Row} from "antd";
import {FieldValues} from "react-hook-form";
import {toast} from "sonner";
import PHForm from "../form/PHForm";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../redux/features/admin/academicManagement.api";
import PHSelect from "../form/PHSelect";

import {zodResolver} from "@hookform/resolvers/zod";
import PHInput from "../form/PHInput";
import {academicDepartmentSchema} from "../../schemas/src/schemas/academicDepartment.schema";
import { TResponse } from "../../types";
const AcademicDepartmentModal = ({
  open,
  setOpen,
  setSingleData,
  mode,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleData?: any;
  mode: string;
  //   _id: string;
  getByIdData?: any;
}) => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const {data: dData, isLoading: fIsLoading} =
    useGetAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const handleCancel = () => {
    if (mode === "edit") {
      setSingleData(null);
    }
    setOpen(false);
  };

  const onSubmit = async (vlaues: FieldValues) => {
    const toastId = toast.loading("Academic Faculty");

    let message = "";

    if (mode === "edit") {
      //   const res = await useUpdateAcademicFacultyMutation({getByIdData, _id});
      //   console.log(res, "update");
      //   message = res?.data?.message || "Academic Faculty Updated successfully";
    } else {
      try {
        // Handle add mode
        const res = (await addAcademicDepartment(vlaues)) as TResponse<any>;

        if ("data" in res) {
          message =
            res?.data?.message || "Academic Department added successfully";
        }
      } catch (error) {
        toast.error("Something went wrong", {id: toastId, duration: 2000});
        return;
      }
    }

    if (mode === "edit") {
      setSingleData(null);
    }
    setOpen(false);

    try {
      toast.success(message, {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      toast.error("Something went wrong", {id: toastId, duration: 2000});
    }
  };

  const modalTitle =
    mode === "add" ? "Add Academic Department" : "Update Academic Department";

  return (
    <Modal
      title={modalTitle}
      centered
      visible={open}
      onCancel={handleCancel}
      footer={null}
      width={600}>
      <Divider />
      <Row justify="center">
        <Col span={24}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}>
            <PHInput type="text" name="name" label="Name" placeholder="Name" />

            <PHSelect
              options={academicFacultyOptions}
              disabled={fIsLoading}
              name="academicFaculty"
              label="Academic Faculty"
            />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </Modal>
  );
};

export default AcademicDepartmentModal;
