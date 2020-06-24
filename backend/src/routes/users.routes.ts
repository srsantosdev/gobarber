import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user).status(201);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default userRoutes;