import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";



const AcademicSemester = () => {
    const {data} = useGetAllSemestersQuery()
    return (
        <div>
            <h1>hello</h1>
        </div>
    );
};

export default AcademicSemester;