"use client";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useCreateEmployeeProfile } from "~/hooks/employee/useCreateProfile";
export default function ProfilePage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { mutationCreateProfile } = useCreateEmployeeProfile();
  function onSetFiles(event) {
    try {
      const acceptedFormat = ["jpg", "jpeg", "webp", "png"];
      const files = [...event.target.files];
      console.log(files)
      files.forEach((file) => {
        if (
          !acceptedFormat.includes(
            file.name.split(".")[file.name.split(".").length - 1]
          )
        ) {
          throw { message: `${file.name} Format Not Acceptable` };
        }
        if (file.size > 1000000000) {
          throw {
            message: `${file.name} is too Large! Maximum Filesize is 1Kb`,
          };
        }
      });

      if (files.length > 3) throw { message: `Selected File More Than 3` };

      setSelectedFiles(files); // Array of Object
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <div>
      <Formik
        initialValues={{
          birthDate: "",
          address: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          const fd = new FormData();
          const inputData = values;
          console.log(JSON.stringify(values))
          fd.append("data", JSON.stringify(values));
          selectedFiles.forEach((file) => {
            fd.append("images", file);
          });

          console.log(fd)
          mutationCreateProfile(fd);
        }}
      >
        <Form>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <label>Your Birthdate</label>
              <Field
                type="date"
                name="birthDate"
                className="border p-2 focus:outline-none focus:ring focus:ring-slate-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label>Your Address</label>
              <Field
                type="text"
                name="address"
                className="border p-2 focus:outline-none focus:ring focus:ring-slate-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label>Select image profile</label>
              <input
                type="file"
                accept="image/*"
                multiple
                name="images"
                onChange={(e) => onSetFiles(e)}
                className="border p-2 focus:outline-none focus:ring focus:ring-slate-200 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="border p-2 bg-slate-600 hover:bg-slate-800 transition text-white font-bold focus:outline-none focus:ring focus:ring-slate-200 rounded-lg"
            >
              {" "}
              submit{" "}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
