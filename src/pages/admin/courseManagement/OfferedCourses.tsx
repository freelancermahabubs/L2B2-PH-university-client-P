import { Button } from "antd";
import { useGetAllOfferedCoursesQuery } from "../../../redux/features/student/src/redux/features/student/studentCourseManagement.api";

const OfferedCourses = () => {
  const { data: OfferedCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const singleObject = OfferedCourseData?.data?.reduce((acc, item) => {
    const key = item?.course?.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item?.section,
      _id: item?._id,
      days: 
    });
    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  return (
    <div>
      {modifiedData?.map((item) => {
        return (
          <div key={item.courseTitle}>
            <h2>{item?.courseTitle}</h2>
            <div>
              {item?.sections?.map((section) => (
                <div key={section._id}>
                  <p>Section: {section?.section}</p>
                  <Button>Enroll</Button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OfferedCourses;
