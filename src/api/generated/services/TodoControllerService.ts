/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TodoDTO } from '../models/TodoDTO';
import type { TodoPostData } from '../models/TodoPostData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TodoControllerService {
    /**
     * @param requestBody
     * @returns TodoDTO OK
     * @throws ApiError
     */
    public static post(
        requestBody: TodoPostData,
    ): CancelablePromise<TodoDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/todo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns TodoDTO OK
     * @throws ApiError
     */
    public static get(): CancelablePromise<Array<TodoDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/todos',
        });
    }
}
