import { Request, Response } from "express";
import { getMessagesService } from "../services/getMessagesService";


class get3LastMessagesController {
  async handle(request: Request, response: Response)  {
    const service = new getMessagesService();

    const result = await service.execute();

    return response.json(result);
  }
}

export { get3LastMessagesController };
