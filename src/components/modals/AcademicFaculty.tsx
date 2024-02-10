import React from "react";
import {Button, Divider, Flex, Modal, Row} from "antd";
import {FieldValues} from "react-hook-form";
import {toast} from "sonner";
import PHInput from "../form/PHInput";
import PHForm from "../form/PHForm";
import {
  useAddAcademicFacultyMutation,
  useUpdateAcademicFacultyMutation,
} from "../../redux/features/admin/academicManagement.api";

const AcademicFaculty = ({
  open,
  setOpen,
  setSingleData,
  _id,
  mode,
  getByIdData,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleData?: any;
  mode: string;
  _id: string;
  getByIdData?: any;
}) => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const [updateAcademicFaculty] = useUpdateAcademicFacultyMutation();

  const handleCancel = () => {
    if (mode === "edit") {
      setSingleData(null);
    }
    setOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Academic Faculty");

    let message = "";
    if (mode === "edit") {
      const res = await updateAcademicFaculty({data, _id});
   
      message = res?.data?.message;
    } else {
      try {
        // Handle add mode
        const res = await addAcademicFaculty(data);

        if ("data" in res) {
          message = res?.data?.message;
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
    mode === "add" ? "Add Academic Faculty" : "Update Academic Faculty";

  return (
    <Modal
      title={modalTitle}
      centered
      visible={open}
      onCancel={handleCancel}
      footer={null}
      width={600}>
      <Divider />
      <Row justify="center" align="middle">
        <PHForm
          defaultValues={{
            name: getByIdData ? getByIdData?.name : "",
          }}
          onSubmit={onSubmit}>
          <PHInput type="text" name="name" label="Name" placeholder="Name" />

          <Divider />
          <Flex gap="middle" justify="flex-end">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Flex>
        </PHForm>
      </Row>
    </Modal>
  );
};

export default AcademicFaculty;
