import { NotFoundError } from 'elysia';
import db from '../db';

export async function getUsers() {
  try {
    return await db.users.findMany({ orderBy: { created_at: 'asc' }, where: { deleted_at: null} });
  } catch (e: unknown) {
    console.error(`Error getting users: ${e}`);
  }
}

export async function getUser(id: string) {
  try {
    const user = await db.users.findUnique({
      where: { id,  deleted_at: null },
    });
 
    if (!user) {
      return 'User not found.'
    }
 
    return user;
  } catch (e: unknown) {
    console.error(`Error finding user: ${e}`);
  }
}

export async function createUser(options: { name: string; last_name: string; cpf: string; email: string; }) {
  try {
    console.log(options)
    const { name, last_name, cpf, email, } = options;
 
    return await db.users.create({ data: { name, last_name, cpf, email,} });
  } catch (e: unknown) {
    console.error(`Error creating user: ${e}`);
  }
}

export async function updateUser(
  id: string,
  options: { name?: string; last_name?: string }
) {
  try {
    console.log(options)
    const { name, last_name } = options;
 
    return await db.users.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(last_name ? { last_name } : {}),
      },
    });
  } catch (e: unknown) {
    console.error(`Error updating user: ${e}`);
  }
}

export async function deleteUser( id: string ) {
  try {

    return await db.users.update({
      where: { id },
      data: {
        ...({deleted_at:new Date()}),
      },
    });
  } catch (e: unknown) {
    console.error(`Error deleting user: ${e}`);
  }
}