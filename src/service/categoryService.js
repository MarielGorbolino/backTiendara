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
    const data = await Category.find({ status: true })
      .skip(offset)
      .limit(limit);

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
      page: offset / limit + 1,
      limit,
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
