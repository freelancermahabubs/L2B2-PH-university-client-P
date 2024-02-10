import {Button} from "antd";

import {useState} from "react";

import AcademicDepartmentModal from "../../../components/modals/AcademicDepartmentModal";
import AcademicDepartmentTable from "../../../components/Tables/AcademicDepartmentTable";

const AcademicDepartment = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Academic Department
      </Button>

      <div style={{marginTop: "15px"}}>
        {" "}
        <AcademicDepartmentTable />
      </div>
      <AcademicDepartmentModal mode="add" open={open} setOpen={setOpen} />
    </div>
  );
};

export default AcademicDepartment;
