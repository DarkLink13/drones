import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { ObjectLiteral } from 'typeorm';
export default interface ICommonQuery<T> {
  where?: ObjectLiteral;
  offset?: number;
  limit?: number;
  order?: { [P in EntityFieldsNames<T>]: 'ASC' | 'DESC' | 1 | -1 };
}
