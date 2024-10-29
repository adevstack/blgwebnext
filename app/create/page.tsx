'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input/Input";
import ImageUpload from "@/components/input/ImageUpload";
import Hero from "@/components/main/Hero";
import axios from "axios";

interface InitialStateProps {
    name?: string;
    imageSrc: string;
    description: string;
}

const initialState: InitialStateProps = {
    name: '',
    imageSrc: '',
    description: '',
};

export default function Page() {
    const [state, setState] = useState(initialState);
    const [onActive, setOnActive] = useState(false);
    const router = useRouter();

    const setCustomValue = (id: string, value: string) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        axios.post('/api/blogs', state)
            .then(() => {
                router.push('/');
            })
            .catch((err) => {
                throw new Error(err);
            });
    };

    return (
        <div className="relative flex flex-col h-screen items-center bg-gray-800 text-foreground">

            {/* Hero Background */}
            <div className="absolute inset-0 z-0">
                <Hero />
            </div>

            {/* Form */}
            <div className="relative z-10 w-[1200px] h-auto mx-auto py-8 bg-opacity-75 bg-gray-900 rounded-lg">
                <button onClick={() => setOnActive(!onActive)}
                    className="mb-6 px-4 py-2 bg-blue-600 text-foreground uppercase font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    {onActive ? 'Cancel' : 'Create Blog'}
                </button>

                {onActive && (
                    <form onSubmit={onSubmit} className="w-full">
                        <div>
                            <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                            <Input placeholder="Title" id='name' type='text' value={state.name} name='name' onChange={handleChange} />
                            <textarea
                                placeholder='Blog Content or description'
                                id='description'
                                value={state.description}
                                name='description'
                                onChange={handleChange}
                                rows={4}
                                className="w-full border p-2 rounded-md resize-none" // Styling
                                style={{ minHeight: '150px' }} // Optional min-height
                            />
                            <button type="submit" className="bg-blue-500 py-2 rounded text-foreground hover:bg-blue-600">Submit</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
