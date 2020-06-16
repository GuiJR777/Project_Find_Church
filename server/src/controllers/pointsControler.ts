import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, types } = request.query;

        const parsedTypes = String(types)
            .split(',')
            .map(type => Number(type.trim()))

        const points = await knex('points')
            .join('point_types', 'points.id', '=', 'point_types.point_id')
            .whereIn('point_types.type_id', parsedTypes)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
        
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not found.' })
        }
        const types = await knex('types')
            .join('point_types', 'types.id', '=', 'point_types.type_id')
            .where('point_types.point_id', id)
            .select('types.title')
        return response.json({ point, types });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            adress,
            adress2,
            uf,
            city,
            types
        } = request.body;

        const trx = await knex.transaction();

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            adress,
            adress2,
            uf,
            city
        }

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointTypes = types.map((type_id: Number) => {
            return {
                type_id,
                point_id,
            }
        })

        await trx('point_types').insert(pointTypes);

        await trx.commit();

        return response.json({
            id: point_id,
            ...point
        });
    }
}

export default PointsController;