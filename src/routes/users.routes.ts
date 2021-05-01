import { Router } from 'express';
import UsersRepository from 'repositories/UsersRepository';
import CreateUserService from 'services/CreateUserService';

const userRouter = Router();

const usersRepository = new UsersRepository();

userRouter.post('/', (request, response) => {
  try {
    const { name, email } = request.body;

    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({ email, name });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
