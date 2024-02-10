import {Button, Space, Table, TableColumnsType, TableProps} from "antd";

import {TAcademicFaculty, TQueryParam} from "../../types";
import {useGetAcademicFacultiesQuery} from "../../redux/features/admin/academicManagement.api";
import {useState} from "react";
import AcademicFaculty from "../modals/AcademicFaculty";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFacultyTable = () => {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [singleData, setSingleData] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [_id, setId] = useState<string>();
  
  const handleEdit = async (record: any) => {
    setSingleData(record);
    setId(record?.key);

    setEditOpen(true);
  };

  const {
    data: academicFacultyData,
    isLoading,
    isFetching,
  } = useGetAcademicFacultiesQuery(undefined);

  console.log({isLoading, isFetching});

  const tableData = academicFacultyData?.data?.map(({_id, name}) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "Action",
      key: "x",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            style={{
              background: "none",
              border: "none",
              color: "seagreen",
              cursor: "pointer",
            }}
            onClick={() => handleEdit(record)}>
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
      {singleData && (
        <AcademicFaculty
          open={editOpen}
          setOpen={setEditOpen}
          mode="edit"
          _id={_id}
          getByIdData={singleData}
          setSingleData={setSingleData}
        />
      )}
    </>
  );
};

export default AcademicFacultyTable;
