import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { day, month, year } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availabilities = await listProviderDayAvailability.execute({
      provider_id: id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availabilities);
  }
}
