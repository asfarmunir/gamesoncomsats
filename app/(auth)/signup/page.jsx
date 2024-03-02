"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ColorRing } from "react-loader-spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa6";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Valid Username required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.string()
})

export default function ProfileForm() {
  // ...

  const router = useRouter();

  const session = useSession();
  console.log(session)
  // if (session.status === "authenticated") {
  //   router.push("/");
  // }
  const [emailValidation, setValidation] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole]= useState('student')

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "asfar",
      email: "asfarma2815@gmail.com",
      password: "asfarasfar",
      role:"student"
    },
  });

  async function onSubmit(values) {
    const { username, email, password } = values;

    setLoading(true);
    const response = await signIn("credentials", {
      email,
      password,
      username,
      role:userRole,
      redirect: false,
    });
    setLoading(false);
    console.log(response);
    if (response?.ok) {
      toast.success("Login successful!");
    }
    if (response?.error) {
      setValidation(response.error);
    }
  }
  return (
    <>
      <div className=" absolute p-8 left-0 top-0">
        <button className="hover:bg-blue-100  rounded-full p-2">
          <Link href="/">
            <FaArrowLeft className="text-primary-500 text-lg " />
          </Link>
        </button>
      </div>
      <Form {...form}>
        <div
          id="first"
          className="flex flex-col items-center bg-white shadow-md w-[18rem] sm:w-[24rem]  rounded-xl px-8 pt-6 pb-8 mb-2 space-y-6"
        >

          <Button
            onClick={async () => {
              try {
                await signIn("google", { callbackUrl: "/" });
                toast.success("Login successful!", { duration: 7000 });
              } catch (error) {
                console.error("Login error:", error);
              }
            }}
            className="m-0 w-full text-start bg-white border hover:text-white shadow-sm border-primary-500 text-primary font-semibold"
          >
            <FcGoogle className=" w-7 h-7 mr-1 " />
            Continue with google
          </Button>
          <Separator />
          <form
            id="container"
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="block text-gray-700 font-bold mb-2">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="block text-gray-700 font-bold mb-2">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="block text-gray-700 font-bold mb-2">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-red-400 font-semibold">
                    {emailValidation}
                  </p>
                </FormItem>
              )}
            />
            <p className="font-bold ml-1 mb-1 text-sm">Role</p>
            <Select onValueChange={(value)=>setUserRole(value)}> 
                      <SelectTrigger className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <SelectValue placeholder="Stundent"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coach">Coach</SelectItem>
                        <SelectItem value="player">Player</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
            <div className="flex flex-col w-full items-center justify-center">
              <Button
                type="submit"
                className="bg-primary-500 hover:bg-primary mt-3 text-white font-semibold py-2 px-14 rounded-full  focus:outline-none focus:shadow-outline"
              >
                {loading ? (
                  <ColorRing
                    visible={true}
                    height="35"
                    width="35"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                    ]}
                  />
                ) : (
                  <span>Sign up</span>
                )}
              </Button>
              <p className="text-xs font-thin mt-2">
                Already have an account:
                <Link
                  className="font-semibold text-primary-500"
                  href={"/login"}
                >
                  {" "}
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Form>
    </>
  );
}