import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile of a user', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    });

    const userProfile = await showProfile.execute({ user_id: user.id });

    expect(userProfile.id).toBe(user.id);
    expect(userProfile.email).toBe(user.email);
  });

  it('should not be able to show profile non-existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing-user' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
