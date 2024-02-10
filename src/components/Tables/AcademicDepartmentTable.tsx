import {Button, Space, Table, TableColumnsType, TableProps} from "antd";

import {TAcademicFaculty, TQueryParam} from "../../types";
import {useGetAcademicDepartmentsQuery} from "../../redux/features/admin/academicManagement.api";
import {useState} from "react";

import DeleteConfirmModal from "../modals/DeleteConfirmModal";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicDepartmentTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  //   const [_id, setId] = useState<string>();
  //   const handleEdit = async (record: any) => {

  //     // setId(_id)

  //   };

  const {
    data: academicDepartmentData,
    isLoading,
    isFetching,
  } = useGetAcademicDepartmentsQuery(undefined);

  console.log({isLoading, isFetching});
  console.log(academicDepartmentData, "hello");
  const tableData = academicDepartmentData?.data?.map(
    ({_id, name, academicFaculty}) => ({
      key: _id,
      name,
      academicFaculty,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      key: "academicFaculty",
      render: (_: any, record: any) => (
        <Space size="middle">
          <p>{record?.academicFaculty?.name}</p>
        </Space>
      ),
    },

    {
      title: "Action",
      key: "x",
      render: () => (
        <Space size="middle">
          <Button
            style={{
              background: "none",
              border: "none",
              color: "seagreen",
              cursor: "pointer",
            }}
            // onClick={() => handleEdit(record)}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({name: "name", value: item})
      );
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
      <DeleteConfirmModal
        handleDelete={""}
        open={open}
        setOpen={setOpen}
        text="Are you sure? want to delete this Academic Faculty!"
      />
    </>
  );
};

export default AcademicDepartmentTable;
