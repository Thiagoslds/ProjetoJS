/*Mostra todos os prestadores de serviço, mas não deve mostrar o id do próprio usuário 
conectado*/

import {inject, injectable} from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/Users';

interface IRequest{
    user_id: string;
}

@injectable()
export default class ListProviderService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ){}

    public async execute({
        user_id,
    }: IRequest): Promise<User[]>{

        /*Lista todos provedores de serviço exceto o proprio usuario
        Definido por regra de negocio*/
        const user = await this.usersRepository.findAllProviders({
            except_user_id: user_id
        })

        return (user);
    }
}