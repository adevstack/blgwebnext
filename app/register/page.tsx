'use client';

import Input from "@/components/input/Input";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Hero from "@/components/main/Hero";

interface InitialStateProps {
  name: string;
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
  name: "",
  email: "",
  password: "",
};

export default function Page() {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios.post('/api/register', state)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push('/login');
        }, 2500);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  };

  return (
    <div className="relative h-screen">
      {/* Background Hero component */}
      <div className="absolute inset-0">
        <Hero />
      </div>

      {/* Registration Form */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <form className="text-center bg-opacity-70 bg-black rounded-lg p-6" onSubmit={onSubmit}>
          <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
            <Input
              placeholder="Name"
              name="name"
              id="name"
              type="text"
              onChange={handleChange}
              value={state.name}
            />
            <Input
              placeholder="Email"
              name="email"
              id="email"
              type="email"
              onChange={handleChange}
              value={state.email}
            />
            <Input
              placeholder="Password"
              name="password"
              id="password"
              type="password"
              onChange={handleChange}
              value={state.password}
            />
            <button type="submit" className="text-white">Submit</button>
          </div>
          <div>
            <div className="text-white">
              Do you have an account?{' '}
              <Link href="/login" className="text-white">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
