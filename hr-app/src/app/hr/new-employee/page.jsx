"use client";
import { Form, Formik, Field } from "formik";
import { useCreateEmployee } from "~/hooks/hr/useCreateEmployee";
import { useGetPositionAndShift } from "~/hooks/hr/useGetPositionAndShift";

export default function LoginPage() {
  const { dataPositionAndShift } = useGetPositionAndShift();
  const { mutationCreateEmployee } = useCreateEmployee();
  if (dataPositionAndShift === undefined) return <div>Loading...</div>;

  console.log("position and shift: ", dataPositionAndShift);
  return (
    <>
      <div className="flex flex-col items-center px-5 py-10 gap-3">
        <Formik
          initialValues={{
            email: "",
            password: "",
            fullname: "",
            address: "",
            positionId: 0,
            shiftId: 0,
          }}
          onSubmit={(values) => {
            console.log("values:", values);
            mutationCreateEmployee({
              email: values.email,
              password: values.password,
              fullname: values.fullname,
              address: values.address,
              positionId: values.positionId,
              shiftId: values.shiftId,
            });
          }}
        >
          <Form>
            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <Field
                  type="text"
                  name="email"
                  placeholder="Type Email"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <Field
                  type="text"
                  name="password"
                  placeholder="Type Password"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Fullname</span>
                </div>
                <Field
                  type="text"
                  name="fullname"
                  placeholder="Type Password"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Address</span>
                </div>
                <Field
                  type="text"
                  name="address"
                  placeholder="Type Password"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Position</span>
                </div>
                <Field
                  component="select"
                  id="positionId"
                  name="positionId"
                  className="select select-bordered w-full"
                >
                  {dataPositionAndShift?.findEmployeePosition.map(
                    (position, index) => {
                      return (
                        <option value={position.id} key={index}>
                          {position.name}
                        </option>
                      );
                    }
                  )}
                </Field>
              </label>
            </div>
            <div className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Shift</span>
                </div>
                <Field
                  component="select"
                  id="shiftId"
                  name="shiftId"
                  className="select select-bordered w-full"
                >
                  {dataPositionAndShift?.findEmployeeShift.map(
                    (shift, index) => {
                      return (
                        <option value={shift.id} key={index}>
                          {new Date(shift.start).getUTCHours()} -{" "}
                          {new Date(shift.end).getUTCHours()}
                        </option>
                      );
                    }
                  )}
                </Field>
              </label>
            </div>
            <button className="btn bg-indigo-500 text-white w-full">
              Create Employee
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
