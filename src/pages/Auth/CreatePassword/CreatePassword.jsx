import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PasswordInput from "../../../components/PasswordInput";
import Button from "../../../components/Button";
import axiosInstance from "../../../axiosInstance";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const token = searchParam.get("token");
  const {
    control,
    setError,
    reset,
    getValues,
    formState: { errors, dirtyFields, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const formList = [
    {
      id: 0,
      type: "password",
      fieldName: "password",
      label: "Password",
      inputType: "password",
      placeholder: "Enter your password",
      validator: {
        required: "Password is required",
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          message:
            "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one special character",
        },
      },
    },
    {
      id: 1,
      type: "password",
      fieldName: "confirmPassword",
      label: "Confirm Password",
      inputType: "password",
      placeholder: "Confirm your password",
      validator: {
        required: "Confirm password is required",
        validate: (value) => {
          const password = getValues("password");
          return value === password || "Passwords do not match";
        },
      },
    },
  ];
  console.log(errors, "e");
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch(
        `/api/auth/reset-password/${token}`,
        {
          password: data?.password,
        }
      );
      console.log(response.status, "kk");
      if (response.status === 200) {
        navigate("/login");
        toast.success("Successfully create password");
      }
    } catch (err) {
      console.log(err.response.data.errors, "rom");
      toast.error(err.response.data.errors);
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-body-bg mt-10 sm:flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:grid flex flex-col justify-center sm:justify-normal gap-5 w-full h-full sm:h-auto sm:w-[400px] rounded-lg py-10 px-8 bg-white shadow"
      >
        <header className="w-full grid gap-8">
          <h1 className="text-primary-600 text-xl font-bold  w-full">
            Create new Password
          </h1>
        </header>
        {formList.map((item) => (
          <Controller
            key={item.fieldName}
            name={item.fieldName}
            control={control}
            rules={item.validator}
            render={({ field, fieldState: { error } }) => (
              <>
                <PasswordInput
                  id={item?.id}
                  label={item.label}
                  type={item.inputType}
                  placeholder={item.placeholder}
                  error={error?.message || errors?.[item.fieldName]?.message}
                  handleChange={field.onChange}
                  value={field.value}
                  disabled={loading}
                  showForgetPassword={false}
                />
              </>
            )}
          />
        ))}
        <Button role="submit" loading={loading} disabled={!isValid || loading}>
          create password
        </Button>
      </form>
    </div>
  );
};

export default CreatePassword;
