"use client";

import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import {toast} from "react-hot-toast";
import { api } from "@/utils/api";

export type RegisterModalType = {
  email: string;
  password: string;
  name: string;
};

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const registerFormSchema = z.object({
    name: z.string().min(3),
    email: z.string(),
    password: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<RegisterModalType>({ resolver: zodResolver(registerFormSchema) });

  const registerRoute = api.useContext().register;

  const createUser = api.register.signUp.useMutation({
    onSuccess: () => {
      toast.success("User registered!");
      registerModal.onClose();
      loginModal.onOpen();
      reset();
    },
    onError: (error) => {
      toast.error("Registration failed!");
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<RegisterModalType> = (data) => {
    setIsLoading(true);
    createUser.mutate(data);
    setIsLoading(false);
    // axios.post('/api/register', data)
    // .then(() => {
    //   toast.success('Registered!');
    //   registerModal.onClose();
    //   loginModal.onOpen();
    // })
    // .catch((error) => {
    //   toast.error(error);
    // })
    // .finally(() => {
    //   setIsLoading(false);
    // })
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
          mt-4 
          text-center 
          font-light 
          text-neutral-500
        "
      >
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="
              cursor-pointer
              text-neutral-800 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  console.log(errors);

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
