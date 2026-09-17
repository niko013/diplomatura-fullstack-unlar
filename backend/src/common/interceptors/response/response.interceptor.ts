// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// export interface Response<T> {
//   message: string;
//   data: {
//     totalCount: number;
//     items: T[];
//   };
// }

// @Injectable()
// export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
//     return next.handle().pipe(
//       map((data) => {
//         // Caso 1: Si el servicio ya devolvió { items, totalCount } (ejemplo: paginación)
//         if (data && typeof data === 'object' && 'items' in data && 'totalCount' in data) {
//           return {
//             message: 'operacion exitosa',
//             data: {
//               totalCount: data.totalCount,
//               items: data.items,
//             },
//           };
//         }

//         // Caso 2: Si el servicio devolvió un arreglo directo (ejemplo: [user1, user2])
//         if (Array.isArray(data)) {
//           return {
//             message: 'operacion exitosa',
//             data: {
//               totalCount: data.length,
//               items: data,
//             },
//           };
//         }

//         // Caso 3: Si el servicio devolvió un solo objeto o null/undefined (ejemplo: un usuario o respuesta de PATCH)
//         return {
//           message: 'operacion exitosa',
//           data: {
//             totalCount: data ? 1 : 0,
//             items: data ? [data] : [],
//           },
//         };
//       }),
//     );
//   }
// }


import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseFormat<T> {
  message: string;
  data: T | { totalCount: number; items: any[] } | null;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    return next.handle().pipe(
      map((data) => {
        // Caso 1: Datos ya paginados { items, totalCount } (ejemplo: GET /productos con paginación)
        if (
          data &&
          typeof data === 'object' &&
          'items' in data &&
          'totalCount' in data
        ) {
          return {
            message: 'operacion exitosa',
            data: {
              totalCount: data.totalCount,
              items: data.items,
            },
          };
        }

        // Caso 2: Arreglo directo (ejemplo: GET /productos devolviendo todos los registros)
        if (Array.isArray(data)) {
          return {
            message: 'operacion exitosa',
            data: {
              totalCount: data.length,
              items: data,
            },
          };
        }

        // Caso 3: Objeto único, mensaje o respuesta de DELETE / POST / PATCH / GET por ID
        return {
          message: 'operacion exitosa',
          data: data ?? null,
        };
      }),
    );
  }
}