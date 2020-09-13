import { Request, Response } from 'express';
import db from '../database/connection';

interface ActionObject {
    action: string;
    created_at: string;
}

interface ResponseObject {
    [string: string]: ActionObject[];
}

export default class ActionsController {
    async create(request: Request, response: Response) {
        const { email, actionName } = request.body;

        const created_at = new Date().toLocaleString('pt-BR');

        const transaction = await db.transaction();

        try {
            const viewer = await transaction('viewers').where('email', '=', email).select('id');

            let viewerId;

            if (viewer.length === 0) {
                viewerId = await transaction('viewers').insert({ email });
            } else {
                viewerId = viewer[0].id;
            }

            await transaction('actions').insert({
                name: actionName,
                viewer_id: viewerId,
                created_at,
            });

            await transaction.commit();

            return response.status(201).json({ message: 'Action created successfully' });
        } catch (e) {
            await transaction.rollback();

            return response
                .status(400)
                .send({ error: 'Unexpected error ocurred while creating an action', error_msg: e });
        }
    }

    async indexOne(request: Request, response: Response) {
        const { email } = request.query;

        const actions = await db('actions')
            .join('viewers', 'actions.viewer_id', '=', 'viewers.id')
            .where('viewers.email', '=', String(email))
            .select('viewers.email', 'actions.name as action', 'actions.created_at');

        return response.json(actions);
    }

    async indexAllActionsByEmail(request: Request, response: Response) {
        const actions = await db('actions')
            .join('viewers', 'actions.viewer_id', '=', 'viewers.id')
            .select('viewers.email', 'actions.name as action', 'actions.created_at');

        const object: ResponseObject = {};

        actions.map(({ email, action, created_at }) => {
            if (typeof object[email] !== 'object') {
                object[email] = [];
            }
            return object[email].push({ action, created_at });
        });

        return response.json(object);
    }
}
