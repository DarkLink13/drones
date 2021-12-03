import { ObjectLiteral } from 'typeorm';
export default interface IFindQuery {
  where: ObjectLiteral;
  skip: number;
  take: number;
  order: ObjectLiteral;
}
