import { SeeUserService } from '../../../service/user/SeeUserService';
import { UserInMemoryRepository } from '../../../repository/inMemory/UserInMemoryRepository';
import { ArgumentNotValidError } from '../../../service/error/ArgumentNotValidError';
import { beforeEach, describe, expect, it } from 'vitest';

describe('See service', () => {
  let userRepository: UserInMemoryRepository;
  let seeUserService: SeeUserService;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    seeUserService = new SeeUserService(userRepository);
  });

  it('should be able to see a user', async () => {
    const user = await userRepository.create({
      email: 'pedro@gmail.com',
      name: 'Pedro',
      password: '123456',
    });

    const { user: userSeen } = await seeUserService.execute({ 
      id: user.id 
    });

    expect(userSeen).not.toBeNull();
    expect(userSeen.id).toBe(user.id);
  });

  it('should not be able to see a user that does not exist', async () => {
    expect(async () => {
      await seeUserService.execute({ id: '1' });
    }).rejects.toBeInstanceOf(ArgumentNotValidError);
  });
});