'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from './input/ImageUpload';
import Input from './input/Input';
import CodeBlock from './codeBlock';

interface BlogProps {
    name?: string;
    description?: string;
    imageSrc?: string; // Set a specific type instead of 'any'
    blogId?: string;
    authorName?: string; // New prop for author name
}

interface InitialStateProps {
    name: string;
    description: string;
    imageSrc: string;
}


export default function BlogId({ name, description, imageSrc, blogId, authorName }: BlogProps) {
    const router = useRouter();
    const [onActive, setOnActive] = useState(false);
    const [state, setState] = useState<InitialStateProps>({
        name: name || '',
        description: description || '',
        imageSrc: imageSrc || ''
    });

    function handleChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        axios.put(`/api/blogs/${blogId}`, state)
            .then(() => {
                router.refresh();
            })
            .catch((err) => {
                throw new Error(err);
            })
            .finally(() => {
                router.push('/');
            });
    };

    const onDelete = (event: FormEvent) => {
        event.preventDefault();
        axios.delete(`/api/blogs/${blogId}`)
            .then(() => {
                router.refresh();
            })
            .catch((err) => {
                throw new Error(err);
            })
            .finally(() => {
                router.push('/');
            });
    };

    const setCustomValue = (id: string, value: unknown) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    return (
        <div className="w-[1200px] mx-auto py-16 bg-background px-12 flex flex-col gap-4 relative">
            <div className="flex flex-col border-b-2">
                <span>{name}</span>
            </div>
            <div>
                <span>{description}</span>
            </div>
            <div>
                {imageSrc && <Image src={imageSrc} width={400} height={400} alt='Image' />}
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <button onClick={() => setOnActive(!onActive)}
                        className="px-4 py-2 mr-2 bg-blue-600 text-white uppercase font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Edit
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white uppercase font-semibold rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
                {authorName && (
                    <span className="flex items-center text-foreground text-base ml-4">
                        <FontAwesomeIcon icon={faUser} className="mr-1" />
                        <span className="font-semibold">By: {authorName}</span>
                    </span>
                )}
            </div>

            {onActive && (
                <form onSubmit={onSubmit}>
                    <div>
                        <ImageUpload value={state.imageSrc} onChange={(value: string) => setCustomValue('imageSrc', value)} />
                    </div>
                    <div className='flex flex-col justify-center h-auto w-[900px] mx-auto gap-2'>
                        <Input placeholder='Name' id="name" type='text' value={state.name} name='name' onChange={handleChange} />
                        <textarea
                            placeholder='Description'
                            id="description"
                            value={state.description}
                            name='description'
                            onChange={handleChange}
                            rows={3}
                            className="w-full border p-2 rounded-md resize-none"
                            style={{ minHeight: '250px' }}
                        />
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white uppercase font-semibold rounded-lg 
                        shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Submit
                        </button>
                    </div>
                    {/* Add the CodeBlock component here */}
                    <div className="mt-4">
                        <CodeBlock code={`hello`} /> {/* Example code for the CodeBlock */}
                    </div>
                </form>
            )}
        </div>
    );
}
