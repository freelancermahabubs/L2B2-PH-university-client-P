import {Button} from "antd";

import {useState} from "react";

import AcademicFacultyTable from "../../../components/Tables/AcademicFacultyTable";
import AcademicFaculty from "../../../components/modals/AcademicFaculty";

const CreateFaculty = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Academic Faculty
      </Button>

      <div style={{marginTop: "15px"}}>
        {" "}
        <AcademicFacultyTable />
      </div>
      <AcademicFaculty _id={""} mode="add" open={open} setOpen={setOpen} />
    </div>
  );
};

export default CreateFaculty;
