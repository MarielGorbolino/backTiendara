import Category from "../model/categoryModel.js";
export class CategoryService {
  getOne(id) {
    const category = Category.findById(id);
    return category;
  }

  async getOneByName(name) {
    const category = await Category.findOne({ name });
    return category;
  }

  async getAll() {
    const categories = await Category.find();
    return categories
  }
  async create(name, description, image) {
    const category = await Category.create({name,description,image})
    return category
  }
  async update(id, name, description, image) {
    const category = await Category.findByIdAndUpdate(id, { name, description, image });
    return category;
  }
  async delete(id) {
    const category = await Category.findByIdAndUpdate(id, { status: false });
    return category;
  }
}
