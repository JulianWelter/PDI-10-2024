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
      return 'Usuario não encontrado.'
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

    if(!validateCPF(cpf)){
      return "CPF inválido"
    }

    console.log(!validateEmail(email))
    if(!validateEmail(email)){
      return "Email inválido"
    }
 
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

function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
  }

  let sum = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
      remainder = 0;
  }
  if (remainder !== parseInt(cpf.charAt(9))) {
      return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
      remainder = 0;
  }
  return remainder === parseInt(cpf.charAt(10));
}

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
