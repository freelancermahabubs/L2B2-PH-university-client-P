import {
  Button,
  Dropdown,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import {useState} from "react";
import {TQueryParam, TStudent} from "../../../types";
import {
  useChangeStutusStudentMutation,
  useGetAllStudentsQuery,
} from "../../../redux/features/admin/userManagement.api";
import {Link} from "react-router-dom";

export type TTableData = Pick<
  TStudent,
  "fullName" | "user" | "id" | "email" | "contactNo"
>;

const StudentData = () => {
  const [userId, setUserId] = useState("");
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const [changeStutusStudent] = useChangeStutusStudentMutation();
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    {name: "page", value: page},
    {name: "sort", value: "id"},
    ...params,
  ]);

  console.log({isLoading, isFetching});

  const handleStatusUpdate = (data: any) => {
    const updateData = {
      id: userId,
      data: {
        status: data.key,
      },
    };

    changeStutusStudent(updateData);
  };

  const items = [
    {
      label: "Blocked",
      key: "blocked",
    },
    {
      label: "In-progress",
      key: "in-progress",
    },
  ];
  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };
  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(
    ({_id, fullName, id, email, contactNo, user}) => ({
      key: _id,
      fullName,
      user,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },

    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: ( item: any) => {
        let color;
        if (item?.user?.status === "block") {
          color = "red";
        }
        if (item?.user?.status === "in-progress") {
          color = "green";
        }
        console.log(item);
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>

            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button onClick={() => setUserId(item?.key)}>Update</Button>
            </Dropdown>
          </Space>
        );
      },
      width: "1%",
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

      filters.name?.forEach((item: any) =>
        queryParams.push({name: "name", value: item})
      );

      filters.year?.forEach((item: any) =>
        queryParams.push({name: "year", value: item})
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value: any) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
