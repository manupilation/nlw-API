import { Request, Response } from 'express';
import { authenticateUserService } from '../services/authenticateService';

class authenticateUserController {
  async handle(request: Request, response: Response) {
    const { code } = request.body
    const service = new authenticateUserService();

    try{
      const result = await service.execute(code);
      return response.json(result);
    }
    catch(err){
      return response.json(err.mensage);
    }
  }
}

export { authenticateUserController };
