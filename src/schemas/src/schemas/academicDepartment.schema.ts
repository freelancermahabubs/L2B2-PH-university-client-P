import {z} from "zod";

export const academicDepartmentSchema = z.object({
  name: z.string({required_error: "Please a Name"}),
  academicFaculty: z.string({
    required_error: "Please select a Academic Faculty",
  }),
});
