// actions/getUsers.ts

import prisma from '../lib/prismadb';

export default async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err: unknown) {
    console.error('Error fetching users:', err);
    throw new Error('Could not fetch users. Please try again later.');
  }
}
