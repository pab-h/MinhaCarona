import { UserInMemoryRepository } from '../../../repository/inMemory/UserInMemoryRepository';
import { ArgumentNotValidError } from '../../../service/error/ArgumentNotValidError';
import { CreateUserService } from '../../../service/user/CreateUserService';
import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../../AuthService';

describe('Auth service', () => {
  let userRepository: UserInMemoryRepository;
  let createUserService: CreateUserService;
  let authService: AuthService;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    createUserService = new CreateUserService(userRepository);
    authService = new AuthService(userRepository);
  });

  it('should be able to auth a user', async () => {
    const { user } = await createUserService.execute({
        email: 'pedro@gmail.com',
        name: 'Pedro',
        password: '123456',
    });

    expect(async () => {
        await authService.execute({
            email: user.email,
            password: '123456'
        });
    }).not.toThrow();
  });

  it('should not be able to authenticate a non-existent user', async () => {
    expect(async () => {
        await authService.execute({
            email: 'pedro@gmail.com',
            password: '123456',
        });
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });

  it('should not be able to authenticate a user with incorrect password', async () => {
    const { user } = await createUserService.execute({
        email: 'pedro@gmail.com',
        name: 'Pedro',
        password: '123456',
    });

    expect(async () => {
        await authService.execute({
            email: user.email,
            password: "12312321"
        });
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });

});