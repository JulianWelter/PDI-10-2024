import { Elysia, t } from 'elysia';
import { createUser, deleteUser, getUser, updateUser, getUsers } from '../repositories/UserRepository';
 
const userRoutes = new Elysia({ prefix: '/user' })
  .get('/', () => getUsers())
  .get('/:id', ({ params: { id }}) => getUser(id), {
    params: t.Object({
      id: t.String(),
    })
  })
  .post('/', ({body}) => createUser(body), {
    body: t.Object({
      name: t.String(),
      last_name: t.String(),
      cpf: t.String(),
      email: t.String(),
    })
  })
  .patch('/:id', ({ params: { id }, body }) => updateUser(id, body), {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object(
      {
        name: t.Optional(t.String()),
        last_name: t.Optional(t.String()),
      },
      {
        minProperties: 1,
      }
    ),
  })
  .delete('/:id', ({params: { id }}) => deleteUser(id),{
    params: t.Object({
        id: t.String()
    })
  });
 
export default userRoutes;