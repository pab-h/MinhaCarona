import { UserInMemoryRepository } from '../../../repository/inMemory/UserInMemoryRepository';
import { ArgumentNotValidError } from '../../../service/error/ArgumentNotValidError';
import { CreateUserService } from '../../../service/user/CreateUserService';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Register service', () => {
  let userRepository: UserInMemoryRepository;
  let createUserService: CreateUserService;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    createUserService = new CreateUserService(userRepository);
  });

  it('should be able to register a new user', async () => {
    expect(async () => {
      await createUserService.execute({
        email: 'pedro@gmail.com',
        name: 'Pedro',
        password: '123456',
      });
    }).not.toThrow();
  });

  it('should not be able to register a new user with an existing email', async () => {
    await createUserService.execute({
      name: 'Pedro',
      email: 'pedro@gmail.com',
      password: '123456',
    });

    expect(async () => {
      await createUserService.execute({
        name: 'Pedro2',
        email: 'pedro@gmail.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });
});