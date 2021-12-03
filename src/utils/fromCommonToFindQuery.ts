import IFindQuery from '../types/find.query.interface';

export const fromCommonToFindQuery = function (query: any): IFindQuery {
  const { where, offset, limit, order } = query;
  const findQuery: IFindQuery = {
    where: {},
    skip: undefined,
    take: undefined,
    order: {},
  };
  if (where) {
    findQuery.where = where;
  }
  if (offset) {
    findQuery.skip = offset;
  }
  if (limit) {
    findQuery.take = limit;
  }
  if (order) {
    findQuery.order = order;
  }
  return findQuery;
};
