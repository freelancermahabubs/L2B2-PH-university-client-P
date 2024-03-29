import {Button, Modal, Table} from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement";
import {useState} from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";

import {useGetAllFacultiesQuery} from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const Courses = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {data: courses, isFetching} = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({_id, title, prefix, code}) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (_: any, item: any) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === 'filter') {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal = ({facultyInfo}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data: facultiesData} = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const facultiesOption = facultiesData?.data?.map((item: any) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit = async (data: any) => {
    const toastId = toast.loading("Assign...");
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    try {
      const res = (await addFaculties(facultyData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, {id: toastId});
      } else {
        toast.success("Faculty Assign", {id: toastId});
      }
    } catch (err) {
      toast.error("Something went wrong", {id: toastId});
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Faculty Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
