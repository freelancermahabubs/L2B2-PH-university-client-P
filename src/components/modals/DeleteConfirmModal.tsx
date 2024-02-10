import {Button, Divider, Flex, Modal, Row, Typography} from "antd";
import React from "react";

const DeleteConfirmModal = ({
  open,
  setOpen,
  text,
  handleDelete,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  handleDelete: any;
}) => {
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        title="Delete Confirmation!"
        centered
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={500}>
        <Divider />
        <Row justify="center" align="middle">
          <Typography>{text}</Typography>
          <Divider />
          <Flex gap="middle" justify="flex-end">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleDelete} type="primary" danger>
              Delete
            </Button>
          </Flex>
        </Row>
      </Modal>
    </div>
  );
};

export default DeleteConfirmModal;
