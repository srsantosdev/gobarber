import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProvider: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvider = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      email: 'johntre@example.com',
      name: 'John Tre',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      email: 'johnqua@example.com',
      name: 'John Qua',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
