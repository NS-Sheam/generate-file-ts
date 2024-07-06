const queryBuilderTemplate = `
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

   range(searchableFields) {
      const startRangeField = searchableFields?.startDateField || "createdAt";
      const endRangeField = searchableFields?.endDateField || "createdAt";
      const startRange = this?.query?.startRange;
      const endRange = this?.query?.endRange;
  
      if (startRange && endRange) {
        this.modelQuery = this.modelQuery.find({
          [startRangeField]: { $gte: startRange },
          [endRangeField]: { $lte: endRange },
        });
      } else if (startRange) {
        this.modelQuery = this.modelQuery.find({
          [startRangeField]: { $gte: startRange },
        });
      } else if (endRange) {
        this.modelQuery = this.modelQuery.find({
          [endRangeField]: { $lte: endRange },
        });
      }
      return this;
    }

  // filter query
  filter() {
    const queryObject = { ...this.query };
    // remove fields from query
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObject[el]);

    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }

  // sort query
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  // pagination
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // field limiting
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();

    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      totalPages,
    };
  }
}
export default QueryBuilder;
  `;

module.exports = queryBuilderTemplate;
