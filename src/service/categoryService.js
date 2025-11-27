import Category from "../model/categoryModel.js";
export class CategoryService {
  async getOne(id) {
    return await Category.findOne({ _id: id, status: true });
  }

  async getOneByName(name) {
    return await Category.findOne({ name, status: true });
  }

  async getAll(offset, limit) {
    const total = await Category.countDocuments({ status: true });
    let data = [];

    if (offset !== undefined && limit !== undefined) {
      data = await Category.find({ status: true }).skip(offset).limit(limit);
    } else {
      data = await Category.find({ status: true });
    }

    return {
      data,
      total,
      totalPages: limit ? Math.ceil(total / limit) : 1,
      page: offset ? offset / limit + 1 : 1,
      limit: limit ?? total,
    };
  }

  async create(name, description, image) {
    return await Category.create({ name, description, image });
  }

  async update(id, name, description, image) {
    return await Category.findByIdAndUpdate(id, { name, description, image });
  }

  async delete(id) {
    return await Category.findByIdAndUpdate(id, { status: false });
  }
}
