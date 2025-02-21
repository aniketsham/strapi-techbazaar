"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Define allowed file types and max size (5MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
];

// Define Zod schema for form validation
const schema = z.object({
  name: z.string().min(3, "Name Is Required"),
  email: z.string().email("Invalid email").min(10, "Email is Required"),
  message: z.string().min(5, "Message Is Required"),
  phone_number: z.string(),
  file: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "File is required",
    })
    .refine((files) => ALLOWED_FILE_TYPES.includes(files[0]?.type), {
      message: "Invalid file type. Allowed: JPG, PNG, PDF, DOCX, XLSX",
    })
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, {
      message: "File size must be under 2MB",
    }),
});

// Define types for form data
type FormData = z.infer<typeof schema>;

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:1337/api/contacts", {
        data: {
          Name: data.name,
          Email: data.email,
          Message: data.message,
          phone_Number:data.phone_number
        },
      });
      console.log(response.data)
      const refId = response.data.id;
      console.log("Reference ID:", refId);

      const formData = new FormData();
      formData.append("ref", "api::contact.contact");
      formData.append("refId", refId.toString());
      formData.append("field", "Contact_image");
      formData.append("files", data.file[0]);

      const uploadResponse = await axios.post(
        "http://localhost:1337/api/upload",
        formData
      );
      console.log("Upload response:", uploadResponse);
      alert("Form submitted successfully");
      console.log("Form submission successful");
      reset();
    } catch (error:any) {
      alert(error.response?.data?.error.message);
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8 md:px-10">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-6">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                type="text"
                id="name"
                autoComplete="name"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                type="text"
                id="phone_number"
                autoComplete="tel"
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <span className="text-red-500">
                  {errors.phone_number.message}
                </span>
              )}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                className="mt-1 bg-white dark:bg-slate-950 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md border"
                rows={10}
                cols={30}
                {...register("message")}
              ></textarea>
              {errors.message && (
                <span className="text-red-500">{errors.message.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="file">Upload File</Label>
              <Input type="file" id="file" {...register("file")} />
              {errors.file && (
                <span className="text-red-500">
                  {errors.file?.message?.toString()}
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Send Message"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
